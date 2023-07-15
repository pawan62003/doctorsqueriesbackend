const express = require('express');
const mongoose = require('mongoose')

const DoctorSchema = mongoose.Schema({
    name:{required:true,type:String},
    city:{required:true,type:String},
    image:{required:true,type:String},
    spacility:{required:true,type:String},
    time:{required:true,type:String},
    expe:{required:true,type:Number},
    age:{required:true,type:Number},
    gender:{required:true,type:String},
    state:{required:true,type:String},
    fees:{required:true,type:Number},
    description:{required:true,type:String}
},{
    versionKey:false
})

const DoctorModel = mongoose.model('doctor',DoctorSchema);

module.exports={
    DoctorModel
}