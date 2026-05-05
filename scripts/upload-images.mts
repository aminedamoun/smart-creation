/**
 * Upload selected `/public/...` directories to the Supabase `sc-media` bucket
 * and (optionally) print the public URLs. Idempotent — files already in the
 * bucket are skipped unless --force is passed.
 *
 *   npx tsx scripts/upload-images.mts          # dry run, lists what would upload
 *   npx tsx scripts/upload-images.mts --apply  # actually upload
 *   npx tsx scripts/upload-images.mts --apply --force  # overwrite existing
 *
 * Edit BATCHES below to add/remove categories.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

try {
  const env = readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* ignore */
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const APPLY = process.argv.includes("--apply");
const FORCE = process.argv.includes("--force");
const sb = createClient(url, key, { auth: { persistSession: false } });
const BUCKET = "sc-media";

type Batch = { localDir: string; remotePrefix: string };

const BATCHES: Batch[] = [
  { localDir: "public/team",         remotePrefix: "team" },
  { localDir: "public/services",     remotePrefix: "services" },
  { localDir: "public/centres",      remotePrefix: "centres" },
  { localDir: "public/group-logos",  remotePrefix: "group-logos" },
  { localDir: "public/free-zones",   remotePrefix: "free-zones" },
];

// Standalone files (not under a category folder)
const STANDALONE_FILES: { localPath: string; remotePath: string }[] = [
  { localPath: "public/team-group.webp",            remotePath: "team-group.webp" },
  { localPath: "public/contact-hero.webp",          remotePath: "contact-hero.webp" },
  { localPath: "public/sc-group-logo.webp",         remotePath: "sc-group-logo.webp" },
  { localPath: "public/sc-group-logo-light.webp",   remotePath: "sc-group-logo-light.webp" },
  { localPath: "public/ceo-asad-hashmi.webp",       remotePath: "ceo-asad-hashmi.webp" },
  { localPath: "public/damac-executive.webp",       remotePath: "damac-executive.webp" },
];

function* walkFiles(dir: string): Generator<string> {
  if (!safeStat(dir)?.isDirectory()) return;
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    const full = path.join(dir, entry);
    const s = safeStat(full);
    if (!s) continue;
    if (s.isDirectory()) {
      yield* walkFiles(full);
    } else if (s.isFile()) {
      yield full;
    }
  }
}

function safeStat(p: string) {
  try {
    return statSync(p);
  } catch {
    return null;
  }
}

function mimeFor(ext: string): string {
  switch (ext.toLowerCase()) {
    case ".webp": return "image/webp";
    case ".png":  return "image/png";
    case ".jpg":
    case ".jpeg": return "image/jpeg";
    case ".svg":  return "image/svg+xml";
    case ".avif": return "image/avif";
    default:      return "application/octet-stream";
  }
}

async function upload(localPath: string, remotePath: string): Promise<"uploaded" | "skipped" | "error"> {
  const buf = readFileSync(localPath);
  const ext = path.extname(localPath);
  const contentType = mimeFor(ext);

  const { error } = await sb.storage.from(BUCKET).upload(remotePath, buf, {
    contentType,
    upsert: FORCE,
    cacheControl: "31536000",
  });
  if (error) {
    if ((error as { statusCode?: string }).statusCode === "409" || /already exists|duplicate/i.test(error.message)) {
      return "skipped";
    }
    console.error(`  ! ${remotePath}: ${error.message}`);
    return "error";
  }
  return "uploaded";
}

function publicUrl(remotePath: string): string {
  return sb.storage.from(BUCKET).getPublicUrl(remotePath).data.publicUrl;
}

async function main() {
  let total = 0;
  let uploaded = 0;
  let skipped = 0;
  const urls: string[] = [];

  // Process directory batches
  for (const b of BATCHES) {
    const fullDir = path.resolve(process.cwd(), b.localDir);
    if (!safeStat(fullDir)?.isDirectory()) continue;

    for (const filePath of walkFiles(fullDir)) {
      const rel = path.relative(fullDir, filePath);
      const remotePath = path.posix.join(b.remotePrefix, rel.split(path.sep).join("/"));
      total += 1;

      if (!APPLY) {
        console.log(`  [dry] ${b.localDir}/${rel}  →  ${BUCKET}/${remotePath}`);
        urls.push(`/${b.localDir.replace("public/", "")}/${rel}  =>  ${publicUrl(remotePath)}`);
        continue;
      }

      const result = await upload(filePath, remotePath);
      if (result === "uploaded") {
        uploaded += 1;
        console.log(`  + ${remotePath}`);
      } else if (result === "skipped") {
        skipped += 1;
        console.log(`  = ${remotePath} (already in bucket)`);
      }
    }
  }

  // Standalone files
  for (const sFile of STANDALONE_FILES) {
    const fullPath = path.resolve(process.cwd(), sFile.localPath);
    if (!safeStat(fullPath)?.isFile()) continue;
    total += 1;

    if (!APPLY) {
      console.log(`  [dry] ${sFile.localPath}  →  ${BUCKET}/${sFile.remotePath}`);
      urls.push(`/${sFile.localPath.replace("public/", "")}  =>  ${publicUrl(sFile.remotePath)}`);
      continue;
    }

    const result = await upload(fullPath, sFile.remotePath);
    if (result === "uploaded") {
      uploaded += 1;
      console.log(`  + ${sFile.remotePath}`);
    } else if (result === "skipped") {
      skipped += 1;
      console.log(`  = ${sFile.remotePath} (already in bucket)`);
    }
  }

  console.log(`\n${APPLY ? "Done" : "Dry run"} — ${total} files · ${APPLY ? `${uploaded} uploaded, ${skipped} skipped` : "pass --apply to upload"}`);

  if (!APPLY && urls.length > 0) {
    console.log("\nMapping (local → remote public URL):");
    for (const u of urls.slice(0, 10)) console.log(`  ${u}`);
    if (urls.length > 10) console.log(`  ... and ${urls.length - 10} more`);
  }
}

await main();
process.exit(0);
