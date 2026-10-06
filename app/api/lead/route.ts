import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, step, image } = await req.json();

  console.log("New lead:", {
    email,
    step,
    hasImage: !!image,
    imageSize: image ? `${Math.round(image.length / 1024)} KB` : 0,
    at: new Date(),
  });

  // Дараа нь: AI-д илгээх, DB-д хадгалах
  return NextResponse.json({ ok: true });
}