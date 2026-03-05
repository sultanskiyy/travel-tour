import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("telegram route: missing environment variables", {
      TELEGRAM_BOT_TOKEN: Boolean(token),
      TELEGRAM_CHAT_ID: Boolean(chatId),
    });
    return NextResponse.json(
      { error: "Telegram credentials not configured" },
      { status: 500 },
    );
  }

  try {
    const { name, email, message } = await req.json();
    const text = `<b>New Contact Form Submission</b>\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      },
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "<no body>");
      console.error("telegram send failed", { status: res.status, body });
      throw new Error("Telegram send error");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("telegram route error", error);
    return NextResponse.json(
      { error: "Message failed to send" },
      { status: 500 },
    );
  }
}
