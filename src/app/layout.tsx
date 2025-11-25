// src/app/layout.tsx
import "./globals.css"; // 👈 同じフォルダに globals.css があることが前提です

export const metadata = {
  title: 'Daily Report App',
  description: '日報アプリ',
}

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