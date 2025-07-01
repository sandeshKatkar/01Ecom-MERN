import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm cursor-pointer border-t-[1px] border-gray-200 pt-6'>

        <div className=''>
            <img src={assets.logo} alt="" className='mb-5w-32'/>
            <p className='w-full md:w-1/2 text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure, animi?</p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-212-345-6789</li>
                <li>shop@gmail.com</li>
            </ul>
        </div>
             
    </div>
    <div className='w-full p-4'>
            <div className='w-full h-[1px] bg-gray-400'></div>
            <p className='mt-4 text-sm text-center sm:text-center'>Copyright 2025@ forever.com , All Rights Reserved.</p>
    </div>

    </>
  )
}

export default Footer
