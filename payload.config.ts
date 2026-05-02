import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { Users } from "./collections/Users.ts";
import { Media } from "./collections/Media.ts";
import { Centers } from "./collections/Centers.ts";
import { Properties } from "./collections/Properties.ts";
import { BlogPosts } from "./collections/BlogPosts.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

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
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI ?? "file:./payload.db",
    },
  }),
  upload: {
    limits: { fileSize: 10_000_000 },
  },
  sharp,
});
