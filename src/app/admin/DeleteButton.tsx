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
        className="bg-red-500 text-white text-sm px-4 py-2 rounded shadow hover:bg-red-600 transition flex items-center"
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