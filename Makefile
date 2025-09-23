# ==============================
# Variables
# ==============================
VENV = .venv/bin/python

# ==============================
# Python / Django
# ==============================

# 依存関係インストール
install-backend:
	cd backend && pip install -r requirements/dev.txt

# 開発サーバー起動
run-backend:
	cd backend && $(VENV) manage.py runserver

# OpenAPI schema を生成
generate-schema:
	cd backend && DEBUG=False $(VENV) manage.py spectacular --file schema.yml

# Django backend のテストを実行
# --cov=apps          : apps/ ディレクトリ以下のコードのカバレッジを測定
# --cov-report=term-missing : ターミナルにカバレッジ結果を出力し、さらに "どの行が未カバーか" を表示する
test-backend:
	cd backend && $(VENV) -m pytest --cov=apps --cov-report=term-missing


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

# React (frontend) のテストを実行
test-frontend:
	cd frontend && npm run test

# ==============================
# 開発便利コマンド
# ==============================

# 両方の開発サーバーを並行起動
dev:
	make -j2 run-backend run-frontend

# Schema と API クライアントをまとめて更新
update-api: generate-schema generate-api
