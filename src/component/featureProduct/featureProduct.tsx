"use client";
import React, { useEffect, useState } from "react";
import Item from "../item/item";

export default function FeatureProduct() {
  const [productItem, setProductItem] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/product/allproduct", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProductItem(data.products.slice(0, 4));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-10 mb-24">
      <h1 className="text-2xl font-bold text-center mb-5">Browse by Category</h1>
      <div className="w-full h-full flex flex-wrap items-center justify-center gap-4">
        {productItem.length === 0 ? (
          <p>No products found</p>
        ) : (
          productItem.map((item: any) => (
            <Item key={item._id} product={item} />
          ))
        )}
      </div>
    </div>
  );
}
