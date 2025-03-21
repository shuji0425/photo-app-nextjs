"use client";

import { Suspense, lazy } from "react";
import { useInfinitePhotos } from "@/hooks/useInfinitePhotos";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const PhotoItem = lazy(() => import("./PhotoItem"));

export default function PhotoList() {
  const { photos, loadMore, hasMore, isLoading, error } = useInfinitePhotos();
  const { sentinelRef } = useInfiniteScroll({ hasMore, loadMore });

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
      <Suspense
        fallback={
          <p className="text-sm text-center mt-2">画像を読み込み中...</p>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {photos.map((photo, index) => (
            <PhotoItem key={photo.id} photo={photo} index={index} />
          ))}
        </div>
      </Suspense>

      {/* 読み込み中表示 */}
      {isLoading && (
        <p className="text-sm text-center font-semibold mt-4">読み込み中...</p>
      )}

      {/* 監視用のセントリネル */}
      {hasMore && <div ref={sentinelRef} className="h-10" />}
    </>
  );
}
