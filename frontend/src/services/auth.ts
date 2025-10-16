import apiClient from "./apiClient";
import type { paths } from "../types/api"; // openapi-typescript で生成された型

// 型の抽出
type LoginRequest =
  paths["/api/v1/dj-rest-auth/login/"]["post"]["requestBody"]["content"]["application/json"];

type LoginResponse =
  paths["/api/v1/dj-rest-auth/login/"]["post"]["responses"]["200"]["content"]["application/json"];

type LogoutResponse =
  paths["/api/v1/dj-rest-auth/logout/"]["post"]["responses"]["200"]["content"]["application/json"];

type SignupRequest =
  paths["/api/v1/dj-rest-auth/registration/"]["post"]["requestBody"]["content"]["application/json"];

type SignupResponse =
  paths["/api/v1/dj-rest-auth/registration/"]["post"]["responses"]["201"]["content"]["application/json"];

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        "/dj-rest-auth/login/",
        data
      );
      return response.data;
    } catch (error: any) {
      console.error("Error during login:", error);

      const data = error.response?.data;

      // DRF標準のキー順にエラーメッセージを抽出
      const message =
        data?.detail ||
        data?.non_field_errors?.[0] ||
        Object.values(data || {})[0]?.[0] ||
        error.message ||
        "ログインに失敗しました。";

      // よくある英語メッセージを日本語化
      const translated =
        message === "Unable to log in with provided credentials."
          ? "ユーザー名またはパスワードが正しくありません。"
          : message;

      throw new Error(translated);
    }
  }

  async logout(token: string): Promise<LogoutResponse> {
    try {
      const response = await apiClient.post<LogoutResponse>(
        "/dj-rest-auth/logout/",
        {}, // requestBodyはないけどaxiosのpostは第2引数が必要なので空オブジェクト
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

  async signup(data: SignupRequest): Promise<SignupResponse> {
    try {
      const response = await apiClient.post<SignupResponse>(
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
