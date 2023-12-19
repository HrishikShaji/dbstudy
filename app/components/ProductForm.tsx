import { FormEvent, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { ColorInput } from "./ColorInput";
import { ProductDetails } from "./ProductDetails";
import { SizeInput } from "./SizeInput";
import { ImageSection } from "./ImageSection";

export const ProductForm = () => {
  const [name, setName] = useState("");
  const { products, sizes, colors } = useGetProducts();
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
  return (
    <div className="flex flex-col gap-5 w-full">
      <form className="flex flex-col gap-4 ">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name..."
          className="p-2 rounded-md text-black "
        />
        <div className="flex justify-around">
          <ColorInput colors={colors} setColorIds={setColorIds} />
          <SizeInput sizes={sizes} setSizeIds={setSizeIds} />
          <ImageSection setImages={setImages} />
        </div>
        <button onClick={handleSubmit}>Add</button>
      </form>
      <div>
        {products?.map((product: any) => (
          <ProductDetails product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
