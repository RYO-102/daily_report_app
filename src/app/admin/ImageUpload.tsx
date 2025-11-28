'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';

interface CloudinaryResult {
  secure_url: string;
}

// ▼▼▼ 追加：初期値を受け取れるようにする ▼▼▼
type Props = {
  defaultImage?: string | null;
};

export default function ImageUpload({ defaultImage }: Props) {
  // 初期値があればそれをセット、なければ空文字
  const [imageUrl, setImageUrl] = useState<string>(defaultImage || '');
// ▲▲▲ ここまで ▲▲▲

  return (
    <div className="mb-4">
      <label className="block font-bold text-sm text-gray-700 mb-2">今日の一枚 (Image)</label>
      
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result) => {
          if (typeof result.info === 'object' && 'secure_url' in result.info) {
            const info = result.info as CloudinaryResult;
            setImageUrl(info.secure_url);
          }
        }}
        options={{
          maxFiles: 1,
          sources: ['local', 'camera'],
          language: 'ja',
        }}
      >
        {({ open }) => {
          return (
            <div 
              onClick={() => open()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition flex flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl">📸</span>
              {/* 文言を少し変更 */}
              <span className="text-gray-600 text-sm">
                {imageUrl ? '画像を変更する' : 'クリックして写真をアップロード'}
              </span>
            </div>
          );
        }}
      </CldUploadWidget>

      {/* プレビュー表示エリア */}
      {imageUrl && (
        <div className="mt-4 relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border">
          <Image 
            src={imageUrl} 
            alt="Uploaded Image" 
            fill 
            className="object-contain" 
          />
          {/* ▼▼▼ 追加：削除ボタン（画像を消したい時用） ▼▼▼ */}
          <button
            type="button"
            onClick={() => setImageUrl('')}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-red-600 shadow"
            title="画像を削除"
          >
            ×
          </button>
        </div>
      )}

      <input type="hidden" name="imageUrl" value={imageUrl} />
    </div>
  );
}