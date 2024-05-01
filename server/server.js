const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");

const port = process.env.PORT || 5000;
const dbConnection = require("./db");

// Middleware
app.use(express.json());

// API routes
app.use("/api/cars/", require("./routes/carsRoute"));
app.use("/api/users/", require("./routes/usersRoute"));
app.use("/api/admin/", require("./routes/adminRoute"));
app.use("/api/bookings/", require("./routes/bookingsRoute"));

// Resolve path to client's build directory
const clientBuildPath = path.resolve(__dirname, "..", "client", "build");

// Serve static files from the client build directory
app.use(express.static(clientBuildPath));

// For all other requests, send the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.resolve(clientBuildPath, "index.html"));
});

// Start the server
app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));
