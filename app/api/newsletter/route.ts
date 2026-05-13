import { NextResponse } from "next/server";
import { sendNewsletterEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim();
    const source = String(body.source ?? "").trim() || undefined;

    if (!email || !/.+@.+\..+/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    await sendNewsletterEmail({ email, source });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/newsletter failed:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Failed to send" },
      { status: 500 },
    );
  }
}
