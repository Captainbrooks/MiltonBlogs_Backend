const User=require("../models/userModel")
const jwt=require("jsonwebtoken")



const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:"10d"})
}




// login 

const loginUser=async(req,res)=>{
 
    const {email,password}=req.body;
    try {

        const user=await User.login(email,password)

        console.log(user)
        
        const token=createToken(user._id);
        res.status(200).json({
            success:true,
            email,
            token})
        console.log(token);


  
    } catch (error) {
        res.status(400).json({
            success:false,
            error:error.message})
       
    }
}




// signup 

const signUpUser=async(req,res)=>{
    
console.log("Sign up route is reached")
    const {username,email,password}=req.body;
    try {
        const user=await User.signup(username,email,password);
const token=createToken(user._id);

        res.status(200).json({username,email,token})
    
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


const updateUser = async (req, res) => {
    console.log("Updated user is reached");
    const { email } = req.params;
    const { uusername, uemail } = req.body;
  

  
    try {
      const user = await User.findOneAndUpdate({email}, {username: uusername, email:uemail }, { new: true });
  
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ error: "User Not found" });
      }
  

      res.status(200).json(user);
   
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const getProfile=async(req,res)=>{

    const {email}=req.params;
    const user=await User.findOne({email});

    if(!user){
        res.status(400).json({error:"Couldn't found to User"});
    }
    const userDetails={
        username:user.username,
        email:user.email
    }
   
    res.status(200).json(userDetails)

}








module.exports={loginUser,signUpUser,getProfile,updateUser}