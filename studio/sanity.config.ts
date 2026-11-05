import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

/**
 * Elevate X Thrift admin.
 *
 * projectId comes from the environment (`SANITY_STUDIO_PROJECT_ID`, set in a
 * local .env or in your host's settings) so it is never committed.
 * Run `npm run dev`, open the printed URL, log in with the Google/GitHub
 * account you used to create the project.
 */
export default defineConfig({
  name: "elevate-x-thrift",
  title: "Elevate X Thrift — Admin",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "your-project-id",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
  document: {
    // thrift stock is one-of-one: no duplicate action
    actions: (input, { schemaType }) =>
      schemaType === "product"
        ? input.filter(({ action }) => action !== "duplicate" && action !== "unpublish")
        : input,
  },
});
