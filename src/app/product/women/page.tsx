'use client'
import Item from '@/component/item/item'
import React, { useState  , useEffect} from 'react'

const WomenPage = ( product:any) => {
    const [category, setCategory] = useState<any[]>([]);
    
    const fetchCategory = async () => {
        const res = await fetch("http://localhost:3000/api/product/allproduct");
        const data = await res.json();
        const womenProducts = data.products.filter((p: any) => p.category === "women");
        setCategory(womenProducts);
    }

    useEffect(()=>{
        fetchCategory();
    },[]);

    return (
        <div>
            {category.length > 0 ? (
                category.map((product: any) => (
                    <Item key={product._id} product={product}/>
                ))
            ) : "No product found"}
        </div>
    )
}

export default WomenPage
