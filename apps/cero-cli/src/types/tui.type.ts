import type { User } from "./user.type";

export interface Command {
  key: string;
  description: string;
  context?: "global" | "sidebar" | "chat";
}

export type FocusMode = "sidebar" | "chat";

export interface UIState {
  sidebarCollapsed: boolean;
  focusedChatIndex: number;
  inputFocused: boolean;
  selectedModel: string;
  modelSelectorOpen: boolean;
  focusMode: FocusMode;
}

export interface LayoutDimensions {
  width: number;
  height: number;
  sidebarWidth: number;
  chatWidth: number;
}

export interface UIActions {
  toggleSidebar: () => void;
  toggleModelSelector: () => void;
  setSelectedModel: (modelId: string) => void;
  setFocusMode: (mode: FocusMode) => void;
  setInputFocused: (focused: boolean) => void;
  setFocusedChatIndex: (index: number | ((prev: number) => number)) => void;
  focusChat: () => void;
  focusSidebar: () => void;
  resetForNewChat: () => void;
}

export interface UIContextValue extends UIState, UIActions {
  layout: LayoutDimensions;
  isInputDisabled: boolean;
}

export interface ChatState {
  messages: ApiMessage[];
  messagesLoading: boolean;
  isSending: boolean;
  isStreaming: boolean;
  error: string | null;
}

export interface ActiveChat {
  conversationId: string | null;
  conversation: Conversation | null;
}

export interface ChatContextValue {
  // State
  messages: ApiMessage[];
  messagesLoading: boolean;
  isSending: boolean;
  isStreaming: boolean;
  error: string | null;

  // Active chat info
  activeConversationId: string | null;
  activeConversation: Conversation | null;
  chatTitle: string;
  isNewChat: boolean;
  isLoading: boolean;

  // Actions
  openChat: (conversation: Conversation) => Promise<void>;
  startNewChat: () => void;
  sendMessage: (content: string) => Promise<{ conversationId: string | null }>;
  clearError: () => void;
}

export interface ConversationsState {
  conversations: Conversation[];
  isLoading: boolean;
  error: string | null;
}

export interface ConversationsContextValue {
  // State
  conversations: Conversation[];
  isLoading: boolean;
  error: string | null;

  // Actions
  refresh: () => Promise<void>;
  getConversation: (id: string) => Conversation | undefined;
}

export interface Conversation {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  userId: string;
  shortTitle: string | null;
}

export interface ApiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ConversationsResponse {
  conversations: Conversation[];
}

export interface MessagesResponse {
  conversation: Conversation;
  messages: ApiMessage[];
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface AuthContextValue extends AuthState, AuthActions {}

export interface AuthActions {
  getToken: () => Promise<string | null>;
  refresh: () => Promise<void>;
}

export interface ConversationState {
  // Conversations list
  conversations: Conversation[];
  conversationsLoading: boolean;
  conversationsError: string | null;

  // Current chat
  messages: Message[];
  currentConversationId: string | null;
  messagesLoading: boolean;

  // Chat operations state
  isSending: boolean;
  isStreaming: boolean;
  chatError: string | null;
}

export interface ConversationActions {
  selectConversation: (id: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  startNewChat: () => void;
  refreshConversations: () => Promise<void>;
}

export interface ConversationContextValue extends ConversationState, ConversationActions {
  // Computed values
  currentConversation: ChatSession | null;
  chatTitle: string;
  isNewChat: boolean;
  isLoading: boolean;
}
