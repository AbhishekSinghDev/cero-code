import { Command } from "commander";
import { loginAction } from "../actions/login";

export const loginCommand = new Command("login")
  .description("Authenticate with Cero using device authorization flow")
  .summary("Login to Cero")
  .action(loginAction);
