import type { CollectionConfig } from "payload";
import {
  lexicalEditor,
  HeadingFeature,
  LinkFeature,
  BlockquoteFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  InlineCodeFeature,
} from "@payloadcms/richtext-lexical";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: { singular: "Blog post", plural: "Blog posts" },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedAt", "updatedAt"],
    group: "Content",
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            { name: "title", type: "text", required: true },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              admin: { description: "Used in URLs, e.g. /blog/<slug>" },
            },
            { name: "excerpt", type: "textarea", required: true, maxLength: 280 },
            {
              name: "body",
              type: "richText",
              required: true,
              editor: lexicalEditor({
                features: () => [
                  HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
                  BoldFeature(),
                  ItalicFeature(),
                  UnderlineFeature(),
                  StrikethroughFeature(),
                  InlineCodeFeature(),
                  LinkFeature(),
                  BlockquoteFeature(),
                  UnorderedListFeature(),
                  OrderedListFeature(),
                ],
              }),
            },
          ],
        },
        {
          label: "Meta",
          fields: [
            {
              name: "category",
              type: "select",
              required: true,
              defaultValue: "Playbook",
              options: [
                { label: "Playbook", value: "Playbook" },
                { label: "Field notes", value: "Field notes" },
                { label: "Guide", value: "Guide" },
                { label: "News", value: "News" },
              ],
            },
            {
              name: "coverImage",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "readTime",
              type: "text",
              admin: { description: "e.g. \"6 min read\"" },
            },
            {
              name: "author",
              type: "relationship",
              relationTo: "users",
            },
            {
              name: "tags",
              type: "array",
              labels: { singular: "Tag", plural: "Tags" },
              fields: [{ name: "value", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Publishing",
          fields: [
            {
              name: "status",
              type: "select",
              required: true,
              defaultValue: "draft",
              options: [
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
              ],
            },
            { name: "publishedAt", type: "date" },
          ],
        },
      ],
    },
  ],
};
