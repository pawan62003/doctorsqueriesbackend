const express = require("express");
const OtpRoute = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { OtpModel } = require("../models/otp.model");

// Store OTPs temporarily (In production, use a database)
const otpStore = {};

// // Generate a random OTP
function generateOTP() {
  return crypto.randomInt(1000, 9999).toString();
}

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sharmaashish7251@gmail.com",
    pass: "uoyu hgfw udtp emme",
  },
});

OtpRoute.post("/send", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP()

    const newOTP = new OtpModel({...req.body,otp});
    await newOTP.save();

    var mailOptions = {
      from: "pawan6200327812@gmail.com",
      to: email,
      subject: "Doctors Query Appointment verifacation",
      text: `your varifications OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send({ err: error });
      } else {
        res.send({ msg: "otp sent successfully"});
      }
    });
  } catch (error) {
    res.send({ err: error });
  }
});

OtpRoute.post("/verify", async(req,res) => {
  try {
    const {email,otp} = req.body
    const find = await OtpModel.find({email,otp})
    if(find.length>0){
      res.send({msg:"otp verify success"})
    }
    else{
      res.send({"msg":"please enter correct otp"})
    }
  } catch (error) {
    res.send({err:error})
  }
});

module.exports = {
  OtpRoute,
};
