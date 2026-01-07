import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { marked } from "marked";

export async function POST(req: NextRequest) {
  try {
    const { email, audit } = await req.json();
    if (!email || !audit) {
      return NextResponse.json({ error: "Email et audit requis" }, { status: 400 });
    }
    // Configurez votre transporteur SMTP ici
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const auditHtml = await marked.parse(audit);

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Votre audit WordPress Headless",
      text: audit,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Votre audit WordPress Headless</h2>
          ${auditHtml}
          <hr />
          <p style="font-size: 12px; color: #666;">Généré par Impact Hub</p>
        </div>
      `
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
}
