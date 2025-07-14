import React from 'react'
import { assets } from '../assets/assets'

function Hero() {
  return (
    <div className='flex flex-col sm:flex-row mt-10 sm:mt-16'>

{/* Hero Left Side */}
        <div className='flex w-full sm:w-1/2 items-center justify-center p-10 sm:p-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>OUR BEST SELLERS</p>
                </div>
                <h1 className='text-3xl lg:text-5xl leading-relaxed'>Latest Arivals</h1>
                <div className='mt-2 flex items-center gap-2'>
                    <p className='font-semibold text-sm sm:text-base'>SHOP NOW</p>
                    <p className='w-8 h-[1px] md:w-11 bg-[#414141]'></p>
                </div>
            </div>
        </div>

        {/* Hero Right Side */}
            <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />      
    </div>
  )
}

export default Hero
