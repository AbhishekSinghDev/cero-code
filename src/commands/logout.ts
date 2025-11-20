import { Command } from "commander";
import { logoutAction } from "../actions/logout";

export const logoutCommand = new Command("logout")
  .description("Logout from Cero")
  .summary("Logout from Cero")
  .action(logoutAction);
