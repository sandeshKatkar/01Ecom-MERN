import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../contexts/shopContext'

function PlaceOrder() {
  const [method,setMethod]=useState('stripe')
  const{navigate}=useContext(ShopContext)
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[18vh] border-t'>

      {/* ----------Left Side--------------- */}

      <div className="flex flex-col gap-4 w-full max-w-[480px]">

        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className="flex gap-3">
          <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='First name'/>
          <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Last name'/>
        </div>

         <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Email address'/>
         <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Street'/>


        <div className="flex gap-3">
          <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='City'/>
          <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='State'/>
        </div>      

        <div className="flex gap-3">
          <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Zipcode'/>
          <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Country'/>
        </div>
      
        <input type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Phone'/>
      
      </div>


      {/* --------------Right Side----------------- */}


      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal/>
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'}/>

          {/* ---------payment method selection---------- */}

          <div className="flex gap-3 flex-col lg:flex-row">
            
            
            <div onClick={()=>setMethod('stripe')} className={`flex item-center gap-3 border p-2 px-3 cursor-pointer`}>
              <p className={`my-auto min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-green-400':''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            
            
            <div onClick={()=>setMethod('rozarpay')} className={`flex item-center gap-3 border p-2 px-3 cursor-pointer`}>
              <p className={`my-auto min-w-3.5 h-3.5 border rounded-full ${method==='rozarpay'?'bg-green-400':''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            
            
            <div onClick={()=>setMethod('cod')} className={`flex item-center gap-3 border p-2 px-3 cursor-pointer`}>
              <p className={`my-auto min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-400':''}`}></p>
              <p className='h-5 mx-4 font-medium text-gray-700'>CASH ON DELIVERY</p>
            </div>

          </div>


          <div className="w-full text-end mt-8">
            <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm font-medium'>PLACE ORDER</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default PlaceOrder
