import axios from "axios";
import type { AxiosInstance } from "axios";

const baseURL: string =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const apiClient: AxiosInstance = axios.create({
  baseURL,
});

export default apiClient;
