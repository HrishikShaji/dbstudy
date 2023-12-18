"use client";

import { Color } from "@prisma/client";
import { FormEvent, useState } from "react";

interface ColorSectionProps {
  colors: Color[];
}

export const ColorSection: React.FC<ColorSectionProps> = ({ colors }) => {
  const [color, setColor] = useState("");
  const handleColorSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await fetch("/api/color", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color }),
    });
  };
  return (
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
  );
};
