import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contexts/shopContext.jsx'
import Title from './Title';
import ProductItem from './ProductItem';

function LetestCollection() {

const {products}=useContext(ShopContext);
const [latestCollection,setLatestCollection]=useState([]);

useEffect(()=>{
    setLatestCollection(products.slice(0,10));
},[products])
// console.log(products);

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta rem magni consequuntur quibusdam quisquam</p>
        </div>

        {/* rendering products */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {latestCollection.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))}
        </div>
      
    </div>
  )
}

export default LetestCollection
