"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { use } from "react"; // ✅ Import `use` to unwrap params
import FeatureProduct from "@/component/featureProduct/featureProduct";

const ProductDetailPage = ({ params }: any) => {
  const resolvedParams = use(params) as { id: string }; 
  const { id } = resolvedParams;

  const [product, setProduct] = useState<any>(null);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/product/${id}`);
      const data = await res.json();
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) return <p>Loading...</p>; // ✅ Prevents null reference errors

  return (
 <>
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
<div className="grid grid-cols-2 gap-4">
  {Array.isArray(product.image) ? (
    product.image.length > 0 ? (
      product.image.map((image: string, index: number) => (
        <div
          key={index}
          className="aspect-square relative overflow-hidden rounded-lg bg-gray-100"
        >
          <Image
            src={image}
            alt={`${product.name} image ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={index === 0}
          />
        </div>
      ))
    ) : (
      <p>No images available</p>
    )
  ) : (
    // If `product.image` is a single string, display it
    <div className="col-span-2 aspect-square relative overflow-hidden rounded-lg bg-gray-100">
      <Image
        src={product.image}
        alt={`${product.name} image`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 50vw"
        priority
      />
    </div>
  )}
</div>


        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price?.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>

          {/* Add to Cart Button */}
          <div className="flex items-center justify-between">
            <button className="bg-black text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>
            <button className="text-black underline text-sm font-medium hover:text-gray-600">
              View Size Guide
            </button>
          </div>
        </div>
      </div>
    </div>
    <FeatureProduct/>
    </>


  );
};

export default ProductDetailPage;
