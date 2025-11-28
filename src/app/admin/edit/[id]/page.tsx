import ImageUpload from '../../ImageUpload'; // 👈 追加（階層に注意！）
import { prisma } from '@/lib/prisma';
import { updateReport } from '@/app/actions'; // updateReportをインポート
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: Props) {
  const { id } = await params;
  const reportId = parseInt(id);

  // 編集するデータを取得
  const report = await prisma.dailyReport.findUnique({
    where: { id: reportId },
  });

  if (!report) return notFound();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">🖊️ 記事の編集</h1>

        <form action={updateReport} className="space-y-4">
          {/* IDをこっそり渡す（必須） */}
          <input type="hidden" name="id" value={report.id} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-sm text-gray-700">日付</label>
              <input
                name="date"
                type="date"
                required
                defaultValue={new Date(report.date).toISOString().split('T')[0]}
                className="w-full border p-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="block font-bold text-sm text-gray-700">今日の見出し</label>
              <input
                name="title"
                type="text"
                required
                defaultValue={report.title}
                className="w-full border p-2 rounded mt-1"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-sm text-gray-700">業務トピック</label>
            <textarea
              name="content"
              required
              rows={5}
              defaultValue={report.content}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block font-bold text-sm text-gray-700">よもやま話</label>
            <textarea
              name="yomoyama"
              rows={3}
              defaultValue={report.yomoyama || ''}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          {/* ▼▼▼ 追加：画像アップロード部品（初期値を渡す！） ▼▼▼ */}
          <ImageUpload defaultImage={report.imageUrl} />
          {/* ▲▲▲ ここまで ▲▲▲ */}

          <div className="flex gap-4">
            <a href="/admin" className="w-1/3 bg-gray-500 text-white text-center font-bold py-2 px-4 rounded hover:bg-gray-600 transition block">
              キャンセル
            </a>
            <button
              type="submit"
              className="w-2/3 bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition"
            >
              更新して保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}