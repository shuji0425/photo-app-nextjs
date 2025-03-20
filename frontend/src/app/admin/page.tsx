"use client";

import Image from "next/image";
import { useState } from "react";

export default function AdminUpload() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setMessage("画像を選択してください");
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json()
      if (res.ok) {
        setMessage("アップロード成功");
        setUploadedUrls(data.files);
      } else {
        setMessage("アップロード失敗: " + data.errors.join(", "));
      }
    } catch {
      setMessage("エラーが発生しました");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">画像アップロード</h1>
      <input type="file" multiple name="photos" onChange={(e) => setFiles(e.target.files)} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        disabled={uploading}
      >
        {uploading ? "アップロード中..." : "アップロード"}
      </button>
      {uploading && <p>アップロード中: {progress}%</p>}
      {message && <p className="mt-2">{message}</p>}

      {/* アップロード画像を表示 */}
      {uploadedUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          {uploadedUrls.map((url, index) => (
            <div key={index} className="relative w-full h-80">
              <Image key={url} src={url} alt={`Uploaded Image ${index + 1}`} fill className="rounded object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
