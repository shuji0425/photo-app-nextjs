"use client";

import PhotoCard from "@/components/PhotoCard";
import Skeleton from "@/components/Skeleton";
import { usePhotos } from "@/hooks/usePhotos";

export default function PhotoListPage() {
  const { photos, loading } = usePhotos();

  return (
    <main className="p-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {loading
        ? [...Array(8)].map((_, i) => <Skeleton key={i} />) // ローディング中
        : photos.map((photo) => <PhotoCard key={photo.id} photo={photo} />)}
    </main>
  );
}
