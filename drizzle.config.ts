import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.TICKETING_PLATFORM_DB_URL,
  },
  tablesFilter: ["ticketing-platform_*"],
} satisfies Config;
