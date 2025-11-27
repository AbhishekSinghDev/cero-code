import { AuthService } from "@core/auth/auth.service";
import { UserService } from "@core/user/user.service";

const authService = new AuthService();
const userService = new UserService();

export async function fetchUserAuth() {
  return await authService.isAuthenticated();
}

export async function fetchUserData() {
  return await userService.whoAmI();
}

export async function fetchUserTokens() {
  return await authService.getTokens();
}
