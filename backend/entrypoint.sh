#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."

# DBが起動するまでループ（環境変数に置き換えてもOK）
until pg_isready -h db -U myuser -d mydb; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up - running migrations and starting server..."

# 任意：マイグレーションなどを先に実行
python manage.py migrate

# 最後にDjangoを起動
exec "$@"
