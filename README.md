# 日報アプリ (Daily Report App)

Next.js と Docker で構築した、シンプルな日報管理アプリケーションです。
日々の業務内容、学習内容を記録・保存することができます。

## 🚀 技術スタック (Tech Stack)

このアプリケーションは、モダンなWeb開発技術を用いて構築されています。

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js Server Actions
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Infrastructure:** Docker, Docker Compose

## ✨ 機能

- **日報の作成:** 日付、業務内容、学習内容を記録
- **一覧表示:** 過去の日報を時系列で表示
- **データ永続化:** Dockerコンテナ内のPostgreSQLにデータを保存

## 🛠️ 環境構築 (Setup)

Dockerがインストールされている環境であれば、以下の手順で起動できます。

### 1. リポジトリのクローン
```bash
git clone [https://github.com/RYO-102/daily_report_app.git](https://github.com/RYO-102/daily_report_app.git)
cd daily_report_app
```

### 2\. コンテナの起動

```bash
docker-compose up -d --build
```

### 3\. データベースのセットアップ (初回のみ)

テーブルを作成するために、マイグレーションを実行します。

```bash
docker-compose exec app npx prisma migrate dev --name init
```

### 4\. アプリへのアクセス

ブラウザで以下のURLにアクセスしてください。

http://localhost:3000

## 📝 データベース管理 (Prisma Studio)

以下のURLでデータベースの中身をGUIで確認・編集できます。

http://localhost:5555