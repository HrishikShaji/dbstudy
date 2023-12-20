import { FormEvent, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { ProductDetails } from "./ProductDetails";
import { VariantSection } from "./VariantSection";

export const ProductForm = () => {
  const { products } = useGetProducts();
  const [noOfVariants, setNoOfVariants] = useState(1);
  const [variants, setVariants] = useState<any[]>([]);
  const [name, setName] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, variants }),
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name..."
          className="p-2 rounded-md text-black "
        />
        <button
          type="button"
          className="bg-neutral-600 rounded-md p-2"
          onClick={() => setNoOfVariants((prev) => prev + 1)}
        >
          Add Variant
        </button>
        {Array.from({ length: noOfVariants }).map((_, i) => (
          <div key={i} className="flex gap-10 justify-between">
            <VariantSection index={i} setVariants={setVariants} />
          </div>
        ))}
        <button className="p-2 rounded-md bg-neutral-700" type="submit">
          Add Product
        </button>
      </form>
      <div>
        {products?.map((product: any) => (
          <ProductDetails product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
