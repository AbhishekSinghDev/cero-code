import { useContext } from "react";
import {
  ConversationsContext,
  type ConversationsContextValue,
} from "../context/conversations-context";

export function useConversations(): ConversationsContextValue {
  const context = useContext(ConversationsContext);

  if (!context) {
    throw new Error("useConversations must be used within a ConversationsProvider");
  }

  return context;
}
