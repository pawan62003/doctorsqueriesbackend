const express = require("express");
const { BlogModel } = require("../models/blog.model");
const BlogRoute = express.Router();

BlogRoute.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.send(blogs);
  } catch (error) {
    res.send({ err: error });
  }
  
});

BlogRoute.get("/:metaUrl", async (req,res) => {
  try {
    const  {metaUrl} = req.params;
    const blogs = await BlogModel.find({metaUrl});
    res.send(blogs);
  } catch (error) {
    res.send({ err: error });
  }
})

BlogRoute.post("/", async (req, res) => {
  try {
    const newBlog = new BlogModel(req.body);
    await newBlog.save();
    res.send({ msg: "New blog added successfully!" });
  } catch (error) {
    res.send({ err: error });
  }
});

BlogRoute.delete("/delete/:id", async (req, res) => {
    try {
        const {id} = req.params
        const afterDeletion = await BlogModel.findByIdAndDelete({_id:id})
        res.send({msg:"blog is deleted successfully!"})
    } catch (error) {
        res.send({ err: error });
    }
});


module.exports = {
  BlogRoute,
};
