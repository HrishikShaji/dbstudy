"use client";
import {
  Color,
  Product,
  ProductColor,
  ProductSize,
  Size,
} from "@prisma/client";
import { ProductForm } from "./components/ProductForm";

type SizeChild = ProductSize & {
  size: Size;
};

type ColorChild = ProductColor & {
  color: Color;
};

export type ProductChild = Product & {
  sizes: SizeChild[];
  colors: ColorChild[];
};

export default function Home() {
  return (
    <main className="bg-gray-900 min-h-screen flex flex-col gap-2 p-24">
      <div className="flex justify-between w-full ">
        <ProductForm />
      </div>
    </main>
  );
}
