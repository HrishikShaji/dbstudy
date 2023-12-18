"use client";
import {
  Color,
  Product,
  ProductColor,
  ProductSize,
  Size,
} from "@prisma/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SizeSection } from "./components/SizeSection";
import { ColorSection } from "./components/ColorSection";
import { ImageSection } from "./components/ImageSection";

type SizeChild = ProductSize & {
  size: Size;
};

type ColorChild = ProductColor & {
  color: Color;
};

type ProductChild = Product & {
  sizes: SizeChild[];
  colors: ColorChild[];
};

type Image = {
  key: string[];
};

export default function Home() {
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizeIds, setSizeIds] = useState<string[] | []>([]);
  const [colorIds, setColorIds] = useState<string[] | []>([]);
  const [isOpen, setIsOpen] = useState(Array(colors.length).fill(false));
  const [images, setImages] = useState<Record<string, any>[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetch("/api/product", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data));
    fetch("/api/size", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setSizes(data));
    fetch("/api/color", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setColors(data));
  }, []);

  useEffect(() => {
    if (window !== undefined) {
      setMounted(true);
    }
  }, []);

  if (!mounted) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(sizeIds, colorIds, images);
    const newColors = colorIds.map((colorId) => {
      return { id: colorId, images: images[colorId as any] };
    });
    const response = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, sizeIds, colorIds, images }),
    });
  };

  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSizeIds((prevSelected) => [...prevSelected, e.target.value]);
    } else {
      setSizeIds((prevSelected) =>
        prevSelected.filter((sizeId) => sizeId !== e.target.value),
      );
    }
  };
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setColorIds((prevSelected) => [...prevSelected, e.target.value]);
    } else {
      setColorIds((prevSelected) =>
        prevSelected.filter((colorId) => colorId !== e.target.value),
      );
    }
  };
  const handleDelete = async (id: string) => {
    await fetch(`/api/product?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <main className="bg-gray-500 min-h-screen flex flex-col gap-2 p-24">
      <div className="flex justify-between w-full ">
        <SizeSection sizes={sizes} />
        <ColorSection colors={colors} />
      </div>
      <div className="flex flex-col gap-5">
        <form className="flex flex-col gap-2 ">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name..."
            className="p-2 rounded-md text-black "
          />
          <div className="flex flex-1 justify-between">
            <div className="flex flex-1 flex-col gap-4">
              <h1>Select Size</h1>
              {sizes?.map((size: Size, i) => (
                <div key={size.id} className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <label key={size.id}>
                      <input
                        name={size.name}
                        onChange={handleSizeChange}
                        value={size.id}
                        type="checkbox"
                      />
                      {size.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <h1>Select Color</h1>
              {colors?.map((color: Color, i) => (
                <div key={color.id}>
                  <div className="flex flex-col gap-2">
                    <label>
                      <input
                        name={color.name}
                        onChange={handleColorChange}
                        value={color.id}
                        type="checkbox"
                      />
                      {color.name}
                    </label>
                    <button
                      onClick={() => {
                        const newValues = [...isOpen];
                        newValues[i] = !newValues[i];
                        setIsOpen(newValues);
                      }}
                      type="button"
                    >
                      Add Images
                    </button>
                  </div>
                  {isOpen[i] ? (
                    <ImageSection setImages={setImages} colorId={color.id} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleSubmit}>Add</button>
        </form>
        <div>
          {products?.map((product: ProductChild) => (
            <div className="flex w-full justify-between" key={product.id}>
              <h1 key={product.id}>{product.name}</h1>
              <div className="flex flex-col gap-2">
                {product.sizes.map((size) => (
                  <h1 key={size.id}>{size.size.name}</h1>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {product.colors.map((color) => (
                  <h1 key={color.id}>{color.color.name}</h1>
                ))}
              </div>
              <button onClick={() => handleDelete(product.id)}>DELETE</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
