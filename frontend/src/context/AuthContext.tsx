import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useErrorContext } from "./ErrorContext";
import AuthService from "../services/auth";
import type { paths } from "../types/api"; // openapi-typescript で生成された型
import {
  LOCALSTORAGE_TOKEN_KEY,
  LOCALSTORAGE_USERNAME_KEY,
} from "../constants/storage";

// 型の抽出
type LoginRequest =
  paths["/api/v1/dj-rest-auth/login/"]["post"]["requestBody"]["content"]["application/json"];

type SignupRequest =
  paths["/api/v1/dj-rest-auth/registration/"]["post"]["requestBody"]["content"]["application/json"];

// AuthContext で提供する値の型
interface AuthContextType {
  currentUsername: string | null;
  token: string | null;
  login: (user: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  signup: (user: SignupRequest) => Promise<void>;
}

// Provider の props 型
interface AuthProviderProps {
  children: ReactNode;
}

// Context を作成（初期値は null にしてカスタムフックで安全に取得）
const AuthContext = createContext<AuthContextType | null>(null);

// Provider コンポーネント
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { setError } = useErrorContext();

  useEffect(() => {
    const savedUsername = localStorage.getItem(LOCALSTORAGE_USERNAME_KEY);
    const savedToken = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    if (savedUsername && savedToken) {
      setCurrentUsername(savedUsername);
      setToken(savedToken);
    }
  }, []);

  const login = async (user: LoginRequest): Promise<void> => {
    if (!user || !user.username || !user.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const data = await AuthService.login(user); // { key: "..." }
      const token = data.key;
      if (!token) throw new Error("No token returned from server.");

      setToken(token);
      setCurrentUsername(user.username);

      localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
      localStorage.setItem(LOCALSTORAGE_USERNAME_KEY, user.username);

      setError("");
    } catch (e: any) {
      console.error("login error:", e);
      const message = e.response?.data?.detail || e.message || "Login failed.";
      setError(message);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (token) {
        await AuthService.logout(token); // state から取得
      }
    } catch (e: unknown) {
      console.error("Logout error:", e);
      // エラーでもトークンはクリアしたいのでcatchに処理を入れておく
    } finally {
      setCurrentUsername(null);
      setToken(null);
      localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
      localStorage.removeItem(LOCALSTORAGE_USERNAME_KEY);
    }
  };

  const signup = async (user: SignupRequest): Promise<void> => {
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
      await AuthService.signup(user);
      const loginData = await AuthService.login({
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
      localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
      localStorage.setItem(LOCALSTORAGE_USERNAME_KEY, user.username);
      setError("");
    } catch (e: any) {
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
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 認証状態にアクセスするカスタムフック
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
};
