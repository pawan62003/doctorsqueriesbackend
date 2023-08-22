const express = require('express');
const ReviewRoute = express.Router();
const { ReviewModel } = require("../models/review.model");

ReviewRoute.get("/", async (req, res) => {
    try {
        const doctorId = req.query.doctorId; // Extract doctorId from query parameters
        const reviews = await ReviewModel.find({ doctorId });
        res.send(reviews);
    } catch (error) {
        res.status(500).send({ msg: "Failed to read reviews" });
    }
});

ReviewRoute.post("/", async (req, res) => {
    try {
        const newReview = req.body;
        const reviewData = new ReviewModel(newReview);
        await reviewData.save();
        res.status(201).send({ msg: "Review posted successfully" });
    } catch (error) {
        res.status(500).send({ msg: "Failed to post your review" });
    }
});

module.exports = {
    ReviewRoute
};
