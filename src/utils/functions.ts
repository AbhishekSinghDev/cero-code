import { cancel, log, outro } from "@clack/prompts";
import chalk from "chalk";
import { env } from "../env";
import { authClient } from "../lib/auth-client";

import { deletePassword, getPassword, setPassword } from "cross-keychain";
import type { AuthInstance } from "../lib/type";

export const storeAuthInstance = async ({
  access_token,
  token_type,
  expires_in,
  scope,
}: {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}) => {
  try {
    await setPassword(
      "cero-cli",
      "auth-instance",
      JSON.stringify({
        access_token,
        token_type,
        expires_in,
        scope,
      })
    );
  } catch (error) {
    console.error(chalk.red("Failed to store token securely:"), error);
    process.exit(1);
  }
};

export const getAuthInstance = async (): Promise<AuthInstance | null> => {
  try {
    const authInstance = await getPassword("cero-cli", "auth-instance");
    return JSON.parse(authInstance || "null");
  } catch (error) {
    console.error(chalk.red("Failed to retrieve token:"), error);
    return null;
  }
};

export const checkTokenStatus = async () => {
  const authInstance = await getAuthInstance();
  if (!authInstance)
    return {
      exists: false,
      valid: false,
    };

  const now = new Date();
  const expiresAt = new Date(authInstance.expires_in);

  return {
    exists: true,
    valid: expiresAt.getTime() - now.getTime() < 5 * 60 * 1000,
  };
};

export const removeAuthInstance = async () => {
  try {
    await deletePassword("cero-cli", "auth-instance");
  } catch (error) {
    console.error(chalk.red("Failed to delete token:"), error);
    process.exit(1);
  }
};

export const pollForToken = async (
  device_code: string,
  pollingInterval: number
) => {
  const { data, error } = await authClient.device.token({
    grant_type: "urn:ietf:params:oauth:grant-type:device_code",
    device_code,
    client_id: env.CLI_UNIQUE_ID,
    fetchOptions: {
      headers: {
        "user-agent": "cero-cli",
      },
    },
  });

  if (data) {
    console.log();
    log.success(chalk.green.bold("✓ Authorization successful!"));
    await storeAuthInstance({
      access_token: data.access_token,
      token_type: data.token_type,
      expires_in: data.expires_in,
      scope: data.scope,
    });
    outro(chalk.cyan("You're all set! 🎉"));
    return;
  } else if (error) {
    switch (error.error) {
      case "authorization_pending":
        // Still waiting, continue polling
        setTimeout(
          () => pollForToken(device_code, pollingInterval),
          pollingInterval * 1000
        );
        break;
      case "slow_down":
        pollingInterval += 5;
        log.warn("Polling too fast, slowing down...");
        setTimeout(
          () => pollForToken(device_code, pollingInterval),
          pollingInterval * 1000
        );
        break;
      case "access_denied":
        log.error(chalk.red("Access was denied by the user"));
        cancel("Authorization cancelled.");
        process.exit(1);
        return;
      case "expired_token":
        log.error(chalk.red("The device code has expired"));
        cancel("Please run the login command again.");
        process.exit(1);
        return;
      default:
        log.error(
          chalk.red(
            `Authorization error: ${error.error_description || error.error}`
          )
        );
        cancel("Operation failed.");
        process.exit(1);
        return;
    }
  }
};
