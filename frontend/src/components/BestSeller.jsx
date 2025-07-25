import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../contexts/shopContext.jsx';
import Title from './Title';
import ProductItem from './ProductItem';

function BestSeller() {
    const {products}=useContext(ShopContext);
    const [bestSeller,setBestSeller]=useState([])

    useEffect(()=>{
        const bestSellerProducts=products.filter((item)=>(item.bestseller))
        setBestSeller(bestSellerProducts.slice(0,5))
    },[products])
  return (
    <div className='py-6'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLER'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta rem magni consequuntur quibusdam quisquam</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                    bestSeller.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
        }
        </div>
    </div>
  )
}

export default BestSeller
