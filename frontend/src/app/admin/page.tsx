"use client";

import { useState } from "react";
import FileInput from "@/components/FileInput";
import UploadButton from "@/components/UploadButton";

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [resetTrigger, setResetTrigger] = useState(false);

  const resetFiles = () => {
    setSelectedFiles(null); // アップロード後のリセット
    setResetTrigger((prev) => !prev) // トリガーの切り替え
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">画像アップロード</h1>
      <UploadButton files={selectedFiles} onUploadComplete={resetFiles} />
      <FileInput onFilesSelected={(files) => setSelectedFiles(Array.from(files))} resetTrigger={resetTrigger} />
    </div>
  )
}