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

const dbUri = process.env.DATABASE_URI ?? "file:./payload.db";

// Postgres for production / hosted environments, SQLite for local dev.
const db = dbUri.startsWith("postgres")
  ? postgresAdapter({ pool: { connectionString: dbUri } })
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
  plugins: blobToken
    ? [
        vercelBlobStorage({
          collections: { media: true },
          token: blobToken,
        }),
      ]
    : [],
  sharp,
});
