"use client";
import React from "react";
import Image from "next/image";

const Item = ({ product }: { product: any }) => {
  return (
    <div className="w-[25%] h-[50vh] hover:bg-gray-100 overflow-hidden transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative w-full h-48">
        <Image
          src={product.image} // This should be a valid URL
          alt="item"
          fill
          className="object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-10">
          <span className="text-lg font-bold">${product.price}</span>
          <span className="text-sm font-bold">Add To Cart</span>
        </div>
      </div>
    </div>
  );
};

export default Item;
