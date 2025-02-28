"use client"

import { useEffect, useState, useCallback } from "react"
import Item from "../item/item"
import Link from "next/link"
import Image from "next/image"

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

export default function FeatureProduct() {
  const [productItem, setProductItem] = useState<Product[]>([])

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/product/allproduct", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await res.json()
      setProductItem(data.products.slice(0, 4))
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
  
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-start justify-between mb-12">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">SHOP THE LOOK</p>
          <h2 className="text-[32px] leading-tight">Trending Looks</h2>
        </div>
        <Link href="/products" className="text-sm underline decoration-1 underline-offset-4 hover:text-gray-600">
          View More
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productItem.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          productItem.map((item: Product) => <Item key={item._id} product={item} />)
        )}
      </div>
    </section>

    <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[60vh] flex items-left justify-center px-4 sm:px-6 lg:px-10 flex-col">
      <Image src="/Asset/left4.jpg" alt="Latest fashion trends" layout="fill" objectFit="cover" priority />
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Overlay at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold mb-2 sm:mb-4">
          Shop the Latest Trends – Your Style, <br className="hidden sm:inline" /> Your Way!
        </h1>
        <p className="text-white text-sm sm:text-base md:text-lg">
          Discover your unique look and shop with confidence in our diverse collection{" "}
          <br className="hidden md:inline" /> of clothing, accessories, and more.
        </p>
      </div>
    </section>
    </>
  )
}

