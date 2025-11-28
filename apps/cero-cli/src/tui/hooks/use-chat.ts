import { useContext } from "react";
import type { ChatContextValue } from "types/tui.type";
import { ChatContext } from "../context/chat-context";

export function useChat(): ChatContextValue {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return context;
}
