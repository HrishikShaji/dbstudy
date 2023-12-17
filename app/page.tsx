"use client";
import { Product, Size } from "@prisma/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState("");
  const [sizeIds, setSizeIds] = useState<string[] | []>([]);

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
  }, []);

  console.log(products);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(sizeIds);
    const response = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, sizeIds }),
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
    console.log(response);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, e.target.checked);

    if (e.target.checked) {
      setSizeIds((prevSelected) => [...prevSelected, e.target.value]);
    } else {
      setSizeIds((prevSelected) =>
        prevSelected.filter((sizeId) => sizeId !== e.target.value),
      );
    }
  };
  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/product?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
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
          {sizes?.map((size: Size) => (
            <label key={size.id}>
              <input
                name={size.name}
                onChange={handleChange}
                value={size.id}
                type="checkbox"
              />
              {size.name}
            </label>
          ))}
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
      <div className="flex flex-col gap-2 w-[50%] h-full">
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
    </main>
  );
}
