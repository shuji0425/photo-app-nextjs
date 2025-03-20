import Image from "next/image";
import { useState, ChangeEvent, useRef, useEffect } from "react";

interface FileInputProps {
  onFilesSelected: (files: FileList) => void;
  resetTrigger: boolean;
}

export default function FileInput({ onFilesSelected, resetTrigger }: FileInputProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(e.target.files);

      // プレビュー画像をセット
      const filesArray = Array.from(e.target.files);
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  // アップロード後にinputをリセット
  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setPreviewImages([]);
  }, [resetTrigger]);

  return (
    <div className="mt-4">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2"
      />

      {/* プレビュー表示 */}
      <div className="mt-2 grid grid-cols-4 gap-2">
        {previewImages.map((src, index) => (
          <div key={index} className="relative h-60">
            <Image key={index} src={src} alt={`Preview ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
