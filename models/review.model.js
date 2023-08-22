const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    doctorId:{required:true,type:String},
    userName:{required:true,type:String},
    rating:{required:true,type:String},
    description:{required:true,type:String},
})

const ReviewModel = mongoose.model("review",reviewSchema)

module.exports = {
    ReviewModel
}