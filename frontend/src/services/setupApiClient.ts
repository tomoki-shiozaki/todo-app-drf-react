import { OpenAPI } from "../api";

// BASE URL の初期化
OpenAPI.BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

// このファイルをインポートするだけで全自動生成クライアントに反映される
