import Image from "next/image";
import { Photo } from "@/types/types";
import { memo } from "react";

type Props = {
  photo: Photo;
  index: number;
};

// 個別の画像カード
function PhotoCard({ photo, index }: Props) {
  const isLCPImage = index < 2;
  return (
    <div className="w-full aspect-[3/2] relative rounded-xl overflow-hidden shadow-sm">
      <Image
        src={photo.url}
        alt={photo.title || "photo"}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover"
        loading={isLCPImage ? "eager" : "lazy"}
        priority={isLCPImage}
      />
    </div>
  );
}

export default memo(PhotoCard);
