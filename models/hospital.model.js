const express = require('express')
const mongoose = require('mongoose')

const HospitalSchema = mongoose.Schema({
    name:{required:true,type:String},
    description:{required:true,type:String},
    zipcode:{required:true,type:Number},
    city:{required:true,type:String},
    faclity:{required:true,type:String},
    state:{required:true,type:String},
    time:{required:true,type:String},
    spacific:{required:true,type:String},
},{
    versionKey:false
})

const HospitalModel = mongoose.model('hospital',HospitalSchema);

module.exports = {
    HospitalModel
}