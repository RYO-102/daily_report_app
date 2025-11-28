import Link from 'next/link';
import ImageUpload from './ImageUpload';
import DeleteButton from './DeleteButton'; // 👈 追加
import { createReport } from '../actions'; // deleteReport はもう使わないので消してOK
import { prisma } from '@/lib/prisma';

export default async function Admin() {
  // データベースから過去の日報を全部取ってくる（作成日の新しい順）
  const reports = await prisma.dailyReport.findMany({
	orderBy: { createdAt: 'desc' },
  });

  return (
	<div className="min-h-screen bg-gray-100 py-10 px-4">
	  <main className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
		<h1 className="text-2xl font-bold mb-6 text-gray-800">📝 実行委員会ブログ管理画面</h1>

		{/* 投稿フォーム */}
        <form action={createReport} className="space-y-4 mb-10 bg-gray-50 p-6 rounded-lg border">
          <h3 className="font-bold text-lg mb-4">🖊️ 新しい記事を書く</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-sm text-gray-700">日付</label>
              <input
                name="date"
                type="date"
                required
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full border p-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="block font-bold text-sm text-gray-700">今日の見出し (Title)</label>
              <input
                name="title"
                type="text"
                required
                placeholder="例：42Tokyoの課題が進まない件について"
                className="w-full border p-2 rounded mt-1"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-sm text-gray-700">業務トピック (Topics)</label>
            <textarea
              name="content"
              required
              rows={5}
              className="w-full border p-2 rounded mt-1"
              placeholder="・プロジェクトの進捗&#13;&#10;・発生したバグ&#13;&#10;・チームへの共有事項"
            />
          </div>

          <div>
            <label className="block font-bold text-sm text-gray-700">よもやま話 (Yomoyama)</label>
            <textarea
              name="yomoyama"
              rows={3}
              className="w-full border p-2 rounded mt-1"
              placeholder="・最近プレイしたゲーム&#13;&#10;・個人的なニュース&#13;&#10;・思ったこと"
            />
          </div>

          <ImageUpload />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            日報を公開する
          </button>
        </form>

		<hr className="my-8" />

		{/* ブログ管理一覧 */}
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">投稿管理リスト ({reports.length}件)</h2>
        <div className="bg-white rounded-lg border shadow-sm divide-y">
          {reports.map((report) => (
            <div key={report.id} className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 hover:bg-gray-50 transition">
              
              {/* 左側：タイトルと日付（クリックで詳細へ） */}
              {/* ▼▼▼ 印 (?from=admin) をつけました ▼▼▼ */}
              <Link href={`/articles/${report.id}?from=admin`} className="flex-grow group min-w-0 w-full sm:w-auto">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition truncate">
                      {report.title}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                    📅 {new Date(report.date).toLocaleDateString()}
                  </span>
                </div>
              </Link>

              {/* 右側：操作ボタンエリア（サイズを調整してスッキリさせました） */}
              <div className="flex items-center gap-2 shrink-0">
                {/* 編集ボタン */}
                <Link 
                  href={`/admin/edit/${report.id}`} 
                  className="text-sm border border-green-500 text-green-600 px-3 py-1.5 rounded hover:bg-green-50 transition flex items-center gap-1"
                >
                  ✏️ 編集
                </Link>

                {/* 削除ボタン（コンポーネント側でデザイン調整が必要ですが、一旦配置） */}
                <DeleteButton id={report.id} />
              </div>
              
            </div>
          ))}
          
          {reports.length === 0 && (
            <p className="text-gray-500 text-center py-10">投稿されたブログはありません。</p>
          )}
        </div>
	  </main>
	</div>
  );
}