"use client"
import AdminLayout from "@/component/adminLayout"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Trash2, Upload } from "lucide-react"
import Image from "next/image"

interface Product {
  _id: string
  name: string
  category: string
  description: string
  image: string
  stock: number
  price: number
}

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState<Omit<Product, "_id">>({
    name: "",
    category: "",
    description: "",
    image: "",
    stock: 0,
    price: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/product/allproduct")
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.error("Error fetching products:", error)
      console.error("Failed to fetch products. Please try again.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "stock" || name === "price" ? Number(value) || 0 : value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
      console.error("Name, Category, and a valid Price are required!");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("category", newProduct.category);
      formData.append("description", newProduct.description);
      formData.append("stock", newProduct.stock.toString());
      formData.append("price", newProduct.price.toString());
  
      // Append the image file if available
      if (fileInputRef.current?.files?.[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      }
  
      const response = await fetch("http://localhost:3000/api/product/addproduct", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("Product added successfully");
        setNewProduct({ name: "", category: "", description: "", image: "", stock: 0, price: 0 });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        fetchProducts(); // Refresh the product list
      } else {
        throw new Error(data.message || "Failed to add product");
      }
  
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/product/deleteproduct/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        // console.log("Product deleted successfully")
        fetchProducts() // Refresh the product list
      } else {
        throw new Error("Failed to delete product")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      console.error("Failed to delete product. Please try again.")
    }
  }

  return (
    <AdminLayout>

<div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Page</h1>

      <form onSubmit={handleAddProduct} className="mb-8 bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              placeholder="Enter product category"
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Enter product price"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={newProduct.stock}
              onChange={handleInputChange}
              placeholder="Enter stock quantity"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows={3}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleImageUpload}
                ref={fileInputRef}
                accept="image/*"
              />
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>
            {newProduct.image && (
              <Image
                src={newProduct.image || "/placeholder.svg"}
                alt="Preview"
                className="mt-2 w-40 h-40 object-cover rounded"
              />
            )}
          </div>
        </div>
        <Button type="submit" disabled={isLoading} className="mt-6">
          {isLoading ? "Adding..." : "Add Product"}
        </Button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="object-cover w-full h-full"
                width={300}
                height={300}
              />
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-sm font-semibold rounded">
                ${product.price.toFixed(2)}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <p className="text-sm line-clamp-2">{product.description}</p>
              <p className="mt-2 text-sm font-semibold">Stock: {product.stock}</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="destructive" onClick={() => handleDeleteProduct(product._id)} className="w-full">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
     </AdminLayout>
  )
}

export default AdminPage

