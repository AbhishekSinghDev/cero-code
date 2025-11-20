import { confirm, isCancel } from "@clack/prompts";
import chalk from "chalk";
import { removeAuthInstance } from "../utils/functions";

export const logoutAction = async () => {
  const confirmed = await confirm({
    message: "Are you sure you want to logout?",
    initialValue: false,
  });

  if (!isCancel(confirmed) && confirmed) {
    await removeAuthInstance();
    console.log(chalk.green("✓ Logged out successfully"));
  } else {
    console.log(chalk.yellow("x Logout cancelled."));
  }
};
