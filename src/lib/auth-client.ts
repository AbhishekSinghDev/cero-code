import { createAuthClient } from "better-auth/client";
import { deviceAuthorizationClient } from "better-auth/client/plugins";
import { env } from "../env";

export const authClient = createAuthClient({
  baseURL: env.NEXT_SERVER_URL || "https://cero.abhisheksingh.me",
  plugins: [deviceAuthorizationClient()],
});
