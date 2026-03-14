const express = require("express");
const Conversation = require("../models/Conversation");

const router = express.Router();

// GET /api/analytics/:botId
router.get("/:botId", async (req, res) => {
  try {
    const { botId } = req.params;

    const totalChats = await Conversation.countDocuments({ botId });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const messagesToday = await Conversation.countDocuments({
      botId,
      timestamp: { $gte: startOfDay }
    });

    return res.json({
      totalChats,
      messagesToday
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router;
