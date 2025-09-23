# todo-app-drf-react

[![Build Status](https://github.com/tomoki-shiozaki/todo-app-drf-react/actions/workflows/ci.yml/badge.svg)](https://github.com/tomoki-shiozaki/todo-app-drf-react/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/tomoki-shiozaki/todo-app-drf-react/graph/badge.svg?token=YHDVS0HYE1)](https://codecov.io/gh/tomoki-shiozaki/todo-app-drf-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 概要と注意事項

このアプリは、React および Django REST Framework を使用して構築したシンプルな ToDo アプリです。  
現段階では基本的なタスク管理機能（タスクの追加、編集、削除、完了/未完了処理など）が実装されていますが、コードや設計の最適化は今後の課題として進めています。

---

アプリは [こちら](https://todo-app-drf-react-1.onrender.com) にデプロイされています。  
（デプロイ先：Render）

> **⚠️ 注意**  
> 最初のアクセス時に、アプリの**バックエンド**がスリープ状態から復帰するため、**数秒から最大 1 分程度の遅延**が生じることがあります。  
> 無反応に見える場合でも、サーバーが起動中のため、少しお待ちいただけますようお願いします。  
> フロントエンド部分は React を使用しており、ユーザーインターフェースはすぐに表示されますが、バックエンドの処理に遅延が発生する場合があります。

### テスト用アカウント情報

以下のアカウントは、**本アプリを体験するためのテストアカウント**です。
アプリの機能を確認するのにご利用ください。

| 役割     | ユーザー名 | パスワード      |
| -------- | ---------- | --------------- |
| ユーザー | `user1`    | `dev_user1_123` |

> ⚠️ これはテスト専用アカウントであり、本番環境の重要な情報は含まれていません。

---

## 現在できていること

- **Django REST Framework (DRF)** を使用した RESTful API を構築。
- **React** を使用して、フロントエンド部分を実装。
- フロントエンドとバックエンドが**API 経由で連携**。**ToDo アプリケーション**の基本機能（タスクの追加、削除、編集、完了/未完了処理、リスト表示など）を提供。
- **トークン認証**を使用して、認証されたユーザーだけが ToDo アプリを利用できるようにしています。

---

## 今後の予定

現在、アプリの基本的な機能（ToDo 管理機能）は完成していますが、今後以下の改善を行う予定です：

- **CRA から Vite への移行**
- **TypeScript への移行**：フロントエンド部分のコードを TypeScript に移行する。
- **フロントエンドのテスト**：Vitest や React Testing Library を使用して、アプリのユニットテストおよび統合テストを実施する。
- **JWT 認証の導入**：現在のトークン認証を JWT（JSON Web Token）を使用したものに切り替える。
