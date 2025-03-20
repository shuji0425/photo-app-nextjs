import { useState } from "react";

// 画像をWebPに変換
export const useImageConverter = () => {
  const [isConverting, setIsConverting] = useState(false);

  const convertToWebP = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return resolve(file);

        // Max1200pxにリサイズ
        const maxSize = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxSize) {
          height = (maxSize / width) * height;
          width = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // webpに変換
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name.replace(/\.\w+$/, ".webp"), { type: "image/webp" }));
          } else {
            resolve(file);
          }
        }, "image/webp", 0.8);
      };
    });
  };

  return { convertToWebP, isConverting, setIsConverting };
}