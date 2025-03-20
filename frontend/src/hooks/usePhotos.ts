import { useEffect, useState } from "react";

type Photo = {
  id: number;
  url: string;
  title: string;
};

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("/api/photos");
        if (!res.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await res.json();
        setPhotos(data.photos);
      } catch (err) {
        setError("画像の取得に失敗しました");
        console.error("Failed to fetch photos", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  return { photos, isLoading, error };
};