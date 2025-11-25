import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware, getOAuthState } from "better-auth/api";
import { bearer, deviceAuthorization } from "better-auth/plugins";
import { env } from "@/env";
import { db } from "@/server/db";

export const auth = betterAuth({
  baseURL: env.NEXT_PUBLIC_API_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  session: {
    expiresIn: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    cookieCache: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    bearer(),
    deviceAuthorization({
      expiresIn: "30m",
      interval: "5s",
      verificationUri: `${env.NEXT_PUBLIC_WEBSITE_URL}/device`,
    }),
  ],
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // Redirect OAuth callbacks from API to website
      if (ctx.path?.startsWith("/callback/")) {
        const state = await getOAuthState();
        const callbackURL = state?.callbackURL || "/";

        // Build the full website URL with the callback path
        const websiteURL = new URL(callbackURL, env.NEXT_PUBLIC_WEBSITE_URL);

        throw ctx.redirect(websiteURL.toString());
      }
    }),
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  trustedOrigins: [env.NEXT_PUBLIC_WEBSITE_URL],
});

export type Session = typeof auth.$Infer.Session;
