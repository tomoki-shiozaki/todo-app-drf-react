#!/bin/sh
set -e  # エラーがあったらスクリプトを即終了

echo "Waiting for PostgreSQL to be ready..."

# DBが起動するまでループ
MAX_RETRIES=30
COUNT=0
until pg_isready -h db -U myuser -d mydb; do
  COUNT=$((COUNT+1))
  if [ $COUNT -ge $MAX_RETRIES ]; then
    echo "Postgres did not become ready in time"
    exit 1
  fi
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up - running migrations and starting server..."

# マイグレーションを先に実行
python manage.py migrate

# 最後にDjangoを起動
exec "$@"
