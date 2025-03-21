import Image from "next/image";
import { Photo } from "@/types/types";

type Props = {
  photo: Photo;
  index: number;
};

// 個別の画像カード
export default function PhotoCard({ photo, index }: Props) {
  return (
    <div className="w-full aspect-[3/2] relative rounded-xl overflow-hidden shadow-sm">
      <Image
        src={photo.url}
        alt={photo.title}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover"
        loading={index < 2 ? "eager" : "lazy"}
        priority={index < 2}
      />
    </div>
  );
}
