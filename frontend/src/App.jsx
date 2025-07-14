import React from "react"
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import Collection from "./pages/Collections"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Product from "./pages/Product"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SearchBar from "./components/SearchBar"

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Verify from "./pages/Verify"
function App() {
  

  return (
    <>
    <Navbar/>
    <SearchBar/>
     <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[5vw]">
      <ToastContainer/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/cart" element={<Cart/>} /> 
          <Route path="/login" element={<Login/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/placeOrder" element={<PlaceOrder/>}/>
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/collection" element={<Collection/>}/>
          <Route path="/verify" element={<Verify/>}/>
      </Routes>
      <Footer/>
     </div>
    </>
  )
}

export default App
