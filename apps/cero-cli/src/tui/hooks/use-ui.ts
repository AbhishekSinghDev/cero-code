import { UIContext } from "@tui/context/ui-context";
import { useContext } from "react";
import type { UIContextValue } from "types/tui.type";

export function useUI(): UIContextValue {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }

  return context;
}
