const express = require("express");
const AppointmentRoute = express.Router();
const { appointMentModel } = require("../models/appointment.model");

AppointmentRoute.get("/", async (req, res) => {
    try {
        const data = await appointMentModel.find()
        res.send(data)
    } catch (error) {
        res.send({msg:"failed to find appointment"})
    }
});

AppointmentRoute.post("/", async (req, res) => {
    try {
        const newAppointment = new appointMentModel(req.body)
        await newAppointment.save()
        res.send({msg:"new appointment created successfully"})
    } catch (error) {
        res.send({msg:"error while saving appointment"})
    }
});

AppointmentRoute.get("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const data = await appointMentModel.findById(id)
        res.send(data);
    } catch (error) {
        res.send({msg:"error while getting a appointment"})
    }
});

AppointmentRoute.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const afterDeletion = await appointMentModel.findByIdAndDelete(id)
        res.send({msg:`appointment deleted with id ${id}`})
    } catch (error) {
        res.send({msg:"error while deleting a appointment"})
    }
});

AppointmentRoute.patch("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const afterUpdation = await appointMentModel.findByIdAndUpdate({_id:id},req.body)
        res.send({msg:"appointment successfully updated"})
    } catch (error) {
        res.send({msg:"error while updating a appointment"})
    }
});

module.exports = {
  AppointmentRoute,
};
