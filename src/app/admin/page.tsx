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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            日報を公開する
          </button>
        </form>

		<hr className="my-8" />

		{/* ブログ管理一覧 */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">投稿済みのブログ ({reports.length}件)</h2>
        <div className="space-y-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white border rounded-lg shadow-sm overflow-hidden group">
              
              {/* ▼▼▼ ヘッダー部分（ここに削除ボタンを入れ込みました） ▼▼▼ */}
              <div className="bg-gray-700 px-4 py-3 flex justify-between items-center text-white">
                {/* 左側：タイトル */}
                <span className="font-bold text-lg truncate mr-4">{report.title}</span>
                
                {/* 右側：日付と削除ボタンを横並びに */}
                <div className="flex items-center gap-3">
                  <span className="text-sm bg-gray-600 px-2 py-1 rounded whitespace-nowrap">
                    {new Date(report.date).toLocaleDateString()}
                  </span>
                  
                  {/* 削除ボタン（マウスを乗せた時だけ少し明るくする） */}
                  <div className="opacity-70 group-hover:opacity-100 transition">
                    <DeleteButton id={report.id} />
                  </div>
                </div>
              </div>
              {/* ▲▲▲ ここまで変更 ▲▲▲ */}

              <div className="p-5 space-y-4">
                {/* 業務トピック */}
                <div>
                  <h4 className="font-bold text-gray-700 mb-1 border-b inline-block">📋 業務トピック</h4>
                  <div className="whitespace-pre-wrap text-gray-800 mt-2 leading-relaxed line-clamp-3">
                    {report.content}
                  </div>
                </div>

                {/* よもやま話 */}
                {report.yomoyama && (
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <h4 className="font-bold text-orange-800 mb-1 text-sm">☕ よもやま話</h4>
                    <div className="whitespace-pre-wrap text-gray-700 text-xs line-clamp-2">
                      {report.yomoyama}
                    </div>
                  </div>
                )}
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