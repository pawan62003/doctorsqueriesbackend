const express = require("express");
// const sendgrid = require('@sendgrid/mail')
const cors = require("cors");
const { connection } = require("./db");
const { UserRoute } = require("./routes/user.route");
const { DoctorRoute } = require("./routes/doctor.route");
const { auth } = require("./middleware/auth.middleware");
const { HospitalRoute } = require("./routes/hospital.route");
const { AdminRoute } = require("./routes/admin.route");
const { ReviewRoute } = require("./routes/review.route");
const { AppointmentRoute } = require("./routes/appointment.route");
const { OtpRoute } = require("./routes/otp.route");
const { BlogRoute } = require("./routes/blog.route");


const server = express();
server.use(express.json());
server.use(cors());


server.use("/user", UserRoute);
server.use("/admin", AdminRoute);
server.use("/reviews", ReviewRoute);
server.use("/doctors", DoctorRoute);
server.use("/hospital", HospitalRoute);
server.use("/appointment", AppointmentRoute);
server.use("/otp",OtpRoute)
server.use("/blog",BlogRoute)
server.use(auth);



// server.post("/send-otp", (req, res) => {
//     const {email} = req.body;
    
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "sharmaashish7251@gmail.com",
//       pass: "uoyu hgfw udtp emme",
//     },
//   });

//   var mailOptions = {
//     from: "pawan6200327812@gmail.com",
//     to: email,
//     subject: "Doctors Query Appointment verifacation",
//     text: `your varifications OTP is ${generateOTP()}`,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// });

// server.post("/verify-otp", (req, res) => {
//   const { email, otp } = req.body;

//   if (otpStore[email] && otpStore[email] === otp) {
//     // OTP is valid
//     res.status(200).json({ message: "OTP is valid" });
//   } else {
//     // OTP is invalid
//     res.status(400).json({ error: "Invalid OTP" });
//   }
// });

server.listen(8585, async () => {
  try {
    await connection;
    console.log("connected with database");
    console.log(`server is running at port 8585`);
  } catch (error) {
    console.log(error);
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
