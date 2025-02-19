"use client";
import React, { useEffect, useState } from "react";
import Item from "../item/item";
import axios from "axios";

export default function FeatureProduct() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/api/products/allproduct");
    console.log(res.data.products)
   
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold text-center mb-5">Browse by Category</h1>
      <div className="w-full h-full flex flex-wrap items-center justify-center gap-4">
       
      </div>
    </div>
  );
}
