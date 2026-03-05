import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    const text = `
📩 <b>New Contact Message</b>

👤 <b>Name:</b> ${name}
📧 <b>Email:</b> ${email}

💬 <b>Message:</b>
${message}
`

    const url = `https://api.telegram.org/bot${token}/sendMessage`

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
      }),
    })

    if (!res.ok) {
      throw new Error("Telegram send error")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Message failed to send" },
      { status: 500 }
    )
    console.log(error);
  }
}