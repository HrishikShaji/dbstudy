"use client";
import { ColorSection } from "./components/ColorSection";
import { ProductForm } from "./components/ProductForm";
import { SizeSection } from "./components/SizeSection";
import { useGetProducts } from "./hooks/useGetProducts";

export default function Home() {
  const { sizes, colors } = useGetProducts();
  return (
    <main className="bg-gray-900 min-h-screen flex flex-col gap-2 p-24">
      <div className="flex justify-between w-full ">
        <ProductForm />
      </div>
    </main>
  );
}
