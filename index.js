const express = require("express");
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
const { BannerRoute } = require("./routes/banner.route");

const server = express();


server.use(express.json());
server.use(cors());
// ... (use your middleware and routes)

// Middleware
server.use("/banner",BannerRoute);
server.use("/user", UserRoute);
server.use("/admin", AdminRoute);
server.use("/reviews", ReviewRoute);
server.use("/doctors", DoctorRoute);
server.use("/hospital", HospitalRoute);
server.use("/appointment", AppointmentRoute);
server.use("/otp", OtpRoute);
server.use("/blog", BlogRoute);

const PORT = process.env.PORT || 8585;
server.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected with the database");
    console.log(`server is running at port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
