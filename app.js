require("dotenv").config();
const cors=require("cors");
const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();


const mongoose=require("mongoose");

const blogRoute=require("./routes/blogRoute");
const userRoute=require("./routes/userRoute");






//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/blogs",blogRoute);
app.use("/api/user",userRoute);









mongoose.connect(process.env.MONDODB_URL)
.then(()=>{
    console.log("Database is connected");
})
.catch((error)=>{
    console.log(error)
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`)
})




