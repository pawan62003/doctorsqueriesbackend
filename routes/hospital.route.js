const express = require("express")
const HospitalRoute = express.Router();
const {HospitalModel} = require("../models/hospital.model")


HospitalRoute.get('/',async(req,res)=>{
    try {
        const hospitals = await HospitalModel.find();
        res.send(hospitals)
    } catch (error) {
        res.send({"err":error})
    }
});

HospitalRoute.get("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const hospital = await HospitalModel.findById(id);
        res.send(hospital)
    } catch (error) {
        res.send({"err":error})
    }
})

HospitalRoute.get('/',async(req,res)=>{
    try {
        
    } catch (error) {
        res.send({"err":error})
    }
})

HospitalRoute.post("/",async(req,res)=>{
    try {
        const Newhospital = new HospitalModel(req.body)
        await Newhospital.save();
        res.send("hospital data os added in database")
    } catch (error) {
        res.send({"err":error})
    }
})

module.exports = {
    HospitalRoute
}