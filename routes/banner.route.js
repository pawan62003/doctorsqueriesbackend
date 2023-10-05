const express = require("express");
const BannerRoute = express.Router();
const { BannerModel } = require("../models/banner.model");

BannerRoute.get("/", async (req, res) => {
  try {
    const banners = await BannerModel.find();
    res.send(banners);
  } catch (error) {
    res.send({ err: error });
  }
  
});

BannerRoute.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const UpdatedData = await BannerModel.findByIdAndUpdate(
      { _id: id },
      req.body
    );
    res.send({ msg: "Banner updated successfully" });
  } catch (error) {
    res.send({ err: error });
  }
});


BannerRoute.post("/", async (req, res) => {
  try {
    const newBanner = new BannerModel(req.body);
    await newBanner.save();
    res.send({ msg: "banner saved successfully" });
  } catch (error) {
    res.send({ err: error });
  }
});


module.exports = {
    BannerRoute
}