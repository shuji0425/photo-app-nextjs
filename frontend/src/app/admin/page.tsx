"use client";

import { useState } from "react";

export default function AdminUpload() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setMessage("画像を選択してください");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      setMessage("アップロードに失敗しました");
      return;
    }

    setMessage("アップロード成功");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">画像アップロード</h1>
      <input type="file" multiple name="photos" onChange={(e) => setFiles(e.target.files)} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        アップロード
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
