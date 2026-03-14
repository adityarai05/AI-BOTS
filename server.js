require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const botsRoutes = require("./routes/bots");
const knowledgeRoutes = require("./routes/knowledge");
const chatRoutes = require("./routes/chat");
const analyticsRoutes = require("./routes/analytics");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Serve widget script
app.use(express.static(path.join(__dirname, "public")));

// Register routes (no auth)
app.use("/api/bots", botsRoutes);
app.use("/api/knowledge", knowledgeRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/analytics", analyticsRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err.message));

// Test route
app.get("/", (req, res) => {
  res.send("Server working");
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
