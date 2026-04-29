import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env["DATABASE_URL"] || "postgresql://neondb_owner:npg_FDI5HTSKaMe7@ep-nameless-unit-am9rgpxh.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
});
