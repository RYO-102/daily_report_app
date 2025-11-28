'use client'; // 👈 これが「ブラウザで動くよ」という魔法の言葉！

import { deleteReport } from '../actions';

type Props = {
  id: number;
};

export default function DeleteButton({ id }: Props) {
  return (
    <form action={deleteReport}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        // アウトライン（枠線のみ）スタイルに変更して、圧迫感を減らします
        className="text-sm border border-red-500 text-red-600 px-3 py-1.5 rounded hover:bg-red-50 transition flex items-center gap-1"
        onClick={(e) => {
          // ブラウザ側で動くので、ここでconfirmが使えます
          if (!confirm('本当にこのブログ記事を削除しますか？')) {
            e.preventDefault();
          }
        }}
      >
        🗑️ 削除
      </button>
    </form>
  );
}