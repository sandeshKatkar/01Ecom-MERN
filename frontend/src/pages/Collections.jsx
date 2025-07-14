import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import Title from '../components/Title'
import {ShopContext} from "../contexts/shopContext"
import ProductItem from "../components/ProductItem"

function Collections() {
  const [showFilter,setShowFilter]=useState(false);
  const [filterProducts,setFilterProducts]=useState([]);
  const {products,search,showSearch}=useContext(ShopContext);
  const [category,setCategory]=useState([]);
  const [subCategory,setSubCategory]=useState([]);
  const[sortType,setSortType]=useState('relavent')


  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item !== e.target.value))
    }else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  const toggleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item !== e.target.value))
    }else{
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }

  // filter the products

  const applyFilter=()=>{
    let productCopy=products.slice();

      // Search Logic
    if (search && showSearch) {
      productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length>0){
      productCopy=productCopy.filter(item=>category.includes(item.category));
    }
    if (subCategory.length>0) {
      productCopy=productCopy.filter(item=>subCategory.includes(item.subCategory));
    }
    setFilterProducts(productCopy);
  }

  // Sorting Products

  const sortProduct=()=>{
    let cpfilterProduct=filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setFilterProducts(cpfilterProduct.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(cpfilterProduct.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        // applyFilter();
        break;
    }
  }

  useEffect(()=>{
    sortProduct();
  },[sortType, filterProducts.length])

  useEffect(()=>{
    applyFilter();
  },[products, category, subCategory,search,showSearch])



  
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* filter options */}
       
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 '>FILTERS
          <img className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* category filter */}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?"":"hidden"} sm:block bg-pink-50`}>
          <p>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" name="" value={'Men'} className='w-3' onChange={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" name="" value={'Women'} className='w-3' onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" name="" value={'Kids'} className='w-3' onChange={toggleCategory}/>Kids
            </p>
          </div>
        </div>

        {/* subCategory Filter */}

                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter?"":"hidden"} sm:block bg-pink-50`}>
          <p>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" name="" value={'Topwear'} className='w-3' onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" name="" value={'Bottomwear'} className='w-3' onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" name="" value={'Winterwear'} className='w-3' onChange={toggleSubCategory}/>Winterwear
            </p>
          </div>
        </div>


      </div>

      {/* Right side */}

      <div className='flex-1'>
        
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'All'} text2={'COLLECTIONS'}/>
          {/* Product Sort */}
          <select onChange={(e)=>setSortType(e.target.value)} name="" id="" className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>


        {/* map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
          }
        </div>

      </div>



    </div>
  )
}

export default Collections
