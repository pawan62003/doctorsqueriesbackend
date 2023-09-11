const express = require("express");
// const sendgrid = require('@sendgrid/mail')
const cors = require('cors');
const {connection} = require('./db');
const { UserRoute } = require("./routes/user.route");
const { DoctorRoute } = require("./routes/doctor.route");
const { auth } = require("./middleware/auth.middleware");
const {HospitalRoute} = require("./routes/hospital.route")
const { AdminRoute } = require("./routes/admin.route");
const {ReviewRoute} = require("./routes/review.route");
const {AppointmentRoute} = require("./routes/appointment.route")

const server = express();
server.use(express.json());
server.use(cors());



server.use('/user',UserRoute);
server.use('/admin',AdminRoute);
server.use('/reviews',ReviewRoute)
server.use('/doctors',DoctorRoute);
server.use("/hospital",HospitalRoute);
server.use("/appointment",AppointmentRoute)
server.use(auth);

server.listen(8585,async()=>{
    try {
       await connection
       console.log("connected with database")
       console.log(`server is running at port 8585`)
    } catch (error) {
        console.log(error)
    }
});



// all Routes
// 1.login - http://localhost:8585/user/login - post request
// 2.Signup - http://localhost:8585/user/signup - post request
// 3.Signup - http://localhost:8585/admin/signup - post request
// 4.login - http://localhost:8585/admin/login - post request
// 5.All Doctor data - http://localhost:8585/doctors - get request
// 6.nearest Doctor data - http://localhost:8585/doctors/nearest?lat='pass the latitude'7&lon='pass the longitude' - get request
// 7.Add a new doctor - http://localhost:8585/doctors - post request
// 8.Delete a doctor - http://localhost:8585/doctors/delete/id - delete request
// 9.All Hospital data - http://localhost:8585/hospital - get request
// 9.add a new Hospital data - http://localhost:8585/hospital - post request
// 10.see the review  - http://localhost:8585/reviews/?doctorId = "" get request
// 11.write a review  - http://localhost:8585/reviews/ post request