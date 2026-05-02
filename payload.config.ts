import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Centers } from "./collections/Centers";
import { Properties } from "./collections/Properties";
import { BlogPosts } from "./collections/BlogPosts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Accept either DATABASE_URI (Payload convention) or DATABASE_URL (Vercel/Neon).
const dbUri =
  process.env.DATABASE_URI ?? process.env.DATABASE_URL ?? "file:./payload.db";

// Postgres for production / hosted environments, SQLite for local dev.
const db = dbUri.startsWith("postgres")
  ? postgresAdapter({
      pool: {
        connectionString: dbUri,
        // Neon / Vercel Postgres require SSL; allow it without verifying CA.
        ssl: dbUri.includes("sslmode=disable")
          ? false
          : { rejectUnauthorized: false },
      },
      // Auto-create schema on first connect. Switch to proper migrations
      // (`payload migrate`) once schema settles down.
      push: true,
    })
  : sqliteAdapter({ client: { url: dbUri } });

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL ?? "",
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Smart Creation Admin",
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Centers, Properties, BlogPosts],
  secret: process.env.PAYLOAD_SECRET ?? "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db,
  upload: {
    limits: { fileSize: 10_000_000 },
  },
  // Vercel Blob in production (set BLOB_READ_WRITE_TOKEN); local disk in dev.
  // disablePayloadAccessControl makes media URLs point directly at the Blob
  // CDN domain instead of being proxied through /api/media/file/* (which 404s
  // unless we explicitly stream files through Payload). Public assets only.
  plugins: blobToken
    ? [
        vercelBlobStorage({
          collections: {
            media: {
              disablePayloadAccessControl: true,
            },
          },
          token: blobToken,
        }),
      ]
    : [],
  sharp,
});
