import { createReport, deleteReport } from './actions';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  // データベースから過去の日報を全部取ってくる（作成日の新しい順）
  const reports = await prisma.dailyReport.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <main className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">🎉 横浜祭実行委員会ブログ</h1>

        <hr className="my-8" />

        {/* 一覧表示エリア */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">投稿されたの日報 ({reports.length}件)</h2>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded">
              {/* 左側：日記の内容 */}
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  {new Date(report.date).toLocaleDateString()} の日報
                </div>
                <div className="whitespace-pre-wrap text-gray-800 font-medium">{report.content}</div>
                {report.learning && (
                  <div className="mt-2 text-sm text-gray-600 bg-yellow-50 p-2 rounded inline-block">
                    💡 学び: {report.learning}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {reports.length === 0 && (
            <p className="text-gray-500 text-center">まだ日報がありません。最初の投稿がされるまで待ちましょう！</p>
          )}
        </div>
      </main>
    </div>
  );
}