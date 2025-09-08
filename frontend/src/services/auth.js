import apiClient from "./apiClient";

class AuthService {
  async login(data) {
    try {
      const response = await apiClient.post("/dj-rest-auth/login/", data);
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
