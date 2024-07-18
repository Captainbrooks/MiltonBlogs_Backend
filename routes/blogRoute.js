const express=require("express");
const router=express.Router();

const {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}=require("../controllers/blogControllers");


const requireAuth=require("../middlewares/requireAuth")
router.use(requireAuth);












// fetching all the blogs
router.get("/",getBlogs);


// fetching the specific blog with id
router.get("/:id",getBlog);


// creating the blog
router.post("/",createBlog);


// updtaing the blog with id
router.patch("/:id",updateBlog);


// deleting the blog with id
router.delete("/:id",deleteBlog);


module.exports=router;