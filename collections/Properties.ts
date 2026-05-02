import type { CollectionConfig } from "payload";

export const Properties: CollectionConfig = {
  slug: "properties",
  labels: { singular: "Property", plural: "Properties" },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    // heroImage first → each row gets a thumbnail. Centre is grouped/filterable.
    defaultColumns: [
      "heroImage",
      "title",
      "center",
      "category",
      "priceAmount",
      "availability",
    ],
    listSearchableFields: ["title", "officeNo", "description"],
    groupBy: true,
    group: "Content",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: { description: "Main image shown on the property card." },
            },
            { name: "title", type: "text", required: true },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              admin: {
                description: "Used in URLs, e.g. /business-centers/<slug>",
                position: "sidebar",
              },
            },
            {
              name: "center",
              type: "relationship",
              relationTo: "centers",
              required: true,
              admin: {
                description: "Which business centre this property belongs to.",
                position: "sidebar",
              },
            },
            { name: "officeNo", type: "text", required: true, label: "Office number" },
            {
              name: "category",
              type: "select",
              required: true,
              options: [
                { label: "Private office", value: "Private office" },
                { label: "Co-working", value: "Co-working" },
                { label: "Dedicated desk", value: "Dedicated desk" },
              ],
            },
            {
              name: "accent",
              type: "select",
              defaultValue: "blue",
              options: [
                { label: "Blue", value: "blue" },
                { label: "Stone", value: "stone" },
                { label: "Sand", value: "sand" },
              ],
            },
            { name: "description", type: "textarea", required: true },
            {
              name: "highlights",
              type: "array",
              labels: { singular: "Highlight", plural: "Highlights" },
              fields: [{ name: "value", type: "text", required: true }],
            },
            {
              name: "featured",
              type: "checkbox",
              defaultValue: false,
              admin: { description: "Show in featured grid on the home page" },
            },
            { name: "showOnHome", type: "checkbox", defaultValue: false },
          ],
        },
        {
          label: "Specs",
          fields: [
            { name: "floor", type: "text", admin: { description: "Specific floor for this property (overrides centre default if needed)" } },
            {
              type: "row",
              fields: [
                { name: "sqft", type: "text", admin: { width: "33%" } },
                { name: "capacity", type: "text", required: true, admin: { width: "33%" } },
                { name: "view", type: "text", admin: { width: "33%" } },
              ],
            },
            {
              name: "features",
              type: "array",
              labels: { singular: "Feature", plural: "Features" },
              fields: [{ name: "value", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Pricing & fees",
          fields: [
            {
              type: "row",
              fields: [
                { name: "priceAmount", type: "text", required: true, label: "Price", admin: { width: "33%" } },
                {
                  name: "pricePeriod",
                  type: "text",
                  label: "Period",
                  admin: { width: "33%", placeholder: "e.g. /year — leave empty for \"On request\"" },
                  defaultValue: "/year",
                },
                { name: "priceNote", type: "text", label: "Note", admin: { width: "34%" } },
              ],
            },
            { name: "paymentTerms", type: "text" },
            {
              name: "paymentOptions",
              type: "array",
              labels: { singular: "Option", plural: "Payment options" },
              fields: [{ name: "value", type: "text", required: true }],
            },
            {
              name: "fees",
              type: "group",
              fields: [
                { name: "securityDeposit", type: "text", required: true },
                { name: "managementFee", type: "text", required: true },
                { name: "ejariFee", type: "text", required: true },
                { name: "ddaNoc", type: "text", label: "DDA NOC" },
                { name: "vat", type: "text", required: true, label: "VAT" },
                { name: "parking", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Availability",
          fields: [
            {
              name: "availability",
              type: "text",
              required: true,
              admin: { description: "e.g. \"Available now\" or \"Available 1 Aug 2025\"" },
            },
            {
              name: "availabilityAccent",
              type: "select",
              defaultValue: "live",
              options: [
                { label: "Live (available now)", value: "live" },
                { label: "Upcoming", value: "upcoming" },
              ],
            },
            { name: "availableFrom", type: "date" },
          ],
        },
        {
          label: "Gallery",
          fields: [
            {
              name: "gallery",
              type: "array",
              labels: { singular: "Image", plural: "Gallery images" },
              fields: [
                { name: "image", type: "upload", relationTo: "media", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
