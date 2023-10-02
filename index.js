const express = require("express");
const cors = require("cors");
const http = require("http"); // Import the http module
const socketIo = require("socket.io"); // Import Socket.io
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
const httpServer = http.createServer(server); // Create an HTTP server

const io = socketIo(httpServer); // Create a Socket.io server instance

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

// Socket.io connection event
io.on("connection", (socket) => {
  console.log("A user connected");

  // You can listen for events from the client here
  socket.on("someEventFromClient", (data) => {
    console.log("Received data from client:", data);

    // You can emit data back to the client or broadcast it to all connected clients
    io.emit("someEventToClient", { message: "Hello from the server" });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 8585;
httpServer.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected with the database");
    console.log(`server is running at port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
