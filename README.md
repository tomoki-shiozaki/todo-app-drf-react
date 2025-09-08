# todo-app-drf-react

## 📌 概要と注意事項 / Overview & Notes

このアプリは、React および Django REST Framework の学習目的で作成しています。  
題材はシンプルな ToDo アプリです。  
現在も学習しながら開発しているため、設計やコードはまだ最適化されていません。

> ⚠ 技術習得の過程として公開しています。

This application is built for learning purposes using React and Django REST Framework.  
It's a simple Todo app project.  
Please note that the design and code are not fully optimized yet as it is still under development and learning.

> 🚧 Shared as part of my learning journey.

---

アプリは [こちら](https://todo-app-drf-react-1.onrender.com) にデプロイされています。  
（デプロイ先：Render）

The app is deployed [here](https://todo-app-drf-react-1.onrender.com).  
(Hosting: **Render**)

---

## 🔌 バックエンド API について / About the Backend API

このアプリのバックエンドは **Render** の無料プランでホスティングされています。  
無料プランでは、一定時間アクセスがないとサーバーが **スリープ状態** になります。  
そのため、最初の API リクエスト時に **数秒から最大 1 分程度の遅延** が発生することがありますが、  
その後は通常通り動作します。

The backend API is hosted on **Render** using the free plan.  
Due to this, the server goes into **sleep mode** after a period of inactivity.  
As a result, the **first API request may take a few seconds to a minute** to respond.  
After that, performance will return to normal.

> 🕒 Please be aware of the initial delay caused by cold starts.
