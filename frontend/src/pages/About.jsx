import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

function About() {
  return (
    <div className='px-10'>

      


      <div className="mb-10 mt-5 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
        <div className="text-2xl md:text-3xl text-start pt-4 border-b mb-5">
        <Title text1={'ABOUT'} text2={'US'}/>
        </div>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates aliquam quidem et asperiores quae obcaecati, culpa animi consequuntur doloremque ab quaerat at inventore nemo numquam.lorem20 Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ratione quae sunt quia quos harum illum fuga, magni impedit at.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi amet mollitia molestiae eos velit recusandae officiis magnam dolorum, veniam expedita!lorem10 lorem10</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum cum ad iure nesciunt qui culpa, eius cumque vel debitis eos? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, sint.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className="flex flex-col md:gap-4 gap-2 md:flex-row text-sm mb-20">

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto debitis hic, illum eligendi adipisci sunt!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto debitis hic, illum eligendi adipisci sunt!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto debitis hic, illum eligendi adipisci sunt!</p>
        </div>

      </div>

      <NewsLetterBox/>
      
    </div>
  )
}

export default About
