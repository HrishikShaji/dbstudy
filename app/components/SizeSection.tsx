"use client";

import { Color, Size } from "@prisma/client";
import { FormEvent, useState } from "react";

interface SizeSectionProps {
  sizes: Size[];
}

export const SizeSection: React.FC<SizeSectionProps> = ({ sizes }) => {
  const [size, setSize] = useState("");
  const handleSizeSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await fetch("/api/size", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ size }),
    });
  };
  return (
    <div className="flex flex-col gap-2 w-[50%] h-full items-center">
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
  );
};
