import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets"
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../contexts/shopContext.jsx';

function Navbar() {

    const [visible,setVisible]=useState(false);
    const{setShowSearch,getCartCount,navigate,token,setToken,setCartItem}=useContext(ShopContext);

    const logout=()=>{
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItem({})
        
    }

  return (
    <div className='flex items-center justify-between py-2 font-medium bg-pink-50 w-full px-5 md:px-10'>
        <img src={assets.logo} alt="" className='w-36' />
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to="/" className="flex flex-col items-center gap-1">
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
            <NavLink to="/collection" className="flex flex-col items-center gap-1">
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
            <NavLink to="/about" className="flex flex-col items-center gap-1">
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
            <NavLink to="/contact" className="flex flex-col items-center gap-1">
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

        </ul>


        <div className='flex items-center gap-6'>
            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="" className='w-5 cursor-pointer'/>
            <div className='group relative'>
                <img onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
                {/* User dropDowm menu */}
                {
                    token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                        <p onClick={(logout)} className='cursor-pointer hover:text-black'>LogOut</p>
                    </div>
                </div>

                }            

            </div>

            <Link to="/cart" className='relative'>
            <img src={assets.cart_icon} alt="" className='w-5' />
            <p className='absolute right-[-5px] bottom-[-5px]  w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>

            <img onClick={()=>setVisible(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden' />

            {/* create menu for smaller screen */}

            <div className={`absolute h-full top-0 bottom-0 right-0 overflow-hidden bg-pink-50 transition-all ${visible?"w-full":"w-0"} shadow-lg`}>
                <div className='flex flex-col text-gray-600'>
                    <div className='flex items-center gap-4 p-3 cursor-pointer' onClick={()=>setVisible(false)}>
                        <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180' />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className={"py-2 pl-6 border"} to="/">HOME</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className={"py-2 pl-6 border"} to="/collection">COLLECTION</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className={"py-2 pl-6 border"} to="/about">ABOUT</NavLink> 
                    <NavLink onClick={()=>setVisible(false)} className={"py-2 pl-6 border"} to="/contact">CONTACT</NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
