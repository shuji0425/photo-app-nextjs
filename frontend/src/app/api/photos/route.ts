export async function GET() {
  const response = await fetch("http://localhost:8080/api/photos");
  if (!response.ok) {
    return new Response("Failed to fetch photos", { status: 500 });
  }
  return response
}