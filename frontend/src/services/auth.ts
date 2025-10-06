import { DjRestAuthService, OpenAPI } from "../api";
import type { Login, Register, Token, RestAuthDetail } from "../api";

class AuthService {
  login(data: Login): Promise<Token> {
    return DjRestAuthService.djRestAuthLoginCreate(data);
  }

  signup(data: Register): Promise<Token> {
    return DjRestAuthService.djRestAuthRegistrationCreate(data);
  }

  logout(): Promise<RestAuthDetail> {
    return DjRestAuthService.djRestAuthLogoutCreate();
  }

  setToken(token: string) {
    OpenAPI.TOKEN = token; // 自動生成クライアント全体に反映
  }

  clearToken() {
    OpenAPI.TOKEN = undefined;
  }
}

// シングルトンとしてエクスポート
export default new AuthService();
