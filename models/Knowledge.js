const mongoose = require("mongoose");

const KnowledgeSchema = new mongoose.Schema({
  botId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chatbot",
    required: true
  },
  content: { type: String, required: true },
  embedding: { type: [Number], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Knowledge", KnowledgeSchema);
