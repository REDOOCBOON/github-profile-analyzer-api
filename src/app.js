const express = require("express");
const cors = require("cors");

const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "GitHub Profile Analyzer API",
    status: "Running"
  });
});

app.use("/api/profiles", profileRoutes);

module.exports = app;