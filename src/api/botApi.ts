import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export interface BotPayload {
  name: string;
  description: string;
  tone: string;
  language: string;
  welcomeMessage: string;
}

export const createBot = (data: BotPayload): Promise<AxiosResponse> =>
  api.post("/bots/create", data);

export const getBots = (): Promise<AxiosResponse> => api.get("/bots");
