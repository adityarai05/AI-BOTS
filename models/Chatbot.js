const mongoose = require("mongoose");

const ChatbotSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "", trim: true },
  tone: { type: String, default: "", trim: true },
  language: { type: String, default: "", trim: true },
  welcomeMessage: { type: String, default: "", trim: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chatbot", ChatbotSchema);
