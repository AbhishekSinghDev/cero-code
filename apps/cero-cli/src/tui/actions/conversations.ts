import { ChatService } from "@core/chat/chat.service";
import type { ConversationsResponse, MessagesResponse } from "../../types/tui.type";

const chatService = new ChatService();

export async function fetchConversationsList(token: string): Promise<ConversationsResponse> {
  return await chatService.getConversations(token);
}

export async function fetchConversationMessages(
  token: string,
  conversationId: string
): Promise<MessagesResponse> {
  return await chatService.getMessages(token, conversationId);
}

export async function sendChatMessage(
  content: string,
  token: string,
  conversationId: string | undefined,
  onToken: (tokenText: string) => void,
  onInit: (conversationId: string) => void
) {
  return await chatService.run(content, token, conversationId, onToken, onInit);
}
