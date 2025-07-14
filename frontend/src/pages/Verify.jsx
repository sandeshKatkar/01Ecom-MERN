import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../contexts/shopContext.jsx'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

function Verify() {

    const {navigate,token,backendUrl,setCartItems}=useContext(ShopContext)
    const [searchParams,setSearchParams]=useSearchParams()
     const success=searchParams.get('success')
     const orderId=searchParams.get('orderId')

    // it is a temprary verification method if you want to verify them use webox method 
     const verifyPayment=async()=>{
        try {
            if (!token) {
                return null
            }
            const response=await axios.post(backendUrl+"/api/order/verifyStripe",{success,orderId},{headers:{token}})

            if (response.data.success) {
                setCartItems({})
                navigate("/orders")
            } else {
                navigate("/cart")
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])
  return (
    <div>
      
    </div>
  )
}

export default Verify
