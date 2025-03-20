"use client";

import Image from "next/image";

type PhotoProps = {
  photo: {
    id: number;
    url: string;
    title: string;
  };
};

const PhotoItem = ({ photo }: PhotoProps) => {
  return (
    <div className="shadow-md rounded-lg overflow-hidden">
      <Image
        src={photo.url}
        alt={photo.title}
        width={300}
        height={200}
        sizes="(max-width: 600px) 100vw, 300vw"
        quality={50} // 画像の品質を調整
        priority     // LCPの画像を優先ロード
        className="w-full h-auto object-cover rounded-lg shadow-md"
      />
      <div className="p-2 bg-white">
        <p className="text-sm text-center font-semibold mt-2">{photo.title}</p>
      </div>
    </div>
  );
};

export default PhotoItem;