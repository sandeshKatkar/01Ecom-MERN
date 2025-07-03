import { ShopContext } from "./shopContext";
import { products } from "../assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';



const ShopContextProvider=(props)=>{
    const currency="$";
    const deliveryFee=10;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const [cartItems,setCartItems]=useState({})
    const navigate=useNavigate();


    // ----------------add to cart functionality--------------

    const addTOCart=(itemId,size)=>{

        
        if(!size){
            toast.error('Please select the size ! ');
            return;
        }

        let cartData= (cartItems);
        

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

    

    // ---------------Get cart count---------------

   const getCartCount=()=>{
     let totalCount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalCount+=cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalCount;
   }


   //----------------Update Quantity -----------------

   const updateQuantity=async(itemId,size,quantity)=>{
    let cartdata=structuredClone(cartItems);
    cartdata[itemId][size]=quantity ;
    setCartItems(cartdata)
   }

   
    //---------------get cart amount----------------

    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id===items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalAmount+=itemInfo.price*cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        return totalAmount;
    }


    const value={
        products,currency,deliveryFee,
        search,showSearch,setSearch,setShowSearch,
        cartItems,
        addTOCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
        
    }


    
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;