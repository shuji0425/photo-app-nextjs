"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Photo = {
  id: number;
  url: string;
  title: string;
};

export default function PhotoList() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("/api/photos");
        const data = await res.json();
        setPhotos(data.photos);
      } catch (error) {
        console.error("Failed to fetch photos", error);
      }
    }
    fetchPhotos();
  }, []);

  // 画像を登録してないとき
  if (!photos) {
    return (
      <p className="text-sm text-center font-semibold mt-2">準備中です</p>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {photos.map((photo) => (
        <div key={photo.id} className="shadow-md rounded-lg overflow-hidden">
          <Image src={photo.url} alt={photo.title} width={300} height={200} className="w-full h-auto" />
          <div className="p-2 bg-white">
            <p className="text-sm text-center font-semibold mt-2">{photo.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}