"use client"

import { useEffect, useState, useCallback } from "react"
import Item from "./item"
import Link from "next/link"

export default function FeatureProduct() {
  const [productItem, setProductItem] = useState<any[]>([])

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
      setProductItem(data.products.slice(0, 3))
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productItem.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          productItem.map((item: any) => <Item key={item._id} product={item} />)
        )}
      </div>
    </section>
  )
}

