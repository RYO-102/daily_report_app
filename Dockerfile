FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# Step 2で生成された package.json をコンテナにコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# ソースコードを全てコピー
COPY . .

# ポート公開
EXPOSE 3000

# 開発サーバー起動
CMD ["npm", "run", "dev"]