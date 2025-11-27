import { APP_NAME } from "@core/config/constants";
import { deletePassword, getPassword, setPassword } from "cross-keychain";
import type { AuthTokens } from "types";

export class KeychainService {
  private readonly serviceName = APP_NAME;
  private readonly accountName = "auth-instance";

  async saveTokens(tokens: AuthTokens): Promise<void> {
    const tokensWithTimestamp = {
      ...tokens,
      savedAt: Date.now(),
    };
    await setPassword(this.serviceName, this.accountName, JSON.stringify(tokensWithTimestamp));
  }

  async getTokens(): Promise<AuthTokens | null> {
    try {
      const authInstance = await getPassword(this.serviceName, this.accountName);
      return JSON.parse(authInstance || "null");
    } catch (_error) {
      return null;
    }
  }

  async clearTokens(): Promise<void> {
    try {
      await deletePassword(this.serviceName, this.accountName);
    } catch (_error) {
      // Ignore errors if tokens don't exist
    }
  }

  async hasValidToken(): Promise<boolean> {
    const tokens = await this.getTokens();
    if (!tokens || !tokens.access_token) return false;

    // If no savedAt timestamp, assume token is valid (for backward compatibility)
    if (!tokens.savedAt) return true;

    const now = Date.now();
    // expires_in is in seconds, convert to milliseconds
    const expiresAt = tokens.savedAt + tokens.expires_in * 1000;

    // Return true if token has more than 5 minutes until expiry
    return expiresAt - now > 5 * 60 * 1000;
  }
}
