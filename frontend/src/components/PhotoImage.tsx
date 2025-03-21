"use client";

import Image from "next/image";
import { useState } from "react";

type PhotoImageProps = {
  url: string;
  title: string;
  index: number;
};

// UI構成
export default function PhotoImage({ url, title, index }: PhotoImageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isPriority = index < 3;

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse z-0" />
      )}
      <Image
        src={url}
        alt={title}
        width={300}
        height={200}
        sizes="(max-width: 600px) 100vw, 300vw"
        quality={50} // 画像の品質を調整
        priority={isPriority} // LCPの画像を優先ロード
        loading={isPriority ? "eager" : "lazy"}
        className={`w-full h-auto object-cover rounded-lg shadow-md z-10 transition-opacity duration-700 ease-in-out ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
