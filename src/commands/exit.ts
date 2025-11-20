import { outro } from "@clack/prompts";
import chalk from "chalk";
import { Command } from "commander";

export const exitCommand = new Command("exit")
  .description("Exit the Cero CLI gracefully")
  .summary("Exit Cero")
  .action(() => {
    outro(chalk.cyan("Thanks for using Cero! 👋"));
    process.exit(0);
  });
