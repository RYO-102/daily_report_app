'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// 日報を保存する関数
export async function createReport(formData: FormData) {
  const date = formData.get('date') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const yomoyama = formData.get('yomoyama') as string;
  // ▼▼▼ 追加：画像URLを受け取る ▼▼▼
  // 画像がない場合は空文字になるので、空文字なら null に変換する
  const imageUrlRaw = formData.get('imageUrl') as string;
  const imageUrl = imageUrlRaw === '' ? null : imageUrlRaw;

  // データベースに保存
  await prisma.dailyReport.create({
    data: {
      date: new Date(date),
      title: title,
      content: content,
      yomoyama: yomoyama,
      imageUrl: imageUrl, // 👈 追加：DBに保存！
    },
  });

  // 画面を更新して、トップページに戻る
  revalidatePath('/');
  revalidatePath('/admin');
}

// 日報を削除する関数
export async function deleteReport(formData: FormData) {
  const id = formData.get('id') as string;

  // データベースから削除！
  await prisma.dailyReport.delete({
    where: {
      id: parseInt(id), // 文字列のIDを数字に変換して指定
    },
  });

  // 「管理画面」のキャッシュを捨てて、最新情報を再取得させる
  revalidatePath('/admin');

  // 画面を更新
  revalidatePath('/');
}

// 日報を更新する関数
export async function updateReport(formData: FormData) {
  const id = formData.get('id') as string;
  const date = formData.get('date') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const yomoyama = formData.get('yomoyama') as string;
  
  // ▼▼▼ 追加：画像URLを受け取る ▼▼▼
  const imageUrlRaw = formData.get('imageUrl') as string;
  const imageUrl = imageUrlRaw === '' ? null : imageUrlRaw;

  // データベースを上書き保存
  await prisma.dailyReport.update({
    where: {
      id: parseInt(id),
    },
    data: {
      date: new Date(date),
      title: title,
      content: content,
      yomoyama: yomoyama,
      imageUrl: imageUrl, // 👈 追加：ここを忘れずに！
    },
  });

  // 画面を更新して管理画面に戻る
  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/articles/${id}`); // 詳細ページも更新
  redirect('/admin'); // 完了したら管理画面に飛ばす
}