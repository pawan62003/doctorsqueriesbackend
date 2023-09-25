const mongoose = require("mongoose")

const BlogSchema = mongoose.Schema({
    heading:{type:String,required:true},
    blog:{type:String,required:true},
    image:{type:String,required:true},
    auther:{type:String,required:true},
    date:{type:String,required:true}
})

const BlogModel = mongoose.model("blog",BlogSchema)

module.exports = {
    BlogModel
}