import { FormEvent, useState } from "react";

export const useProductForm = () => {
  const [name, setName] = useState("");
  const [sizeIds, setSizeIds] = useState<string[] | []>([]);
  const [colorIds, setColorIds] = useState<string[] | []>([]);
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(name, sizeIds, colorIds, images);

    const newColors = colorIds.map((colorId) => {
      return { id: colorId, images: images[colorId as any] };
    });
    await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, sizeIds, colorIds, images, newColors }),
    });
  };

  return { name, setSizeIds, setColorIds, setImages, handleSubmit, setName };
};
