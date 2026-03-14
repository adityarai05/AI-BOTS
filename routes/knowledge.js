const express = require("express");
const Knowledge = require("../models/Knowledge");
const Chatbot = require("../models/Chatbot");
const { chunkText } = require("../utils/textChunker");
const { getEmbedding } = require("../services/embeddingService");

const router = express.Router();

// POST /api/knowledge/upload
router.post("/upload", async (req, res) => {
  try {
    const { botId, content } = req.body;

    if (!botId || !content) {
      return res.status(400).json({ error: "botId and content are required" });
    }

    const bot = await Chatbot.findById(botId);
    if (!bot) {
      return res.status(404).json({ error: "Bot not found" });
    }

    const chunks = chunkText(content, 500);
    if (chunks.length === 0) {
      return res.status(400).json({ error: "No content to process" });
    }

    const saved = [];
    for (const chunk of chunks) {
      const embedding = await getEmbedding(chunk);
      const doc = await Knowledge.create({
        botId,
        content: chunk,
        embedding
      });
      saved.push(doc._id.toString());
    }

    return res.json({ chunks: saved.length });
  } catch (err) {
    return res.status(500).json({ error: "Failed to upload knowledge" });
  }
});

module.exports = router;
