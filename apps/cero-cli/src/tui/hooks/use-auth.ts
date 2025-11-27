import { AuthContext } from "@tui/context/auth-context";
import { useContext } from "react";
import type { AuthContextValue } from "types/tui.type";

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
