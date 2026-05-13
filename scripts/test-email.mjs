/**
 * One-shot SMTP smoke test. Sends a sample contact + newsletter email
 * to ADMIN_EMAIL using whatever creds are in .env.local.
 *
 *   node scripts/test-email.mjs
 */
import { readFileSync } from "fs";
import path from "path";

try {
  const env = readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    // tolerant parser: supports `KEY=value`, `KEY="value with spaces"`,
    // `KEY='single quoted'`. Ignores comments and blank lines.
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    let value = m[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = value;
  }
} catch (e) {
  console.error("Couldn't read .env.local:", e.message);
  process.exit(1);
}

const { sendContactEmail, sendNewsletterEmail } = await import(
  path.resolve(process.cwd(), "lib/email.ts")
).catch(async () => {
  // tsx loader path for ESM
  return await import("../lib/email.ts");
});

console.log("SMTP host:", process.env.SMTP_HOST);
console.log("Sending to:", process.env.ADMIN_EMAIL);

try {
  await sendContactEmail({
    name: "Test Sender",
    email: "test@example.com",
    phone: "+971 50 000 0000",
    topic: "Company formation",
    message:
      "This is a live SMTP smoke test from the Smart Creation website. If you can read this, the contact form is wired up.",
  });
  console.log("✓ Contact email sent.");
} catch (e) {
  console.error("✗ Contact email FAILED:", e.message);
  process.exit(1);
}

try {
  await sendNewsletterEmail({
    email: "test@example.com",
    source: "Live SMTP smoke test",
  });
  console.log("✓ Newsletter email sent.");
} catch (e) {
  console.error("✗ Newsletter email FAILED:", e.message);
  process.exit(1);
}

console.log("All good. Check admin@thesmartcreation.com inbox.");
process.exit(0);
