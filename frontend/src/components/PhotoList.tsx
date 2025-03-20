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
    fetch("api/photos")
    .then((res) => res.json())
    .then((data) => setPhotos(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {photos.map((photo) => (
        <div key={photo.id} className="shadow-lg p-2">
          <Image src={photo.url} alt={photo.title} className="w-full h-auto rounded-lg" />
          <p className="text-center mt--2">{photo.title}</p>
        </div>
      ))}
    </div>
  )
}