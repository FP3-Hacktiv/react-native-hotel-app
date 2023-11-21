import axios from "axios";

const apiInstance = axios.create({
	baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
});

apiInstance.interceptors.request.use((config) => {
  config.headers["X-RapidAPI-Key"] = `${process.env.EXPO_PUBLIC_API_KEY}`;
  config.headers["X-RapidAPI-Host"] = `${process.env.EXPO_PUBLIC_API_HOST}`;
  return config;
});

export default apiInstance;
