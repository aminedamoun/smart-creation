/* One-off DB tweak:
 *   • Adjust displayOrder of existing centres to match the homepage filter order:
 *       smart-creation (10) → future-space (20) → smart-place (30)
 *       → smart-founders (40, NEW) → smart-view (50) → abna-rashid (60)
 *   • Insert "Smart Founders" centre if not already present.
 *
 *   npx tsx scripts/add-smart-founders.mts
 */
import path from "path";
import fs from "fs/promises";
import { readFileSync } from "fs";

try {
  const envFile = readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of envFile.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* no .env.local — assume env already set */
}

import { getPayload } from "payload";
const config = (await import(path.resolve(process.cwd(), "payload.config.ts"))).default;

const PUBLIC_DIR = path.resolve(process.cwd(), "public");

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>;

async function uploadImage(
  payload: PayloadInstance,
  relPath: string,
  alt: string
): Promise<string | number | null> {
  const absPath = path.join(PUBLIC_DIR, relPath.replace(/^\//, ""));
  try {
    const data = await fs.readFile(absPath);
    const filename = path.basename(absPath);
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data,
        mimetype: filename.endsWith(".webp") ? "image/webp" : "image/jpeg",
        name: filename,
        size: data.length,
      },
    });
    return doc.id;
  } catch (err) {
    console.warn(`  ! skipped ${relPath}: ${(err as Error).message}`);
    return null;
  }
}

const orderMap: Record<string, number> = {
  "smart-creation": 10,
  "future-space": 20,
  "smart-place": 30,
  "smart-founders": 40,
  "smart-view": 50,
  "abna-rashid": 60,
};

async function main() {
  const payload = await getPayload({ config });

  // 1) Update displayOrder on existing centres
  for (const [key, displayOrder] of Object.entries(orderMap)) {
    const existing = await payload.find({
      collection: "centers",
      where: { key: { equals: key } },
      limit: 1,
      depth: 0,
    });
    const doc = existing.docs[0];
    if (!doc) continue;
    if (doc.displayOrder === displayOrder) {
      console.log(`= ${key}: displayOrder already ${displayOrder}`);
      continue;
    }
    await payload.update({
      collection: "centers",
      id: doc.id,
      data: { displayOrder },
    });
    console.log(`~ ${key}: displayOrder → ${displayOrder}`);
  }

  // 2) Insert Smart Founders if missing
  const existingFounders = await payload.find({
    collection: "centers",
    where: { key: { equals: "smart-founders" } },
    limit: 1,
    depth: 0,
  });
  if (existingFounders.docs.length > 0) {
    console.log("= smart-founders already exists, skipping insert");
    return;
  }

  const heroId = await uploadImage(
    payload,
    "/centres/smart-founders.webp",
    "Smart Founders — logo"
  );
  if (!heroId) {
    console.error("! could not upload smart-founders hero image; aborting");
    process.exit(1);
  }

  await payload.create({
    collection: "centers",
    data: {
      key: "smart-founders",
      name: "Smart Founders",
      tagline: "Founder-focused workspace.",
      description:
        "Smart Founders — a dedicated centre for early-stage founders and small teams. Workspace, mentorship adjacency, and back-office support tailored to new businesses.",
      building: "Smart Founders Centre",
      location: "Dubai",
      addressLine: "Dubai, U.A.E.",
      emirate: "Dubai, U.A.E.",
      heroImage: heroId,
      displayOrder: 40,
    },
  });
  console.log("+ smart-founders centre created");
}

await main();
process.exit(0);
