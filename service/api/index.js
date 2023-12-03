import axios from "axios";
import { API_KEY, API_URL, API_HOST } from "@env";
const url = `${API_URL}`;

const apiInstance = axios.create({
  baseURL: url,
});

apiInstance.interceptors.request.use((config) => {
  config.headers["X-RapidAPI-Key"] = `${API_KEY}`;
  config.headers["X-RapidAPI-Host"] = `${API_HOST}`;
  return config;
});

export default apiInstance;
