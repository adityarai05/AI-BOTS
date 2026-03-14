const express = require("express");
const router = express.Router();

const Chatbot = require("../models/Chatbot");
const Knowledge = require("../models/Knowledge");
const Conversation = require("../models/Conversation");

const { generateChatResponse } = require("../services/aiService");

router.post("/message", async (req, res) => {

  console.log("🔥 Chat API Hit");
  console.log("Request Body:", req.body);

  try {

    const { botId, message } = req.body;

    if (!botId || !message) {
      return res.status(400).json({
        error: "botId and message are required"
      });
    }

    const bot = await Chatbot.findById(botId);

    if (!bot) {
      return res.status(404).json({
        error: "Bot not found"
      });
    }

    const knowledgeDocs = await Knowledge.find({ botId });

    const knowledge = knowledgeDocs.map(k => k.content).join("\n");

    console.log("Knowledge Loaded:", knowledgeDocs.length);

    const reply = await generateChatResponse({
      knowledge,
      message,
      bot
    });

    console.log("AI Reply:", reply);

    res.json({
      reply
    });

  } catch (error) {

    console.error("❌ CHAT API ERROR");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    res.status(500).json({
      error: "Chat server error",
      details: error.message
    });

  }
});

module.exports = router;