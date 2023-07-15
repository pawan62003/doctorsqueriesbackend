const express = require("express");
const cors = require('cors');
const {connection} = require('./db');
const { UserRoute } = require("./routes/user.route");
const { DoctorRoute } = require("./routes/doctor.route");
const { auth } = require("./middleware/auth.middleware");
const {HospitalRoute} = require("./routes/hospital.route");

const server = express();
server.use(express.json());
server.use(cors());

server.use('/user',UserRoute);
server.use(auth);
server.use("/doctors",DoctorRoute);
server.use("/hospital",HospitalRoute);

server.listen(8585,async()=>{
    try {
       await connection
       console.log("connected with database")
       console.log(`server is running at port 8585`)
    } catch (error) {
        console.log(error)
    }
});