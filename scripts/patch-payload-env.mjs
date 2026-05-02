/* Postinstall patch: Payload v3.84 + Next.js 16 incompatibility.
 *
 * Payload's bin/loadEnv.js does:
 *     import nextEnvImport from '@next/env'
 *     const { loadEnvConfig } = nextEnvImport
 *
 * In Next.js 16, @next/env exposes named exports only — no default — so the
 * destructure throws. We rewrite to a namespace import.
 *
 * Safe to run repeatedly. Remove this once Payload ships a fix upstream.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const target = resolve(process.cwd(), "node_modules/payload/dist/bin/loadEnv.js");
if (!existsSync(target)) {
  // payload not installed yet — first install pass; nothing to patch.
  process.exit(0);
}
const src = readFileSync(target, "utf8");
if (src.includes("import * as nextEnvNs from '@next/env'")) {
  process.exit(0);
}
const patched = src.replace(
  "import nextEnvImport from '@next/env';\nimport { findUpSync } from '../utilities/findUp.js';\nconst { loadEnvConfig } = nextEnvImport;",
  "import * as nextEnvNs from '@next/env';\nimport { findUpSync } from '../utilities/findUp.js';\nconst loadEnvConfig = nextEnvNs.loadEnvConfig ?? nextEnvNs.default?.loadEnvConfig;"
);
if (patched === src) {
  console.warn("[patch-payload-env] payload/bin/loadEnv.js shape changed — skipping");
  process.exit(0);
}
writeFileSync(target, patched);
console.log("[patch-payload-env] applied");
