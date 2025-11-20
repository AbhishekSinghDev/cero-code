import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXT_SERVER_URL: z
      .url()
      .default("https://cero.abhisheksingh.me")
      .optional(),
    CLI_UNIQUE_ID: z
      .string()
      .default("cero-cli-TC6BiqEw1BHvYEZf13kBbGjQBGSoBv4i")
      .optional(),
  },
  runtimeEnv: process.env,
  isServer: true,
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
