"use client";

import { useEffect, useState } from "react";

export const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
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

  return { products, sizes, colors };
};
