import { ShopContext } from "./shopContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'



const ShopContextProvider=(props)=>{
    const currency="$";
    const deliveryFee=10;
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const [cartItems,setCartItems]=useState({})
    const [products,setProducts]=useState([])
    const [token,setToken]=useState('');
    const navigate=useNavigate();
    


    // ----------------add to cart functionality--------------

    const addTOCart=async(itemId,size)=>{

        
        if(!size){
            toast.error('Please select the size ! ');
            return;
        }

        let cartData= structuredClone(cartItems);
        

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
        // console.log(token)

        if(token){
            try {
              const response=await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
            //   console.log(response.data)
              if(response.data.success){
                // console.log(response.data.message)
                toast.success(response.data.message)
              }else{
                toast.error(response.data.messege)
              }
            } catch (error) {
                console.log(error.messege)
                toast.error(error.messege )
            }
        }
        
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

     if(token){
            try {
              const response=await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
              
              if(response.data.success){
                console.log(response.data.message)
                toast.success(response.data.message)
              }else{
                toast.error(response.data.message)
              }
            } catch (error) {
                console.log(error.message)
                toast.error(error.message )
            }
        }
   }

   
    //---------------get cart amount----------------

    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id===items);
    //         if (!itemInfo) {
    //         console.warn(`Product with ID not found in products list.`);
    //         continue; // Skip if product not found
    // }
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

        // console.log(totalAmount)

        return totalAmount;
    }

    // ----------geting products from backend-------

    const getProductData=async()=>{
        try {
            // -- Api Call
            const response=await axios.get(backendUrl+"/api/product/list")
            // console.log(response.data)
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.messege)
            }
        } catch (error) {
            toast.error(error.messege)
        }
    }

    const getUserCart=async(token)=>{
        // console.log(token)
        try {
            const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
            // console.log(response.data)
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductData();
       
    },[])
    useEffect(()=>{
         getCartCount();
    },[cartItems])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
            
        }
    },[])


    const value={
        products,currency,deliveryFee,
        search,showSearch,setSearch,setShowSearch,
        cartItems,
        setCartItems,
        addTOCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,token
        
    }


    
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;