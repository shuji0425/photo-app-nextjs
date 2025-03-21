"use client";

import PhotoItem from "./PhotoItem";
import { useVirtualPhotoList } from "@/hooks/useVirtualPhotoList";

export default function PhotoList() {
  const { visiblePhotos, observerRef, isLoading, error } =
    useVirtualPhotoList();

  if (error) {
    return (
      <p className="text-sm text-center font-semibold text-red-500">{error}</p>
    );
  }

  // TODO: 本番で使う
  // if (photos.length === 0) {
  //   return (
  //     <p className="text-sm text-center font-semibold text-red-500">
  //       準備中です
  //     </p>
  //   );
  // }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {visiblePhotos.map((photo, index) => (
          <PhotoItem key={photo.id} photo={photo} index={index} />
        ))}
      </div>

      {/* 読み込み中表示 */}
      {isLoading && (
        <p className="text-sm text-center font-semibold mt-4">読み込み中...</p>
      )}

      {/* 監視用のセントリネル */}
      {<div ref={observerRef} className="h-10" />}
    </>
  );
}
