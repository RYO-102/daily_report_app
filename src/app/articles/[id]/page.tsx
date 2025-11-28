import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>; // 👈 URLの印を受け取るための設定
};

export default async function ArticleDetail({ params, searchParams }: Props) {
  const { id } = await params;
  const { from } = await searchParams; // 👈 印(from)を取り出す
  const reportId = parseInt(id);

  const report = await prisma.dailyReport.findUnique({
    where: { id: reportId },
  });

  if (!report) {
    notFound();
  }

  // 戻るボタンの行き先とラベルを、印があるかどうかで決める
  const backLink = from === 'admin' ? '/admin' : '/';
  const backText = from === 'admin' ? '← 管理画面に戻る' : '← ブログ一覧に戻る';

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

          {/* 戻るボタン（動的に変わる！） */}
          <div className="pt-8 border-t text-center">
            <Link 
              href={backLink} 
              className="inline-block bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition"
            >
              {backText}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}