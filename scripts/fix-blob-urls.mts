/* One-off: rewrite media.url + sizes.*.url in prod DB to direct Blob URLs.
 * Run with the same env vars as seed.mts.
 *   DATABASE_URI=… BLOB_READ_WRITE_TOKEN=… PAYLOAD_SECRET=… npx tsx scripts/fix-blob-urls.mts
 */
import path from "path";
import { readFileSync } from "fs";

try {
  const env = readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {}

import { getPayload } from "payload";
const config = (await import(path.resolve(process.cwd(), "payload.config.ts"))).default;

const token = process.env.BLOB_READ_WRITE_TOKEN ?? "";
const storeId = token.match(/^vercel_blob_rw_([a-zA-Z\d]+)_[a-zA-Z\d]+$/)?.[1]?.toLowerCase();
if (!storeId) {
  console.error("Could not parse store id from BLOB_READ_WRITE_TOKEN");
  process.exit(1);
}
const baseUrl = `https://${storeId}.public.blob.vercel-storage.com`;
console.log("Rewriting media URLs to:", baseUrl + "/<filename>");

const payload = await getPayload({ config });
const all = await payload.find({ collection: "media", limit: 500, depth: 0 });
console.log(`Found ${all.totalDocs} media docs`);

let n = 0;
for (const doc of all.docs) {
  const filename = (doc as { filename?: string }).filename;
  if (!filename) continue;
  const newUrl = `${baseUrl}/${filename}`;
  const sizes = (doc as { sizes?: Record<string, { filename?: string; url?: string }> }).sizes ?? {};
  const newSizes: Record<string, unknown> = {};
  for (const [name, size] of Object.entries(sizes)) {
    if (size?.filename) {
      newSizes[name] = { ...size, url: `${baseUrl}/${size.filename}` };
    } else if (size) {
      newSizes[name] = size;
    }
  }
  await payload.update({
    collection: "media",
    id: doc.id,
    data: { url: newUrl, sizes: newSizes },
  });
  n++;
  if (n % 10 === 0) console.log(`  updated ${n}/${all.totalDocs}`);
}
console.log(`Done — updated ${n} media docs.`);
process.exit(0);
