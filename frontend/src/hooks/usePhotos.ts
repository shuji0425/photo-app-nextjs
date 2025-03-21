"use client";

import { Photo } from "@/types/types";
import { useEffect, useState } from "react";

// 画像取得
export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(`/api/photos`);
        const data = await res.json();
        setPhotos(data.photos);
      } catch (err) {
        console.error("Failed to fetch photos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading };
};
