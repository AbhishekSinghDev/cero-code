import chalk from "chalk";
import { env } from "../env";
import { authClient } from "../lib/auth-client";
import { tryCatch } from "../lib/try-catch";

import { cancel, confirm, intro, isCancel, log, outro } from "@clack/prompts";
import open from "open";
import yoctoSpinner from "yocto-spinner";
import { TOKEN_POLLING_INTERVAL } from "../lib/constant";
import { checkTokenStatus, pollForToken } from "../utils/functions";

export const loginAction = async () => {
  intro(chalk.cyan.bold("🔐 Authentication Procedure"));

  const authStatus = await checkTokenStatus();
  const tokenExists = authStatus.exists;
  const tokenValid = authStatus.valid;

  if (tokenExists && tokenValid) {
    log.success("You are already logged in!");
    outro(chalk.green("You're all set!"));
    return;
  }

  const s = yoctoSpinner();
  s.start("Requesting device authorization");
  const { data, error } = await tryCatch(
    authClient.device.code({
      client_id: env.CLI_UNIQUE_ID || "",
    })
  );

  if (error || !data.data) {
    s.stop("Authorization request failed");
    log.error(
      chalk.red(
        `Failed to request authorization: ${error?.message ?? "Unknown error"}`
      )
    );
    cancel("Operation cancelled due to error.");
    process.exit(1);
  }

  s.stop("Authorization request successful");
  console.log();

  // Authorization details section
  log.info(chalk.white.bold("Please authorize this device to continue"));
  console.log(
    chalk.gray("  Visit: ") +
      chalk.cyan.underline(
        data.data.verification_uri || data.data.verification_uri_complete
      )
  );
  console.log(chalk.gray("  Code:  ") + chalk.yellow.bold(data.data.user_code));
  console.log();

  // User interaction section
  const shouldOpen = await confirm({
    message: "Open authorization URL in your browser?",
    initialValue: true,
  });

  if (isCancel(shouldOpen)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  if (shouldOpen) {
    const urlToOpen =
      data.data.verification_uri || data.data.verification_uri_complete;
    try {
      await open(urlToOpen);
      log.success("Browser opened successfully");
    } catch (err) {
      log.warn("Could not open browser automatically");
    }
  }

  console.log();
  log.step(
    chalk.gray(
      `Waiting for authorization (expires in ${Math.floor(
        data.data.expires_in / 60
      )} minutes)`
    )
  );

  pollForToken(data.data.device_code, TOKEN_POLLING_INTERVAL);
};
