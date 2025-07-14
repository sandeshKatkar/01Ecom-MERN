import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contexts/shopContext.jsx';
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

function RelatedProducts({category,subCategory}) {
    const [related,setRelated]=useState();
    const {products}=useContext(ShopContext);

    useEffect(()=>{

        if(products.length>0){
            let productsCopy=products.slice();

            productsCopy=productsCopy.filter((item)=>category===item.category);
            productsCopy=productsCopy.filter((item)=>subCategory===item.subCategory);

            setRelated(productsCopy.slice(0,5));
            
        }

    },[products])
  return (
    <div className='my-16'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-5">
        {related && related.map((item,index)=>(
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
        ))}

        {/* {console.log(console.log(related))} */}
      </div>
    </div>
  )
}

export default RelatedProducts
