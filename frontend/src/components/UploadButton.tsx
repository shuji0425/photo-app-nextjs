import { useState } from "react";
import { uploadFiles } from "@/lib/upload";
import { useImageConverter } from "@/hooks/useImageConverter";

interface UploadButtonProps {
  files: File[] | null;
  onUploadComplete: () => void;
}

export default function UploadButton({ files, onUploadComplete }: UploadButtonProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const { convertToWebP } = useImageConverter();

  const handleUpload = async () => {
    if (!files) return;
    setUploading(true);
    setProgress(0);
    setMessage("");

    try {
      const totalFiles = files.length;
      let completed = 0;

      const optimizedFiles = await Promise.all(
        files.map(async (file) => {
          const webpFile = await convertToWebP(file);
          completed++;
          setProgress(Math.round((completed / totalFiles) * 100));
          return webpFile;
        })
      );
      const response = await uploadFiles(optimizedFiles);

      setMessage(`アップロード成功！ (${response.files.length} 枚)`);
      onUploadComplete();
      setProgress(100)
    } catch {
      setMessage("アップロードに失敗しました");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        {uploading ? "アップロード中..." : "アップロード"}
      </button>

      {/* プログレスバー */}
      {uploading && (
        <div className="w-full bg-gray-300 h-2 mt-2 rounded">
          <div className="bg-blue-500 h-2 rounded" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {/* メッセージ表示 */}
      {message && <p className={`mt-2 font-bold ${progress === 100 ? "text-green-600" : "text-red-600" }`}>{message}</p>}
    </div>
  );
}
