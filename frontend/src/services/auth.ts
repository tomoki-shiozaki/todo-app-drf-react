import apiClient from "./apiClient";
import type { paths } from "../types/api"; // openapi-typescript で生成された型

// 型の抽出
type LoginRequest = NonNullable<
  paths["/api/v1/dj-rest-auth/login/"]["post"]["requestBody"]
>["content"]["application/json"];

type LoginResponse =
  paths["/api/v1/dj-rest-auth/login/"]["post"]["responses"]["200"]["content"]["application/json"];

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        "/api/v1/dj-rest-auth/login/",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  async logout(token) {
    try {
      const response = await apiClient.post(
        "/dj-rest-auth/logout/",
        {},
        {
          headers: {
            Authorization: token ? `Token ${token}` : "",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }

  async signup(data) {
    try {
      const response = await apiClient.post(
        "/dj-rest-auth/registration/",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }
}

export default new AuthService();
