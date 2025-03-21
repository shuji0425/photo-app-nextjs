export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "";

  // バックエンドに送信
  const response = await fetch(`http://localhost:8080/api/photos?limit=${limit}`);
  if (!response.ok) {
    return new Response("Failed to fetch photos", { status: 500 });
  }
  return response
}