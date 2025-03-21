"use client";

import { usePhotos } from "@/hooks/usePhotos";
import { Suspense, lazy } from "react";

const PhotoItem = lazy(() => import("./PhotoItem"));

export default function PhotoList() {
  const { photos, isLoading, error } = usePhotos();

  if (isLoading) {
    return (
      <p className="text-sm text-center font-semibold mt-2">読み込み中...</p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-center font-semibold text-red-500">{error}</p>
    );
  }

  // 画像を登録してないとき
  if (photos.length === 0) {
    return <p className="text-sm text-center font-semibold mt-2">準備中です</p>;
  }

  return (
    <Suspense fallback={<p className="text-sm text-center mt-2">画像を読み込み中...</p>}>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {photos.map((photo, index) => (
        <PhotoItem key={photo.id} photo={photo} index={index} />
      ))}
    </div>
    </Suspense>
  );
}
