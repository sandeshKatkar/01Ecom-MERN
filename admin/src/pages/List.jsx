import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl,currency } from '../constants.js'
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';


function List({token}) {

  const[list,setList]=useState([]);

  const fetchList=async()=>{
    try {
      const response=await axios.get(backendUrl+"/api/product/list")
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct=async(id)=>{
    try {
      const response=await axios.post(backendUrl+"/api/product/remove",{id},{headers:{token}}
)
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
        console.log(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }


// useEffect(()=>{
//   console.log(token)
//   fetchList();
// },[])

useEffect(() => {
  if (token) {
    // console.log("Fetching product list with token:", token);
    fetchList();
  }
}, [token]);



  return (
    <>
      <p className='mb-2'>All Product List</p>
      <div className="flex flex-col gp-2">

        {/* List Table Title */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ------List Products-------- */}

        {
          list.map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 my-2 py-1 px-2 border border-gray-300 text-sm bg-gray-100' key={index}>
              <img src={item.image[0]} alt="" className="w-12" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg flex items-end'><img className='w-5 mx-auto' src={assets.delete_icon} alt="" /></p>
            </div>
          ))
        }

      </div>
      
    </>
  )
}

export default List
