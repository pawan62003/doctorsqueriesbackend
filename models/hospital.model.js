const express = require('express')
const mongoose = require('mongoose')

const HospitalSchema = mongoose.Schema({
    image1:{required:true,type:String},
    image2:{required:true,type:String},
    name:{required:true,type:String},
    location:{required:true,type:String},
    established:{required:true,type:Number},
    beds:{required:true,type:Number},
    about:{required:true,type:String},
    feature1:{required:true,type:String},
    feature2:{required:true,type:String},
    feature3:{required:true,type:String},
    feature4:{required:true,type:String},
    feature5:{type:String},
    feature6:{type:String},
    feature7:{type:String},
    feature8:{type:String},
    feature9:{type:String},
    feature10:{type:String},
    isPremium:{type:Boolean}
},{
    versionKey:false
})

const HospitalModel = mongoose.model('hospital',HospitalSchema);

module.exports = {
    HospitalModel
}