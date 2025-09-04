import { useState, useEffect } from "react";
import TodoDataService from "../services/todos";

export default function useAuth() {
  const [currentUsername, setCurrentUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("currentUsername");
    const savedToken = localStorage.getItem("token");

    if (savedUsername && savedToken) {
      setCurrentUsername(savedUsername);
      setToken(savedToken);
    }
  }, []);

  const login = async (user) => {
    if (!user || !user.username || !user.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const data = await TodoDataService.login(user); // { key: "..." }
      const token = data.key;
      if (!token) throw new Error("No token returned from server.");

      setToken(token);
      setCurrentUsername(user.username);

      localStorage.setItem("token", token);
      localStorage.setItem("currentUsername", user.username);

      setError("");
    } catch (e) {
      console.error("login error:", e);
      const message = e.response?.data?.detail || e.message || "Login failed.";
      setError(message);
    }
  };

  const logout = () => {
    setCurrentUsername(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUsername");
  };

  const signup = async (user = null) => {
    // 必要であればここに signup 処理を書く
    setCurrentUsername(user?.username ?? null);
  };

  return {
    currentUsername,
    token,
    error,
    login,
    logout,
    signup,
    setError,
  };
}
