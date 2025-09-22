# ==============================
# Python / Django
# ==============================

# 依存関係インストール
install-backend:
	pip install -r backend/requirements.txt

# 開発サーバー起動
run-backend:
	cd backend && .venv/bin/python manage.py runserver

# OpenAPI schema を生成
generate-schema:
	cd backend && DEBUG=False .venv/bin/python manage.py spectacular --file schema.yml


# ==============================
# React / Frontend
# ==============================

# 依存関係インストール
install-frontend:
	cd frontend && npm ci

# 開発サーバー起動
run-frontend:
	cd frontend && npm run start

# API クライアント生成
generate-api:
	cd frontend && npm run generate:api

# ==============================
# 開発便利コマンド
# ==============================

# 両方の開発サーバーを並行起動
dev:
	make -j2 run-backend run-frontend

# Schema と API クライアントをまとめて更新
update-api:
	make generate-schema
	make generate-api
