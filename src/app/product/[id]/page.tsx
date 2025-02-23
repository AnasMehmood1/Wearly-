"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { use } from "react"
import FeatureProduct from "@/component/featureProduct/featureProduct"

const ProductDetailPage = ({ params }: any) => {
  const resolvedParams = use(params) as { id: string }
  const { id } = resolvedParams

  const [product, setProduct] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const fetchProduct = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/product/${id}`)
      const data = await res.json()
      setProduct(data.product)
    } catch (error) {
      console.error("Error fetching product:", error)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id, fetchProduct])

  if (!product) return <p>Loading...</p>

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
  
    // Check if the product already exists in the cart
    const existingProductIndex = cartItems.findIndex((item:any) => item.id === product._id)
  
    if (existingProductIndex !== -1) {
      // If product already exists, increase its quantity
      cartItems[existingProductIndex].quantity += 1
    } else {
      // If product is new, add it with quantity 1
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      }
      cartItems.push(cartItem)
    }
  
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    alert("Product added to cart")
  }
  
 


  const sizes = ["XS", "S", "M", "L", "XL"] // Static sizes for frontend display

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={Array.isArray(product.image) ? product.image[0] : product.image || "/placeholder.svg"}
                  alt={`${product.name} image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold">${product.price?.toFixed(2)}</p>
            <p className="text-gray-600">{product.description}</p>

            {/* Size Selector */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 text-sm font-medium rounded-full border ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex items-center justify-between">
              <button className="bg-black text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors" onClick={addToCart}>
                Add to Cart
              </button>
              <button className="text-black underline text-sm font-medium hover:text-gray-600">View Size Guide</button>
            </div>
          </div>
        </div>
      </div>
      <FeatureProduct />
    </>
  )
}

export default ProductDetailPage

