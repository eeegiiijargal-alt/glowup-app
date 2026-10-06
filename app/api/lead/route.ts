import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, step } = await req.json();
  console.log("New lead:", { email, step, at: new Date() });
  return NextResponse.json({ ok: true });
}