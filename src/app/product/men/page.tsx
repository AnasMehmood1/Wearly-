'use client'
import Item from '@/component/item/item';
import React, { useEffect, useState } from 'react'

const MenPage = () => {
    const [category, setCategory] = useState<any[]>([]);

    const fetchCategory = async () => {
        const res = await fetch("http://localhost:3000/api/product/allproduct");
         const data  = await res.json()
         const menproduct = data.products.filter((p:any)=> p.category === "men")
         setCategory(menproduct)

    }

    useEffect(()=>{
        fetchCategory()
    },[])

  return (
    <div>
        {
            category.length > 0 ? (
                category.map((product: any)=>{
                    return(
                        <Item key={product._id} product={product} />
                    )
                })
            ) : "No product found"
        }
      
    </div>
  )
}

export default MenPage
