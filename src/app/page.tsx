import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function Home() {
  // データベースから過去の日報を全部取ってくる（作成日の新しい順）
  const reports = await prisma.dailyReport.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 text-center">
          🎉 横浜祭実行委員会ブログ
        </h1>

        {/* ブログ一覧（リスト表示） */}
        <div className="space-y-4">
          {reports.map((report) => (
            <Link 
              key={report.id} 
              href={`/articles/${report.id}`}
              className="block group"
            >
              {/* ▼▼▼ ここをデザイン変更しました ▼▼▼ */}
              <div className="bg-white border-l-4 border-blue-500 rounded-r-lg shadow-sm p-5 transition duration-200 hover:shadow-md hover:bg-blue-50">
                <div className="flex justify-between items-center">
                  {/* タイトル */}
                  <h2 className="font-bold text-lg text-gray-800 group-hover:text-blue-700 transition">
                    {report.title}
                  </h2>

                  {/* 日付（少し青みがかった背景に） */}
                  <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded font-medium">
                    {new Date(report.date).toLocaleDateString()}
                  </span>
                </div>
                
                {/* 矢印 */}
                <div className="mt-3 text-right text-xs text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
                  記事を読む →
                </div>
              </div>
              {/* ▲▲▲ ここまで ▲▲▲ */}
            </Link>
          ))}
          
          {reports.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <p>まだ記事が投稿されていません。</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}