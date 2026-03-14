const express = require("express");
const Chatbot = require("../models/Chatbot");

const router = express.Router();

// POST /api/bots/create
router.post("/create", async (req, res) => {
  try {
    const { name, description, tone, language, welcomeMessage } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "name is required" });
    }

    const bot = await Chatbot.create({
      name,
      description: description || "",
      tone: tone || "",
      language: language || "",
      welcomeMessage: welcomeMessage || ""
    });

    return res.json({ botId: bot._id.toString() });
  } catch (err) {
    return res.status(500).json({ error: "Failed to create bot" });
  }
});

// GET /api/bots
router.get("/", async (req, res) => {
  try {
    const bots = await Chatbot.find().sort({ createdAt: -1 });
    return res.json(bots);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch bots" });
  }
});

module.exports = router;
