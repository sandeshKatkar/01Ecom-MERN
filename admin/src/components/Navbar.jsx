import React from 'react'
import {assets} from '../assets/assets'
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center px-[4%] justify-between bg-gray-400 h-[60px]'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <h2 className='text-sm md:text-[25px] text-gray-600 font-semibold'>Admin Panel</h2>
      <button onClick={()=>setToken('')} className='bg-gray-600 text-white py-2 px-5 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm '>Logout</button>
    </div>
  )
}

export default Navbar
