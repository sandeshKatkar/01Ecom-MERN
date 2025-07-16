import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl,currency } from '../constants.js'
import { useEffect } from 'react'
import { assets } from '../assets/assets'

function Orders({ token }) {
  const [allOrders, setAllOrders] = useState([]);
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
      // console.log(response.data)
      if (response.data.success) {
        // console.log(response.data)
        setAllOrders(response.data.orders.reverse()) // displaying current orders on top
        // console.log(allOrders.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

    const statusUpdateHandler= async(event,orderId)=>{
      // console.log(event.target.value + " " +orderId)
      const status=event.target.value
    try {
      const response=await axios.post(backendUrl+"/api/order/status",{orderId,status},{headers:{token}})
      // console.log(response.data.message)
      if (response.data.success) {
        // console.log(response.data)
        await fetchAllOrders()
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }
  }


  useEffect(() => {
    fetchAllOrders();
  }, [token])
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          allOrders && allOrders.map((order, index) => (
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-500 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>

              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {
                    order.items.map((item, i) => {
                      if (i === order.items.length - 1) {
                        return <p className='py-1' key={i}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                      } else {
                        return <p className='py-1' key={i}>{item.name} X {item.quantity} <span>{item.size}</span>,</p>
                      }
                    })
                  }
                  <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                  <div>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcod + ","}</p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>

              </div>


              <div>
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p>Payment:{order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toDateString()}</p>
              </div>

              <p className='text-sm sm:text-[15px]'>{currency} {order.amount}</p>
                  
              <select onChange={(event)=>statusUpdateHandler(event,order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>

              </select>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders
