import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contexts/shopContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [currentState,setCurrentState]=useState('Login')

  const{token,setToken,navigate,backendUrl}=useContext(ShopContext)

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const onSubmitHandle=async(event)=>{
    event.preventDefault();
    try {
      if(currentState==='Sign Up'){
        const response=await axios.post(backendUrl+"/api/user/register",{name,email,password})

        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }
      else{
        const response=await axios.post(backendUrl+"/api/user/login",{email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  })

  return (
    <form onSubmit={onSubmitHandle} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center mt-10 gap-2 mb-2">
        <p className="text-3xl">{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>

      {currentState==='Login'?'':<input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="w-full px-3 py-2 border border-gray-800" placeholder='Name' required/>}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="w-full px-3 py-2 border border-gray-800" placeholder='Email' required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="w-full px-3 py-2 border border-gray-800" placeholder='Password' required/>

      {currentState==='Login'
      ?<div className="w-full flex justify-between text-sm mt-[-8px]">
    
          <p  className="cursor-pointer">Forgot your password</p>
          <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account?</p>
          
        
      </div>
      :  <p onClick={()=>setCurrentState('Login')} className='w-full mt-[-8px] cursor-pointer         text-end'>Login Here</p>
      
      }


      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState}</button>
    </form>
  )
}

export default Login

