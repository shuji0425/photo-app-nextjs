import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("http://localhost:8080/api/photos");
  const data = await response.json();
  return NextResponse.json(data);
}