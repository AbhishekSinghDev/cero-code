import chalk from "chalk";
import { program } from "commander";
import figlet from "figlet";

import PackageJson from "../../package.json";
import { exitCommand } from "../commands/exit";
import { loginCommand } from "../commands/login";
import { logoutCommand } from "../commands/logout";
import { ME } from "./constant";

export const init = () => {
  console.log(
    chalk.cyan(figlet.textSync("CERO", { horizontalLayout: "full" }))
  );
  console.log(chalk.gray("─".repeat(50)));
  console.log(
    chalk.white.bold("AI-Powered CLI") +
      chalk.gray(" • Built by ") +
      chalk.cyan.underline(ME.name)
  );
  console.log(chalk.gray("─".repeat(50)));

  program
    .name("cero")
    .version(PackageJson.version, "-v, --version", "Display version number")
    .helpOption("-h, --help", "Display help information")
    .showHelpAfterError("(add --help for additional information)")
    .showSuggestionAfterError();

  program
    .addCommand(loginCommand)
    .addCommand(logoutCommand)
    .addCommand(exitCommand);

  program.parse();
};
