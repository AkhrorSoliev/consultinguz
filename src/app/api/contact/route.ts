import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, role } = body;

    if (!name || (!email && !phone)) {
      return NextResponse.json({ error: "Name and contact info required" }, { status: 400 });
    }

    const text = [
      `📩 <b>Yangi murojaat — ConsultingUZ</b>`,
      ``,
      `👤 <b>Ism:</b> ${escapeHtml(name)}`,
      email ? `📧 <b>Email:</b> ${escapeHtml(email)}` : null,
      phone ? `📞 <b>Telefon:</b> ${escapeHtml(phone)}` : null,
      role ? `🏷 <b>Rol:</b> ${escapeHtml(role)}` : null,
      message ? `\n💬 <b>Xabar:</b>\n${escapeHtml(message)}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const res = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text,
            parse_mode: "HTML",
          }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        console.error("Telegram API error:", err);
        return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
      }
    } else {
      // Fallback: log to console when Telegram is not configured
      console.log("Contact form submission (Telegram not configured):", body);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
