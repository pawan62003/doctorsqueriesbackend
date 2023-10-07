const express = require('express');
const { UserModel } = require('../models/user.model');
const UserRoute = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


UserRoute.post('/signup',async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.find({email})
        if(user.length!==0){
            res.send({"msg":"user is allready registerd Please Login !!"})
        }
        else{
            bcrypt.hash(password, 4,async function(err, hash) {
                if(err){
                    res.send({err:err})
                }
                else{
                    const user = new UserModel({...req.body,password:hash})
                    await user.save();
                    res.send({msg:'new user has been added'})
                }
            });
        }
    } catch (error) {
        res.send({err:error})
    }
})

// this route for login :---

UserRoute.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user){
            res.send({"msg":"please Signup first"})
        }
        else{
            bcrypt.compare(password, user.password, function(err, result) {
                if(!result){
                    res.send({msg:"please enter valid cradential"})
                }
                else{
                    const token = jwt.sign({ userID: user._id}, 'solo_project');
                    res.send({token:token,msg:'Login success'})
                }
            });
        }
    } catch (error) {
        res.send({err:error})
    }
})

UserRoute.get("/",async(req,res) => {
    try {
        const token = req.query.token
        const decode = jwt.verify(token, "solo_project");
        if (decode) {
        const user = await UserModel.find({_id:decode.userID})
        console.log(user)
        res.send(user[0].name)
        } else {
          res.send({ msg: "Please Login !!!" });
        }
    } catch (error) {
        res.send({err:error})
    }
})

UserRoute.post("/forget",async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await UserModel.find({email});
        if(!user){
            res.send({msg:'first create Account'})
        }
        else{
            bcrypt.hash(password, 4,async function(err, hash) {
                if(err){
                    res.send({err:err})
                }
                else{
                    const afterUpdate = await UserModel.findByIdAndUpdate({_id:user._id},{password:hash})
                    res.send({msg:'forget password compleated'})
                }
            });
        }
    } catch (error) {
        res.send({err:error})
    }
})

module.exports={
    UserRoute
}