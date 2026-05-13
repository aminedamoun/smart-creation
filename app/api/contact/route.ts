import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const topic = String(body.topic ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !topic || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    if (!/.+@.+\..+/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }
    if (message.length > 4000) {
      return NextResponse.json(
        { error: "Message too long" },
        { status: 400 },
      );
    }

    await sendContactEmail({ name, email, phone, topic, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact failed:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Failed to send" },
      { status: 500 },
    );
  }
}
