import { createContext, useContext, useState, useEffect } from "react";
import TodoDataService from "../services/todos";

// Context を作成
const AuthContext = createContext();

// Provider コンポーネント
export const AuthProvider = ({ children }) => {
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

  const logout = async () => {
    try {
      await TodoDataService.logout();
    } catch (error) {
      console.error("Logout API error:", error);
      // エラーでもトークンはクリアしたいのでcatchに処理を入れておく
    } finally {
      setCurrentUsername(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("currentUsername");
    }
  };

  const signup = async (user = null) => {
    if (
      !user ||
      !user.username ||
      !user.email ||
      !user.password1 ||
      !user.password2
    ) {
      setError("すべてのフィールドを入力してください。");
      return;
    }

    try {
      await TodoDataService.signup(user);
      const loginData = await TodoDataService.login({
        username: user.username,
        password: user.password1,
      });

      const token = loginData.key;
      if (!token)
        throw new Error(
          "ログインに失敗しました。トークンが返されませんでした。"
        );

      setToken(token);
      setCurrentUsername(user.username);
      localStorage.setItem("token", token);
      localStorage.setItem("currentUsername", user.username);
      setError("");
    } catch (e) {
      console.error("signup error:", e);

      if (e.response && e.response.data) {
        const firstError = Object.values(e.response.data)[0];
        if (Array.isArray(firstError)) {
          setError(firstError[0]);
        } else {
          setError(firstError);
        }
      } else {
        setError(e.message || "Signup failed.");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUsername,
        token,
        error,
        login,
        logout,
        signup,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 認証状態にアクセスするカスタムフック
export const useAuthContext = () => useContext(AuthContext);
