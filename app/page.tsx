"use client";
import { Color, Product, Size } from "@prisma/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
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
    const response = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, sizeIds, colorIds }),
    });
    console.log(response);
  };

  const handleSizeSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/size", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ size }),
    });
  };
  const handleColorSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/color", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color }),
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
    const response = await fetch(`/api/product?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <main className="bg-gray-500 min-h-screen flex justify-between gap-2 p-24">
      <div className="flex flex-col gap-2 w-[50%] h-full">
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
          {products?.map((product: Product) => (
            <div className="flex w-full justify-between" key={product.id}>
              <h1 key={product.id}>{product.name}</h1>
              <button onClick={() => handleDelete(product.id)}>DELETE</button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[50%] h-full items-center ">
        <form className="flex flex-col gap-2">
          <input
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="size..."
            className="p-2 rounded-md text-black "
          />
          <button onClick={handleSizeSubmit}>Add</button>
        </form>
        <div>
          {sizes?.map((size: Size) => <h1 key={size.id}>{size.name}</h1>)}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[50%] h-full items-center">
        <form className="flex flex-col gap-2">
          <input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="size..."
            className="p-2 rounded-md text-black "
          />
          <button onClick={handleColorSubmit}>Add</button>
        </form>
        <div>
          {colors?.map((color: Color) => <h1 key={color.id}>{color.name}</h1>)}
        </div>
      </div>
    </main>
  );
}
