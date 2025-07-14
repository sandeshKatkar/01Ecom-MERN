import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../contexts/shopContext.jsx'
import axios from 'axios'

function Orders() {
  const{backendUrl,token,currency}=useContext(ShopContext)
  const [orderData,setOrderData]=useState([])

  const loadOrdersData=async()=>{
    try {
      if(!token){
        return null;
      }

      const response=await axios.post(backendUrl+'/api/order/userorder',{},{headers:{token}})
      // console.log(response.data)
      let allOrdersData=[]
      if(response.data.success){
        
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status,
            item['payment']=order.payment,
            item['paymentMethod']=order.paymentMethod,
            item['date']=order.date,
            allOrdersData.push(item)
          })
        })
      }
      if (allOrdersData) {
        setOrderData(allOrdersData.reverse())
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    loadOrdersData()
  },[token])

  return (
    <div className='border-t pt-16'>

      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

        {
          orderData && orderData.map((item,index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

              <div className="flex item-start gap-6 text-sm">
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />

                <div>
                  <p className="font-medium sm:text-base">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size : {item.size}</p>
                  </div>
                  
                  <p className='mt-2'>Date : <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                  <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrdersData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
              </div>

            </div>
          ))
        }
      
      <div>
        {

        }
      </div>
      
    </div>
  )
}

export default Orders
