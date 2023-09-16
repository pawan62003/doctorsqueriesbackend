const mongoose = require("mongoose")

const otpSchema =  mongoose.Schema({
    email:{type:String,required:true},
    otp:{type:String,required:true},
    createdAt: { type: Date, expires: '10m', default: Date.now }, // Automatically delete data after 10 minutes
},{
    versionKey:false
})


const OtpModel = mongoose.model('otp',otpSchema)

module.exports = {
    OtpModel
}