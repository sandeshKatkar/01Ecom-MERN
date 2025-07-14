import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify'

function Add({token}) {

  const[image1,setImage1]=useState(false)
  const[image2,setImage2]=useState(false)
  const[image3,setImage3]=useState(false)
  const[image4,setImage4]=useState(false)

  const[name,setName]=useState("")
  const[description,setDescription]=useState("")
  const[price,setPrice]=useState("")
  const[category,setCategory]=useState("")
  const[subCategory,setSubCategory]=useState("")
  const[bestseller,setBestseller]=useState(false)
  const[sizes,setSizes]=useState([])

  

  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    console.log(name,description,price,category,subCategory,bestseller,sizes)
    try {
      const formdata=new FormData()

      formdata.append("name",name)
      formdata.append("description",description)
      formdata.append("price",price)
      formdata.append("category",category)
      formdata.append("subCategory",subCategory)
      formdata.append("bestseller",bestseller)
      formdata.append("sizes",JSON.stringify(sizes))

      image1 && formdata.append("image1",image1)
      image2 && formdata.append("image2",image2)
      image3 && formdata.append("image3",image3)
      image4 && formdata.append("image4",image4)


      const response= await axios.post(backendUrl+"/api/product/add",formdata,{headers:{token}})
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setPrice('')
        setDescription('')
        setSizes([])
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      } else {
        toast.error(response.data.message)
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Uploade Images</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img  className='w-20' src={!image1?assets.upload_area:URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" name="" id="image1" hidden/>
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2?assets.upload_area:URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" name="" id="image2" hidden/>
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3?assets.upload_area:URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" name="" id="image3" hidden/>
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4?assets.upload_area:URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" name="" id="image4" hidden/>
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-1">Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write here' />
      </div>
      <div className="w-full">
        <p className="mb-1">Product description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Type content here'></textarea>
      </div>


      <div className='flex gap-5 w-full max-w-[500px]'>
        <div>
          <p className="mb-1">Product category</p>
          <select onChange={(e)=>setCategory(e.target.value)} value={category} className="w-full px-3 py-2">
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-1">Sub category</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className="w-full px-3 py-2">
            <option value="">Select Sub Category</option>
            <option value="Topwere">Topwere</option>
            <option value="Bottomwere">Bottomwere</option>
            <option value="Winterwere">Wintrwere</option>
          </select>
        </div>

         <div>
          <p className="mb-1">Product price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25'/>
        </div>
      </div>


     

      <div>
        
        <p>Product Sizes</p>

        <div className="flex gap-3 mt-1">

          <div onClick={()=>setSizes(prev=>prev.includes("S")?prev.filter(item=>item!== "S"):[...prev,"S"])}>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes("S")?"bg-gray-400 text-gray-900":"bg-slate-300"}`}>S</p>
          </div>


          <div onClick={()=>setSizes(prev=>prev.includes("M")?prev.filter(item=>item!== "M"):[...prev,"M"])}>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes("M")?"bg-gray-400 text-gray-900":"bg-slate-300"}`}>M</p>
          </div>


          <div onClick={()=>setSizes(prev=>prev.includes("L")?prev.filter(item=>item!== "L"):[...prev,"L"])}>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes("L")?"bg-gray-400 text-gray-900":"bg-slate-300"}`}>L</p>
          </div>


          <div onClick={()=>setSizes(prev=>prev.includes("XL")?prev.filter(item=>item!== "XL"):[...prev,"XL"])}>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes("XL")?"bg-gray-400 text-gray-900":"bg-slate-300"}`}>XL</p>
          </div>

          <div onClick={()=>setSizes(prev=>prev.includes("XXL")?prev.filter(item=>item!== "XXL"):[...prev,"XXL"])}>
            <p className={`px-3 py-1 cursor-pointer ${sizes.includes("XXL")?"bg-gray-400 text-gray-900":"bg-slate-300"}`}>XXL</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-1">
        <input onChange={()=>setBestseller(prev=>!prev)} type="checkbox" checked={bestseller} id="bestseller" />
        <lable className="cursor-pointer" htmlFor='bestseller'>Add to best seller</lable>
      </div>


      <button className='w-40 bg-black text-white py-3 mt-4 rounded' type="submit">Add</button>

      
    </form>
  )
}

export default Add
