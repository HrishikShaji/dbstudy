"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    console.log(response);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name..."
          className="p-2 rounded-md text-black "
        />
        <button onClick={handleSubmit}>Add</button>
      </form>
    </main>
  );
}
