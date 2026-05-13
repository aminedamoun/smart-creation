import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 465);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
// Some shared-hosting SMTP servers (e.g. cPanel / Hostinger) listen on
// port 465 with implicit TLS; others use 587 with STARTTLS. We pick the
// secure flag from the port automatically; override with SMTP_SECURE.
const secure =
  process.env.SMTP_SECURE != null
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

const FROM =
  process.env.SMTP_FROM_EMAIL ||
  (user
    ? `Smart Creation Group <${user}>`
    : "Smart Creation Group <admin@thesmartcreation.com>");

export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "admin@thesmartcreation.com";

let cachedTransport: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter {
  if (cachedTransport) return cachedTransport;
  if (!host || !user || !pass) {
    throw new Error(
      "SMTP not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in .env.local.",
    );
  }
  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
  return cachedTransport;
}

/* ── HTML template ───────────────────────────────────────────────────── */

type Row = { label: string; value: string; isBlock?: boolean };

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderEmail(opts: {
  title: string;
  preheader: string;
  intro: string;
  rows: Row[];
  ctaUrl?: string;
  ctaLabel?: string;
}): string {
  const rowsHtml = opts.rows
    .map((r) => {
      if (r.isBlock) {
        return `
          <tr>
            <td colspan="2" style="padding:18px 0 6px; font-family:'SF Mono','Menlo',monospace; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#7a7c7b;">
              ${escape(r.label)}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding:0 0 18px; border-bottom:1px solid #ececea;">
              <div style="font-family:Helvetica,Arial,sans-serif; font-size:15px; line-height:1.6; color:#0d1013; white-space:pre-wrap;">${escape(r.value)}</div>
            </td>
          </tr>`;
      }
      return `
        <tr>
          <td style="padding:14px 16px 14px 0; vertical-align:top; width:140px; font-family:'SF Mono','Menlo',monospace; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#7a7c7b; border-bottom:1px solid #ececea;">
            ${escape(r.label)}
          </td>
          <td style="padding:14px 0; vertical-align:top; font-family:Helvetica,Arial,sans-serif; font-size:15px; line-height:1.5; color:#0d1013; border-bottom:1px solid #ececea;">
            ${escape(r.value)}
          </td>
        </tr>`;
    })
    .join("");

  const cta = opts.ctaUrl
    ? `
      <tr>
        <td style="padding:28px 0 0;">
          <a href="${opts.ctaUrl}" style="display:inline-block; padding:12px 22px; background:#0d1013; color:#f6f3ec; text-decoration:none; border-radius:999px; font-family:Helvetica,Arial,sans-serif; font-size:14px; font-weight:500;">
            ${escape(opts.ctaLabel ?? "Reply")}
          </a>
        </td>
      </tr>`
    : "";

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(opts.title)}</title>
</head>
<body style="margin:0; padding:0; background:#f6f3ec;">
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
    ${escape(opts.preheader)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f3ec; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 18px 40px -28px rgba(13,16,19,0.18);">
          <tr>
            <td style="background:#0d1013; padding:18px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Helvetica,Arial,sans-serif; font-size:13px; letter-spacing:0.08em; text-transform:uppercase; color:#f6f3ec; font-weight:600;">
                    Smart Creation Group
                  </td>
                  <td align="right" style="font-family:'SF Mono','Menlo',monospace; font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#48a8db;">
                    Inbox notification
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 28px 24px;">
              <div style="font-family:'SF Mono','Menlo',monospace; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#7a7c7b; margin-bottom:8px;">
                § ${escape(opts.title.toUpperCase())}
              </div>
              <h1 style="margin:0; font-family:Georgia,serif; font-size:24px; line-height:1.25; letter-spacing:-0.01em; color:#0d1013; font-weight:600;">
                ${escape(opts.intro)}
              </h1>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;">
                ${rowsHtml}
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                ${cta}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 28px 24px; background:#fbf9f3; border-top:1px solid #ececea;">
              <div style="font-family:'SF Mono','Menlo',monospace; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:#9a9c9b;">
                Sent ${new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai" })} GST · via thesmartcreation.com
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ── Public helpers ──────────────────────────────────────────────────── */

export async function sendContactEmail(payload: {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
}) {
  const html = renderEmail({
    title: "New brief from contact form",
    preheader: `${payload.name} (${payload.email}) wants to talk about ${payload.topic}.`,
    intro: `${payload.name} sent a new brief.`,
    rows: [
      { label: "Name", value: payload.name },
      { label: "Email", value: payload.email },
      { label: "Phone", value: payload.phone || "—" },
      { label: "Topic", value: payload.topic },
      { label: "Message", value: payload.message, isBlock: true },
    ],
    ctaUrl: `mailto:${payload.email}?subject=Re: your enquiry to Smart Creation Group`,
    ctaLabel: `Reply to ${payload.name.split(" ")[0]}`,
  });

  await getTransport().sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: payload.email,
    subject: `[Smart Creation] New brief — ${payload.topic} (${payload.name})`,
    html,
    text: [
      `New brief from contact form`,
      ``,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "—"}`,
      `Topic: ${payload.topic}`,
      ``,
      `Message:`,
      payload.message,
    ].join("\n"),
  });
}

export async function sendNewsletterEmail(payload: {
  email: string;
  source?: string;
}) {
  const html = renderEmail({
    title: "New newsletter signup",
    preheader: `${payload.email} subscribed to Smart Creation insights.`,
    intro: "Someone just subscribed.",
    rows: [
      { label: "Email", value: payload.email },
      { label: "Source", value: payload.source || "Insights page" },
    ],
    ctaUrl: `mailto:${payload.email}?subject=Welcome to Smart Creation Insights`,
    ctaLabel: "Welcome the subscriber",
  });

  await getTransport().sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: payload.email,
    subject: `[Smart Creation] Newsletter signup — ${payload.email}`,
    html,
    text: `New newsletter signup\n\nEmail: ${payload.email}\nSource: ${payload.source || "Insights page"}`,
  });
}
