import { createReport, deleteReport } from '../actions';
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
		<form action={createReport} className="space-y-4 mb-10">
		  <div>
			<label className="block font-bold text-sm text-gray-700">日付</label>
			<input
			  name="date"
			  type="date"
			  required
			  defaultValue={new Date().toISOString().split('T')[0]}
			  className="w-full border p-2 rounded mt-1 text-black"
			/>
		  </div>

		  <div>
			<label className="block font-bold text-sm text-gray-700">やったこと</label>
			<textarea
			  name="content"
			  required
			  rows={3}
			  className="w-full border p-2 rounded mt-1 text-black"
			  placeholder="今日は何をしましたか？"
			/>
		  </div>

		  <div>
			<label className="block font-bold text-sm text-gray-700">学び・気付き</label>
			<textarea
			  name="learning"
			  rows={2}
			  className="w-full border p-2 rounded mt-1 text-black"
			  placeholder="何か新しい発見は？"
			/>
		  </div>

		  <button
			type="submit"
			className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
		  >
			日報を送信する
		  </button>
		</form>

		<hr className="my-8" />

		{/* 一覧表示エリア */}
		<h2 className="text-xl font-bold mb-4 text-gray-800">過去の日報 ({reports.length}件)</h2>
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

			  {/* 右側：削除ボタン（ここを追加！） */}
			  <form action={deleteReport}>
				<input type="hidden" name="id" value={report.id} />
				<button 
				  type="submit" 
				  className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
				>
				  削除
				</button>
			  </form>
			</div>
		  ))}
		  
		  {reports.length === 0 && (
			<p className="text-gray-500 text-center">まだ日報がありません。最初の投稿をしましょう！</p>
		  )}
		</div>
	  </main>
	</div>
  );
}