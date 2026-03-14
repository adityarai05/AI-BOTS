import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const uploadKnowledge = (
  botId: string,
  content: string
): Promise<AxiosResponse> =>
  api.post("/knowledge/upload", {
    botId,
    content,
  });
