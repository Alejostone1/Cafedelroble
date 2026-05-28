import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Carga .env.local primero, luego .env como fallback
config({ path: ".env.local" });
config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
