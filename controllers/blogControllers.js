const mongoose = require("mongoose");

const BlogModel = require("../models/BlogModel");

const getBlogs = async (req, res) => {
  try {
    const user_id = req.user._id;
    const blogs = await BlogModel.find({ user_id }).sort({ createdAt: -1 });
    if (!blogs) {
      res.json({ error: "Couldn't find any blogs" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such blog" });
    }

    const blog = await BlogModel.findById(id);

    if (!blog) {
      res.status(404).json({ error: `Couldn't find the blog with id  ${id} ` });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createBlog = async (req, res) => {
  const { title, body, author } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!body) {
    emptyFields.push("body");
  }

  if (!author) {
    emptyFields.push("author");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const user_id = req.user._id;

    const blog = await BlogModel.create({ title, body, author, user_id });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBlog = async (req, res) => {
  console.log("updated is reached");

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog" });
  }

  try {
    const blog = await BlogModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!blog) {
      res.status(400).json({ error: "No such Blog Found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog" });
  }

  try {
    const blog = await BlogModel.findOneAndDelete({ _id: id });
    if (!blog) {
      return res.status(404).json({ error: "No such blog" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
