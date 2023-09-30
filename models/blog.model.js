const mongoose = require("mongoose")

const BlogSchema = mongoose.Schema({
    image:{type:String,required:true},
    auther:{type:String,required:true},
    date:{type:String,required:true},
    description:{type:String,required:true},
    title:{type:String,required:true},
    tag:{type:String,required:true}
})

const BlogModel = mongoose.model("blog",BlogSchema)

module.exports = {
    BlogModel
}