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

        {/* ブログ一覧 */}
        <div className="space-y-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
              {/* ヘッダー部分 */}
              <div className="bg-blue-600 px-4 py-2 flex justify-between items-center text-white">
                <span className="font-bold text-lg">{report.title}</span>
                <span className="text-sm bg-blue-700 px-2 py-1 rounded">
                  {new Date(report.date).toLocaleDateString()}
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* 業務トピック */}
                <div>
                  <h4 className="font-bold text-gray-700 mb-1 border-b inline-block">📋 業務トピック</h4>
                  <div className="whitespace-pre-wrap text-gray-800 mt-2 leading-relaxed">
                    {report.content}
                  </div>
                </div>

                {/* よもやま話（ある場合のみ表示） */}
                {report.yomoyama && (
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <h4 className="font-bold text-orange-800 mb-1">☕ よもやま話</h4>
                    <div className="whitespace-pre-wrap text-gray-700 text-sm">
                      {report.yomoyama}
                    </div>
                  </div>
                )}
              </div>
            </div>
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