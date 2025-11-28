'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';

// Cloudinaryからの戻り値の型定義（ここは呪文だと思ってOKです）
interface CloudinaryResult {
  secure_url: string;
}

export default function ImageUpload() {
  // 画像のURLを保存する箱
  const [imageUrl, setImageUrl] = useState<string>('');

  return (
    <div className="mb-4">
      <label className="block font-bold text-sm text-gray-700 mb-2">今日の一枚 (Image)</label>
      
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} // .envの設定を使う
        onSuccess={(result) => {
          // アップロード成功時、URLをセットする
          if (typeof result.info === 'object' && 'secure_url' in result.info) {
            const info = result.info as CloudinaryResult;
            setImageUrl(info.secure_url);
          }
        }}
        options={{
          maxFiles: 1, // 1枚だけ許可
          sources: ['local', 'camera'], // PCファイルとカメラのみ許可
          language: 'ja', // 日本語化
        }}
      >
        {({ open }) => {
          return (
            <div 
              onClick={() => open()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition flex flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl">📸</span>
              <span className="text-gray-600 text-sm">クリックして写真をアップロード</span>
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
        </div>
      )}

      {/* 【重要】隠しフォーム：このinputにURLが入ることで、Server Actionsに送信されます */}
      <input type="hidden" name="imageUrl" value={imageUrl} />
    </div>
  );
}