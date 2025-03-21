import { Photo } from "@/types/types";
import { useState, useCallback, useEffect } from "react";

const LIMIT = 20;

export const useInfinitePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string>("");

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `/api/photos?limit=${LIMIT}&offset=${page * LIMIT}`
      );

      if (!res.ok) {
        throw new Error("サーバーから画像を取得できませんでした");
      }

      const data = await res.json();

      if (data.photos.length < LIMIT) {
        setHasMore(false);
      }

      setPhotos((prev) => [...prev, ...data.photos]);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError("画像の取得に失敗しました");
      console.error("Failed to fetch photos", err);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  // 初回マウント時に読み込み
  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return { photos, isLoading, hasMore, error, loadMore };
};
