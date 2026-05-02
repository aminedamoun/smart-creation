import type { CollectionConfig } from "payload";

export const Centers: CollectionConfig = {
  slug: "centers",
  labels: { singular: "Business Centre", plural: "Business Centres" },
  access: { read: () => true },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["heroImage", "name", "building", "location"],
    listSearchableFields: ["name", "building", "location", "key"],
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
              name: "key",
              type: "text",
              required: true,
              unique: true,
              admin: {
                description:
                  "Stable lowercase ID used in URLs, e.g. smart-creation. /business-centers/<key>",
                position: "sidebar",
              },
            },
            { name: "name", type: "text", required: true },
            { name: "tagline", type: "text" },
            { name: "description", type: "textarea", required: true },
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: { description: "Main photo (building exterior or signature shot)" },
            },
            {
              name: "displayOrder",
              type: "number",
              defaultValue: 100,
              admin: {
                description: "Lower = earlier in centre lists",
                position: "sidebar",
              },
            },
          ],
        },
        {
          label: "Address & Map",
          fields: [
            { name: "building", type: "text", required: true },
            { name: "location", type: "text", required: true, label: "Area / district" },
            { name: "addressLine", type: "text", label: "Full street address" },
            { name: "emirate", type: "text", required: true, defaultValue: "Dubai, U.A.E." },
            { name: "googleMapsUrl", type: "text", label: "Google Maps link" },
            {
              type: "row",
              fields: [
                { name: "phone", type: "text", admin: { width: "50%" } },
                { name: "email", type: "email", admin: { width: "50%" } },
              ],
            },
          ],
        },
        {
          label: "Advantages",
          description: "Bullet points highlighting what makes this centre stand out.",
          fields: [
            {
              name: "advantages",
              type: "array",
              labels: { singular: "Advantage", plural: "Advantages" },
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea" },
              ],
            },
          ],
        },
        {
          label: "Nearby",
          description: "Notable landmarks, metro stations, restaurants nearby.",
          fields: [
            {
              name: "nearby",
              type: "array",
              labels: { singular: "Place", plural: "Nearby places" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "name", type: "text", required: true, admin: { width: "50%" } },
                    {
                      name: "category",
                      type: "select",
                      defaultValue: "landmark",
                      admin: { width: "25%" },
                      options: [
                        { label: "Metro", value: "metro" },
                        { label: "Mall", value: "mall" },
                        { label: "Restaurant", value: "restaurant" },
                        { label: "Bank", value: "bank" },
                        { label: "Landmark", value: "landmark" },
                        { label: "Hospital", value: "hospital" },
                        { label: "School", value: "school" },
                        { label: "Hotel", value: "hotel" },
                      ],
                    },
                    { name: "distance", type: "text", admin: { width: "25%", placeholder: "e.g. 5 min walk" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Gallery",
          description: "Interior photos shown on the centre page.",
          fields: [
            {
              name: "gallery",
              type: "array",
              labels: { singular: "Image", plural: "Gallery images" },
              fields: [
                { name: "image", type: "upload", relationTo: "media", required: true },
                { name: "caption", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Properties",
          description:
            "Properties for rent at this centre. Click a property to edit, or use \"Create New\" to add one — the centre is linked automatically.",
          fields: [
            {
              name: "properties",
              type: "join",
              collection: "properties",
              on: "center",
              defaultSort: "title",
              admin: {
                defaultColumns: ["heroImage", "title", "officeNo", "priceAmount", "availability"],
                allowCreate: true,
              },
            },
          ],
        },
      ],
    },
  ],
};
