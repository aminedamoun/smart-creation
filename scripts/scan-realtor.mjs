import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();

const keys = new Set();
const chunks = new Set();

page.on("request", (req) => {
  const url = req.url();
  if (url.includes("/_next/static/chunks/") && url.endsWith(".js")) {
    chunks.add(url);
  }
  if (url.includes("maps.googleapis.com") || url.includes("maps.google.com")) {
    const m = url.match(/[?&]key=([^&]+)/);
    if (m) keys.add(m[1]);
  }
});

await page.goto("https://thepriverrealtors.vercel.app/", { waitUntil: "networkidle", timeout: 60000 });
// Scroll the page to trigger any lazy-loaded sections
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(4000);

console.log("KEYS_FROM_GOOGLE_API_REQUESTS:");
for (const k of keys) console.log(" ", k);
console.log("CHUNK_COUNT:", chunks.size);

// Now download the chunks containing AdvancedMarker / APIProvider / GOOGLE_MAPS_API_KEY
import { readFile } from "node:fs/promises";
import { writeFile } from "node:fs/promises";
let i = 0;
for (const url of chunks) {
  const r = await fetch(url);
  const t = await r.text();
  if (
    /AdvancedMarker|APIProvider|@vis\.gl|LABEL_MIN_ZOOM|DUBAI_CENTER/.test(t)
  ) {
    const m = t.match(/AIza[0-9A-Za-z_-]{30,}/);
    console.log("MATCHED_CHUNK:", url, "key:", m ? m[0] : "(none)");
    if (m) keys.add(m[0]);
  }
  i++;
}
console.log("DONE_KEYS:");
for (const k of keys) console.log(" ", k);

await browser.close();
