import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotel.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import cors
// for express server we need to write .js if we are using file with import
const app = express()
dotenv.config()
const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log('connectd to mongodb')
    }catch(error){
        throw (error);
    }
}
mongoose.connection.on('disconnected',()=>{
    console.log("mongoDb disconnected")
})
mongoose.connection.on('connected',()=>{
    console.log("mongoDb connected")
})

//middleware
app.use(cors({ origin: '*' }));
app.use(cookieParser())//use as function cookieParser
app.use(bodyParser.json())
app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)
app.use((err,req,res,next)=>{
    const errorStatus=err.status||500
    const errorMessage=err.message|| "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack :err.stack,        

    })
})


app.listen(5000,()=>{
    connect();
    console.log("connected to backend.");
})