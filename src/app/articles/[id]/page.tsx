import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ▼▼▼ ここが変わりました（Promiseがつきました） ▼▼▼
type Props = {
  params: Promise<{ id: string }>;
};

export default async function ArticleDetail({ params }: Props) {
  // ▼▼▼ ここが変わりました（awaitして中身を取り出します） ▼▼▼
  const { id } = await params;
  const reportId = parseInt(id);

  // データベースから1件だけ探す
  const report = await prisma.dailyReport.findUnique({
    where: { id: reportId },
  });

  // もし見つからなかったら 404 ページを出す
  if (!report) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <main className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-blue-600 px-6 py-4 text-white">
          <h1 className="text-2xl font-bold">{report.title}</h1>
          <p className="mt-2 text-blue-100 text-sm">
            {new Date(report.date).toLocaleDateString()} の記事
          </p>
        </div>

        <div className="p-8 space-y-8">
          {/* 業務トピック */}
          <section>
            <h2 className="font-bold text-xl text-gray-800 mb-3 border-b pb-2">📋 業務トピック</h2>
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
              {report.content}
            </div>
          </section>

          {/* よもやま話 */}
          {report.yomoyama && (
            <section className="bg-orange-50 p-6 rounded-lg border border-orange-100">
              <h2 className="font-bold text-lg text-orange-800 mb-3">☕ よもやま話</h2>
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {report.yomoyama}
              </div>
            </section>
          )}

          {/* 戻るボタン */}
          <div className="pt-8 border-t text-center">
            <Link 
              href="/" 
              className="inline-block bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition"
            >
              ← 一覧に戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}