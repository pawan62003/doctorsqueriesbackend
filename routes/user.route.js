const express = require('express');
const { UserModel } = require('../models/user.model');
const UserRoute = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


UserRoute.post('/signup',async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.find({email})
        console.log(user)
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

UserRoute.get("/",(req,res) => {
    try {
        const token = req.query.token
        const decode = jwt.verify(token, "solo_project");
        if (decode) {
          console.log(decode)
        } else {
          res.send({ msg: "Please Login !!!" });
        }
    } catch (error) {
        res.send({err:error})
    }
})

module.exports={
    UserRoute
}