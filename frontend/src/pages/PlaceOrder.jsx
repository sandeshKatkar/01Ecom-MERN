import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../contexts/shopContext.jsx'
import axios from 'axios'
import {toast} from 'react-toastify'

function PlaceOrder() {
  const [method,setMethod]=useState('stripe')
  const{navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,deliveryFee,products}=useContext(ShopContext)

  const [formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcod:'',
    country:'',
    phone:''
  })

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;

    // get the values from input fields and store it in appropriate variables
    setFormData(data=>({...data,[name]:value}))
  } 

  // this function for create razorpay payment
  // const initPay=(order)=>{
  //   const options={
  //     key:import.meta.env.RAZORPAY_KEY_ID,
  //     amount:order.amount,
  //     currency:order.currency,
  //     name:'order payment',
  //     description:'Order Payment',
  //     order_id:order.id,
  //     receipt:order.receipt,
  //     handler:async(response)=>{
  //       console.log(response)
  //       try {
  //         const {data}=await axios.post(backendUrl+"/api/order/verifyRazorpay",response,{headers:{token}})
  //         if(data.success){
  //           navigate('/orders')
  //           setCartItems({})
  //         }
  //       } catch (error) {
  //         console.log(error)
  //         toast.error(error.message)
  //       }
  //     }
  //   }

  //   const rzp=new window.Razorpay(options)
  //   rzp.open()

  // }

  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try {
      let orderItems=[]

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      // console.log(deliveryFee)
      // console.log(getCartAmount)
      let orderData={
        address:formData,
        items:orderItems,
        amount:getCartAmount()+deliveryFee
      }
      // console.log(orderData)

      switch (method) {
        case 'cod':{
          const response=await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
          console.log(response.data)
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          break;
        }

        case 'stripe':{
          const responseStripe=await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{token}})
          if(responseStripe.data.success){
            const {session_url}=responseStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.message)
          }
          break;
        }
        // case 'razorpay':{
        //   const responseRazorpay=await axios.post(backendUrl+'/api/order/razorpay',orderData,{headers:{token}})
        //   if(responseRazorpay.data.success){
        //     initPay(responseRazorpay.data.order)

        //   }
        //   break;
        // }
      
        default:
          break;
      }


    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[18vh] border-t'>

      {/* ----------Left Side--------------- */}

      <div className="flex flex-col gap-4 w-full max-w-[480px]">

        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='First name'/>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Last name'/>
        </div>

         <input required onChange={onChangeHandler} name='email' value={formData.email} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Email address'/>
         <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Street'/>


        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='City'/>
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='State'/>
        </div>      

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='zipcod' value={formData.zipcod} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Zipcode'/>
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Country'/>
        </div>
      
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="text" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder='Phone'/>
      
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
            
            
            {/* <div onClick={()=>setMethod('rozarpay')} className={`flex item-center gap-3 border p-2 px-3 cursor-pointer`}>
              <p className={`my-auto min-w-3.5 h-3.5 border rounded-full ${method==='rozarpay'?'bg-green-400':''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div> */}
            
            
            <div onClick={()=>setMethod('cod')} className={`flex item-center gap-3 border p-2 px-3 cursor-pointer`}>
              <p className={`my-auto min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-400':''}`}></p>
              <p className='h-5 mx-4 font-medium text-gray-700'>CASH ON DELIVERY</p>
            </div>

          </div>


          <div className="w-full text-end mt-8">
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm font-medium'>PLACE ORDER</button>
          </div>
        </div>
      </div>
      
    </form>
  )
}

export default PlaceOrder
