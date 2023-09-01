const express = require('express');
const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
    name:{required:true,type:String},
    image:{required:true,type:String},
    location:{required:true,type:String},
    spacility:{required:true,type:String},
    fees:{required:true,type:Number},
    exp:{required:true,type:String},
    org:{required:true,type:String},
    about:{required:true,type:String},
    feature1:{required:true,type:String},
    feature2:{required:true,type:String},
    feature3:{required:true,type:String},
    feature4:{required:true,type:String},
    feature5:{required:true,type:String},
    feature6:{required:true,type:String},
    feature7:{required:true,type:String},
    feature8:{required:true,type:String},
    distance: Number,
    feature9:{type:String},
    feature10:{type:String},
    feature11:{type:String},
    feature12:{type:String},
    feature13:{type:String},
    feature14:{type:String},
    feature15:{type:String},
    isPremium:{type:Boolean}
},{
    versionKey:false
})

const DoctorModel = mongoose.model('doctor',DoctorSchema);

module.exports={
    DoctorModel
}