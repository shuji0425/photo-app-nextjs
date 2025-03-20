import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // リクエストのContent-Typeをチェック（小文字に変換）
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid Content-Type. Expected multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const response = await fetch("http://localhost:8080/api/upload", {
      method: "POST",
      body: formData,
    });

    // バックエンドがエラーを返した場合
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to upload" },
        { status: response.status }
      );
    }

    // JSON以外のレスポンスの場合
    let data;
    try {
      data = await response.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid response from server" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
