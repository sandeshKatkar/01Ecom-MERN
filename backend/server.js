import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dotenv from 'dotenv';
import connectDB from './config/mongoDbConnect.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';

// app configration
const app=express()
const port=4000

app.use(express.urlencoded({ extended: true }));



dotenv.config();



//connect cloudinary
connectCloudinary();

// middlewares
app.use(express.json())
app.use(cors(
    {
        origin:"https://fashionbackend-three.vercel.app/",
        methods:["POST","GET"],
        credentials:true

    }
))

// connect to DB
connectDB();


// api end points

app.use('/api/user',userRouter);
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get("/",(req,res)=>{
    
    res.send("Server is Running !")

})




app.listen(port,()=>{
    console.log(`Your app is running on ${port}`)
})
