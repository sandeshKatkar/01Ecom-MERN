import { ShopContext } from "./shopContext";
import { products } from "../assets/assets";
import { useEffect, useState } from "react";



const ShopContextProvider=(props)=>{
    const currency="$";
    const deliveryFee=10;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const [cartItems,setCartItems]=useState({})


    // ----------------add to cart functionality--------------

    const addTOCart=async(itemId,size)=>{
        let cartData=structuredClone(cartItems);

        if(cartData[itemId])
        {
            if(cartData[itemId][size])
            {
                cartData[itemId][size]+=1;
            }else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }

        setCartItems(cartData);

    }

    const value={
        products,currency,deliveryFee,
        search,showSearch,setSearch,setShowSearch,
        cartItems,addTOCart
    }

    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])
    
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;