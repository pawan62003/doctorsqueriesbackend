const express = require('express');
const {DoctorModel} = require('../models/doctors.model');
const DoctorRoute = express.Router();
const axios = require('axios')
const API_KEY = '15106e32380f4441a9e659ec6346fa9c';


async function geocodeCity(city) {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${API_KEY}`);
      const { results } = response.data;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry;
        return { latitude: lat, longitude: lng };
      }
      return null;
    } catch (error) {
      console.error('Error geocoding city:', error);
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
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

DoctorRoute.get('/',async(req,res)=>{
    try {
        const doctor = await DoctorModel.find()
        res.send(doctor)
    } catch (error) {
        res.send({"err":error})
    }
})

DoctorRoute.get('/nearest',async(req,res)=>{
    const { lat:latitude, lon:longitude } = req.query; 
    try {
        const distances = [];
        const doctors = await DoctorModel.find();
        for (const person of doctors) {
            const { city,state } = person;
            const location = await geocodeCity(`${city} ${state} india`);
        
            if (location) {
              const distance = calculateDistance(latitude, longitude, location.latitude, location.longitude);
              console.log(distance)
              if(distance<=500){
                distances.push({ person, distance });
              }
            }
          }

          if(distances.length>=3){
            distances.sort((a, b) => a.distance - b.distance);
            const nearestPersons = distances.slice(0, 3).map(({ person }) => person);
          
            res.json(nearestPersons);
          }else{
            distances.sort((a, b) => a.distance - b.distance);
            const nearestPersons = distances.map(({ person }) => person);
          
            res.json(nearestPersons);
          }
    } catch (error) {
        
    }
})


DoctorRoute.post('/',async(req,res)=>{
    try {
        const data = new DoctorModel(req.body)
        await data.save();
        res.send({"msg":"doctor is added on database"})
    } catch (error) {
        res.send({"err":error})
    }
})

module.exports = {
    DoctorRoute
}