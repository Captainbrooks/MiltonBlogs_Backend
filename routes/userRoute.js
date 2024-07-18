const express=require("express");
const router=express.Router();

const {loginUser,signUpUser, getProfile,updateUser}=require("../controllers/userController");




// //login



router.post("/login",loginUser);

router.post("/signup",signUpUser);

router.get("/getProfile/:email",getProfile)

router.post("/UpdateUser/:email",updateUser)








module.exports=router;