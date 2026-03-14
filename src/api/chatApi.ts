import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const sendMessage = async (botId: string, message: string) => {
  try {
    const response = await api.post("/chat/message", {
      botId,
      message,
    });

    return response.data;

  } catch (error: any) {
    console.error("Chat API Error:", error.response?.data || error.message);
    throw error;
  }
};
