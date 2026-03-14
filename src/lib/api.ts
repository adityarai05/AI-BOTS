import axios, { type AxiosResponse } from "axios";

const apiClient = axios.create({
baseURL: "http://localhost:5000/api",
});

apiClient.interceptors.request.use((config) => {
const token = localStorage.getItem("token");

if (token) {
config.headers = config.headers ?? {};
config.headers.Authorization = `Bearer ${token}`;
}

return config;
});

/* ---------------- BOT APIs ---------------- */

export const createBot = (
data: Record<string, unknown>
): Promise<AxiosResponse> => apiClient.post("/bots/create", data);

export const getUserBots = (): Promise<AxiosResponse> =>
apiClient.get("/bots/user");

/* ---------------- KNOWLEDGE APIs ---------------- */

export const uploadKnowledge = (
data: FormData | Record<string, unknown>
): Promise<AxiosResponse> => {
const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

return apiClient.post("/knowledge/upload", data, {
headers: isFormData
? { "Content-Type": "multipart/form-data" }
: undefined,
});
};

/* ---------------- CHAT API (FIXED) ---------------- */

export const sendMessage = async (botId: string, message: string) => {
const response = await apiClient.post("/chat/message", {
botId,
message,
});

return response.data;
};

/* ---------------- ANALYTICS API ---------------- */

export const getAnalytics = (botId: string): Promise<AxiosResponse> =>
apiClient.get(`/analytics/${botId}`);

export { apiClient };
