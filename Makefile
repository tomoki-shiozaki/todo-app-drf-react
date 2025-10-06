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
	cd backend && DEBUG=False GENERATE_SCHEMA=True $(VENV) manage.py spectacular --file schema.yml

# Django backend のテストを実行
# --cov=apps          : apps/ ディレクトリ以下のコードのカバレッジを測定
# --cov-report=term-missing : ターミナルにカバレッジ結果を出力し、さらに "どの行が未カバーか" を表示する
test-backend:
	cd backend && $(VENV) -m pytest --cov=apps --cov-report=term-missing

# ==============================
# Docker / Backend
# ==============================

# 開発環境の起動・停止
# バックグラウンドで起動
up:
	docker compose up -d

# 停止・削除
down:
	docker compose down

# コンテナ内での操作
# Django シェルに入る
shell:
	docker compose exec backend bash

# Django マイグレーションを実行
migrate:
	docker compose exec backend python manage.py migrate

# スーパーユーザー作成（対話式）
createsuperuser:
	docker compose exec backend python manage.py createsuperuser

# ログ確認
# バックエンドのログをリアルタイムで表示
logs-backend:
	docker compose logs -f backend

# DB のログ確認
logs-db:
	docker compose logs -f db

# 任意のコマンドを一時コンテナで実行
# 例: make run cmd="python manage.py test"
run:
	docker-compose run --rm backend $(cmd)

# クリーンアップ系
# 未使用イメージやボリュームをまとめて削除、停止中のコンテナを削除
prune:
	docker system prune -a --volumes -f

# Docker 上で schema を生成
docker-generate-schema:
	docker compose run --rm backend \
	DEBUG=False GENERATE_SCHEMA=True python manage.py spectacular --file schema.yml

docker-generate-schema-exec:
	docker compose exec backend \
	DEBUG=False GENERATE_SCHEMA=True python manage.py spectacular --file schema.yml

# その他
docker-test-backend:
	docker-compose run --rm backend pytest --cov=apps --cov-report=term-missing

docker-shell:
	docker-compose run --rm backend python manage.py shell

# ==============================
# React / Frontend
# ==============================

# 依存関係インストール
install-frontend:
	cd frontend && npm ci

# 開発サーバー起動
run-frontend:
	cd frontend && npm run dev

# API クライアント生成
generate-api:
	cd frontend && npm run generate:api

# React (frontend) のテストを実行
test-frontend:
	cd frontend && npm run test

# ==============================
# 開発便利コマンド
# ==============================

# ローカル venv で両方の開発サーバーを並行起動
dev:
	make -j2 run-backend run-frontend

# Docker環境でバックエンド起動＋フロントエンドを並行起動
docker-dev:
	make up
	make run-frontend

# Schema と API クライアントをまとめて更新
update-api: generate-schema generate-api

# Docker バージョンの update-api
docker-update-api: docker-generate-schema generate-api