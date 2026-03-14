const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  botId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chatbot",
    required: true
  },
  userMessage: { type: String, required: true },
  botReply: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Conversation", ConversationSchema);
