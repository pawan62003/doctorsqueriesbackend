const express = require("express");
const { DoctorModel } = require("../models/doctors.model");
const DoctorRoute = express.Router();
const axios = require("axios");
const API_KEY = "15106e32380f4441a9e659ec6346fa9c";

async function geocodeCity(city) {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        city
      )}&key=${API_KEY}`
    );
    const { results } = response.data;
    if (results.length > 0) {
      const { lat, lng } = results[0].geometry;
      return { latitude: lat, longitude: lng };
    }
    return null;
  } catch (error) {
    console.error("Error geocoding city:", error);
    return null;
  }
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

DoctorRoute.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const afterDeletion = await DoctorModel.findByIdAndDelete({ _id: id });
    res.send({ msg: `doctor id deleted with id: ${id}` });
  } catch (error) {
    res.send(error);
  }
});

DoctorRoute.patch("/update/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    const id = req.params.id;
    const afterUpdation = await DoctorModel.findByIdAndUpdate(
      { _id: id },
      updatedData
    );
    res.send({ msg: "doctors data is updated successfully" });
  } catch (error) {
    res.send(error);
  }
});

DoctorRoute.get("/all", async (req, res) => {
  try {
    const data = await DoctorModel.find();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

DoctorRoute.get("/", async (req, res) => {
  const { page, limit, spacility } = req.query;
  const query = {};
  const newPage = page || 1;
  const newLimit = limit || 6;
  const skip = (newPage - 1) * newLimit;
  try {
    const doctor = await DoctorModel.find().skip(skip).limit(newLimit);
    // res.send(doctor);
    if (doctor.length === 0) {
      res.status(404).send({ message: "No Doctor's Found" });
    } else {
      const count = await DoctorModel.countDocuments();
      res.status(200).send({
        doctor,
        currentPage: parseInt(newPage),
        totalPages: Math.ceil(count / newLimit),
      });
    }
  } catch (error) {
    res.send({ err: error });
  }
});

DoctorRoute.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await DoctorModel.findById(id);
    res.send(doctor);
  } catch (error) {
    res.send({ err: error });
  }
});

DoctorRoute.get("/doctors/near", async (req, res) => {
  const { lat: latitude, lon: longitude, cat } = req.query;

  try {
    const distances = [];
    regexPattern = cat
      .split(" ")
      .map((term) => `(?=.*${term})`)
      .join("");
    const doctors = await DoctorModel.find({
      spacility: { $regex: regexPattern, $options: "i" },
    });
    for (const person of doctors) {
      const { location: doctorlocation } = person;
      const location = await geocodeCity(`${doctorlocation}, india`);

      if (location) {
        const distance = calculateDistance(
          latitude,
          longitude,
          location.latitude,
          location.longitude
        );
        if (distance <= 15) {
          person.set('distance', distance);
          distances.push({ person, distance });
        }
      }
    }

    // if (distances.length >= 3) {
    //   distances.sort((a, b) => a.distance - b.distance);
    //   const nearestPersons = distances
    //     .slice(0, 3)
    //     .map(({ person }) => person);

    //   res.json(nearestPersons);
    // }
    // else {
    //   distances.sort((a, b) => a.distance - b.distance);
    //   const nearestPersons = distances.map(({ person }) => person);

    //   res.json(nearestPersons);
    // }
    distances.sort((a, b) => a.distance - b.distance);
    const nearestPersons = distances.map(({ person }) => person);

    res.json(nearestPersons);
  } catch (error) {}
});

DoctorRoute.post("/", async (req, res) => {
  try {
    const data = new DoctorModel(req.body);
    await data.save();
    res.send({ msg: "doctor is added on database" });
  } catch (error) {
    res.send({ err: error });
  }
});

module.exports = {
  DoctorRoute,
};
