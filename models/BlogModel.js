const mongoose=require("mongoose");


const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
      
    },
    body:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true});


const BlogModel=new mongoose.model("Blogs",BlogSchema);

module.exports=BlogModel

