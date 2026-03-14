
console.log("Server file started...");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/users");   // import routes

const app = express();
app.use((req,res,next)=>{
  console.log("Incoming request:", req.url);
  next();
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
// Register routes
app.use("/api/users", userRoutes);

console.log("MONGO_URI value:", process.env.MONGO_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.log("❌ Mongo Error:", err.message));

// Test route
app.get("/", (req, res) => {
  res.send("Server working");
});

// Start Server
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});