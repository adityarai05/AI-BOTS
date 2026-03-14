import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getAnalytics = (botId: string): Promise<AxiosResponse> =>
  api.get(`/analytics/${botId}`);
