import React from 'react'

function NewsLetterBox() {
    const submitHandler=(event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now and Get 20% Off</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, sint?</p>
        <form onSubmit={submitHandler} className='w-full sm:w-1/2 flex items-center gap-3 my-6 mx-auto pl-3 border '>
            <input type="email" name="letterBoxEmail" id=""className='w-full sm:flex-1 outline-none' placeholder='Enter Your Email' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
      
    </div>
  )
}

export default NewsLetterBox
