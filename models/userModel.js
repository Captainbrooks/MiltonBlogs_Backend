const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const validator=require("validator");


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});


userSchema.statics.signup=async function(username,email,password){

//validation logic checking if the username , email or password are empty or not

if(!username || !email || !password){
    throw Error("All fields must be filled..")
}
if(!validator.isEmail(email)){
    throw Error("Invalid Email..")
}
if (!validator.isAlpha(username[0])) {
    throw Error("Username must start with a letter")
}

if(!validator.isStrongPassword(password)){
    throw Error("Password must be at least 8 characters long and contain a combination of uppercase letters, lowercase letters, numbers, and special characters.")
}

const isEmailExists=await this.findOne({email})

if(isEmailExists){
    throw Error("Email already in Use..")
}

const isUserNameExists=await this.findOne({username})

if(isUserNameExists){
    throw Error("This Username has been already taken. Try another one..");
}


// in bcrypt we have two main things one is salt and another is hash
// in salt , we generate the salt round like how many times we will generate for eg in this case we say we would like 10 times..
// bcrypt has genSalt function to generate salt


// in hash, we hash the password and hash function takes two paramater one is the thing we are hashing in this case our password and another
//parameter is salt round in this case since we say 10 so will hash it for 10 times..

const salt=await bcrypt.genSalt(10);
const hash=await bcrypt.hash(password,salt)

const user=await this.create({username,email,password:hash})

return user

}


// static login method

userSchema.statics.login=async function(email,password){

    if(!email || !password){
        throw Error("All fields must be filled...")
        
    }

    const user=await this.findOne({email});
    if(!user){
        throw Error("User not registered")
    }

 

    const match=await bcrypt.compare(password,user.password)

    if(!match){
        throw Error("In correct password..")
    }

    return user



}



const User=mongoose.model("User",userSchema);


module.exports=User;
      
    

  



