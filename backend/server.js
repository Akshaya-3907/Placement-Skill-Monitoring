
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
    res.send("Placement Skill Monitoring API is Running");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Error:", error.message);
    });

// Server
const PORT = process.env.PORT || 5000;
const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
