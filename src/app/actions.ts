'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// 日報を保存する関数
export async function createReport(formData: FormData) {
  // フォームから入力値を取り出す
  const date = formData.get('date') as string;
  const title = formData.get('title') as string;       // 👈 追加
  const content = formData.get('content') as string;
  const yomoyama = formData.get('yomoyama') as string; // 👈 追加

  // データベースに保存！
  await prisma.dailyReport.create({
    data: {
      date: new Date(date),
      title: title,       // 👈 追加
      content: content,
      yomoyama: yomoyama, // 👈 追加
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

  // 画面を更新
  revalidatePath('/');
}