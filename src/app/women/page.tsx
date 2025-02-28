"use client"
import Item from "@/component/item/item"
import { useState, useEffect, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

const WomenPage = () => {
  const [category, setCategory] = useState<Product[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const [selectedOption ,setSelectedOption] = useState<string>("women")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])


  const sizes = ["XS", "S", "M", "L", "XL"]
  const categories = ["Dresses", "Tops", "Pants", "Skirts", "Outerwear", "Accessories"]

  const fetchCategory = useCallback(async (categoryType: string) => {
    const res = await fetch("/api/product/allproduct")
    const data = await res.json()
    
    if(categoryType === "all"){
        setCategory(data.products)
    }
    else{
        const womenProducts = data.products.filter((p: Product) => p.category === categoryType)
        setCategory(womenProducts)
    }
  }, [])

  useEffect(() => {
    fetchCategory(selectedOption)
  }, [fetchCategory , selectedOption])

  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Products</h1>   
        <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">Showing all products</p>
             
             <select className="text-sm text-gray-500 border border-gray-300 rounded-md px-5 py-2" defaultValue={"women"} onChange={(e)=> setSelectedOption(e.target.value)}>
             <option value="women">Women</option>
                <option value="all">All</option>
                <option value="men">Men</option>
              
             </select>
            
        </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox
                    id={cat}
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([...selectedCategories, cat])
                      } else {
                        setSelectedCategories(selectedCategories.filter((c) => c !== cat))
                      }
                    }}
                  />
                  <label
                    htmlFor={cat}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-lg font-medium mb-4">Price Range</h3>
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-4">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    if (selectedSizes.includes(size)) {
                      setSelectedSizes(selectedSizes.filter((s) => s !== size))
                    } else {
                      setSelectedSizes([...selectedSizes, size])
                    }
                  }}
                  className={`px-3 py-1 text-sm border rounded-full ${
                    selectedSizes.includes(size)
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSelectedCategories([])
              setSelectedSizes([])
              setPriceRange([0, 1000])
            }}
            className="text-sm text-gray-600 hover:text-black underline"
          >
            Clear all filters
          </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.length > 0 ? (
              category.map((product: Product) => <Item key={product._id} product={product} />)
            ) : (
              <p className="col-span-full text-center text-gray-500">No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WomenPage

