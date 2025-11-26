import { setupAuthCommands } from "@cli/commands/auth.command";
import { setupChatCommands } from "@cli/commands/chat.command";
import chalk from "chalk";
import { Command } from "commander";
import figlet from "figlet";

import PackageJson from "../../../package.json";

export class CLIService {
  private program: Command;

  constructor() {
    this.program = new Command();
    this.displayBanner();
    this.setupCommands();
  }

  private displayBanner(): void {
    console.clear();
    console.log(
      chalk.greenBright(
        figlet.textSync("CEROCODE", {
          font: "Future",
          horizontalLayout: "full",
          verticalLayout: "default",
          whitespaceBreak: true,
        })
      )
    );
    console.log(chalk.white.bold("Agentic CLI"));
    console.log();
  }

  private setupCommands(): void {
    this.program
      .name("cero")
      .version(PackageJson.version, "-v, --version", "Display version number")
      .description("AI-powered CLI with chat and agent capabilities")
      .helpOption("-h, --help", "Display help information")
      .showHelpAfterError("(add --help for additional information)")
      .showSuggestionAfterError()
      .configureOutput({
        outputError: (str, write) => write(chalk.red(str)),
      })
      .exitOverride();

    // Default action when no command is provided
    this.program.action(() => {
      this.program.outputHelp();
    });

    // Setup command groups
    setupAuthCommands(this.program);
    setupChatCommands(this.program);

    // Exit command
    this.program
      .command("exit")
      .description("Exit the Cero CLI gracefully")
      .action(() => {
        console.log(chalk.cyan("Thanks for using Cero! 👋"));
        process.exit(0);
      });
  }

  async run(): Promise<void> {
    try {
      await this.program.parseAsync(process.argv);
    } catch (err) {
      // Handle Commander errors gracefully (e.g., --help, --version)
      if (err instanceof Error && "code" in err) {
        const commanderErr = err as { code: string };
        // These are expected exits from Commander (help, version display)
        if (
          commanderErr.code === "commander.helpDisplayed" ||
          commanderErr.code === "commander.version"
        ) {
          return;
        }
      }
      // For actual errors, log and exit
      console.error(chalk.red("Error:"), err instanceof Error ? err.message : err);
      process.exit(1);
    }
  }
}
