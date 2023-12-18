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

export default function Home() {
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState("");
  const [sizeIds, setSizeIds] = useState<string[] | []>([]);
  const [colorIds, setColorIds] = useState<string[] | []>([]);

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

  console.log(products);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(sizeIds, colorIds);
    const images = ["a", "a", "a"];
    const response = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, sizeIds, colorIds, images }),
    });
    console.log(response);
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
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <h1>Select Size</h1>
              {sizes?.map((size: Size) => (
                <label key={size.id}>
                  <input
                    name={size.name}
                    onChange={handleSizeChange}
                    value={size.id}
                    type="checkbox"
                  />
                  {size.name}
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h1>Select Color</h1>
              {colors?.map((color: Color) => (
                <label key={color.id}>
                  <input
                    name={color.name}
                    onChange={handleColorChange}
                    value={color.id}
                    type="checkbox"
                  />
                  {color.name}
                </label>
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
