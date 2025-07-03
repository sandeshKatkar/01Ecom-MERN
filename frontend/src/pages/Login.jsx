import React, { useState } from 'react'

function Login() {
  const [currentState,setCurrentState]=useState('Login')

  const onSubmitHandle=(event)=>{
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandle} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center mt-10 gap-2 mb-2">
        <p className="text-3xl">{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>

      {currentState==='Login'?'':<input type="text" className="w-full px-3 py-2 border border-gray-800" placeholder='Name' required/>}
      <input type="email" className="w-full px-3 py-2 border border-gray-800" placeholder='Email' required/>
      <input type="password" className="w-full px-3 py-2 border border-gray-800" placeholder='Password' required/>

      {currentState==='Login'
      ?<div className="w-full flex justify-between text-sm mt-[-8px]">
    
          <p  className="cursor-pointer">Forgot your password</p>
          <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account?</p>
          
        
      </div>
      :  <p onClick={()=>setCurrentState('Login')} className='w-full mt-[-8px] cursor-pointer         text-end'>Login Here</p>
      
      }


      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState}</button>
    </form>
  )
}

export default Login

