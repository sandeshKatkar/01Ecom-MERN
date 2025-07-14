import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {ShopContext} from '../contexts/shopContext.jsx'
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

function Product() {
  const {products,currency,addTOCart,getCartCount}=useContext(ShopContext);
  const{productId}=useParams();
  const [productData,setProductData]=useState(false)
  const[image,setImage]=useState('')
  const [size,setSize]=useState('')
// console.log(products)
// const fetchProductData=async()=>{
//   products.map((item)=>{
//     if (item._id===productId) {
//       setProductData(item);
//       console.log(productData)
//       setImage(item.image[0])
//       return null
//     }
//   })
// }

//useEffect(()=>{
  // fetchProductData();
//},[productId])

  useEffect(() => {
    if (products) {
      const product = products.find(item => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  }, [productId, products]);

  if (!productData) {
    return <p>Loading product...</p>;
  }
//  console.log(productData)



  return productData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* product data */}

      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* product Images  */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* ----------product Info--------- */}

        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3" />
              <img src={assets.star_icon} alt="" className="w-3" />
              <img src={assets.star_icon} alt="" className="w-3" />
              <img src={assets.star_icon} alt="" className="w-3" />
              <img src={assets.star_dull_icon} alt="" className="w-3" />
              <p className='pl-2'>(200)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p> 
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-5'>
              <p className='text-gray-600'>select size</p>
              <div className='flex gap-2'>
                {
                  productData.sizes.map((item,index)=>(
                    <button onClick={()=>setSize(item)} className={`border px-4 py-2 bg-gray-400 font-medium ${item===size?'border-orange-400':''}`} key={index}>{item}</button>
                  ))
                }
              </div>
              <button onClick={()=>{addTOCart(productData._id,size);getCartCount()}} className='w-60 mt-1 bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
              <hr className='mt-1 sm:w-4/5'/>
              <div className='text-sm text-gray-500 flex flex-col gap-1'>
                <p>100% original product.</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
        </div>
      </div>

      {/* Description & reviews section */}

      <div className='mt-20'>
        <div className='flex gap-2'>
          <b className='border px-5 py-3 text-small'>Description</b>
          <p className='border px-5 py-3 text-small'>Reviews (200)</p>
        </div>
        <div className='flex flex-col gap-4 border py-6 px-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis amet quisquam labore recusandae provident, sapiente repellat quia molestiae quibusdam suscipit quaerat eligendi, laudantium voluptas voluptatem. Magni aut veniam hic porro. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, laudantium!</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus laudantium eaque vitae ab laborum qui exercitationem itaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis asperiores animi inventore.</p>
        </div>
      </div>

                {/* ---------------Display Related Products----------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/> 
      
    </div>
  ):<div className='opacity-0'></div>
}

export default Product
