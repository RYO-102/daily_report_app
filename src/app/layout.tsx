// src/app/layout.tsx
import "./globals.css"; // 👈 同じフォルダに globals.css があることが前提です

export const metadata: Metadata = {
  title: "横浜祭実行委員会ブログ",
  description: "実行委員会のための日報・ブログシステムです",
  
  // ▼▼▼ これを追加！ (検索ロボットお断りの看板) ▼▼▼
  robots: {
    index: false, // 検索結果に載せない
    follow: false, // リンク先も辿らせない
  },
  // ▲▲▲ ここまで ▲▲▲
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}