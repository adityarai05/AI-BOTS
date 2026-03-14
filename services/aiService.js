const Groq = require("groq-sdk");

console.log("GROQ KEY:", process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function generateChatResponse({ knowledge, message }) {
  try {

    console.log("📩 User Message:", message);
    console.log("📚 Knowledge length:", knowledge ? knowledge.length : 0);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `Use the following knowledge to answer the user:\n${knowledge || "No knowledge provided"}`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    // Safety check
    if (!completion || !completion.choices || completion.choices.length === 0) {
      throw new Error("No response returned from Groq");
    }

    const reply = completion.choices[0].message.content;

    console.log("🤖 AI Reply:", reply);

    return reply;

  } catch (error) {

    console.error("❌ GROQ ERROR");
    console.error("Error message:", error.message);

    if (error.response) {
      console.error("Groq API Response:", error.response.data);
    }

    console.error(error);

    throw new Error("Failed to generate reply");
  }
}

module.exports = { generateChatResponse };