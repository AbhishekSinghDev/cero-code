import { formatRelativeTime } from "@tui/helpers/utils";
import { useChat } from "@tui/hooks/use-chat";
import { useConversations } from "@tui/hooks/use-conversations";
import { useUI } from "@tui/hooks/use-ui";
import type { Conversation } from "types/tui.type";
import { colors, theme } from "../theme";

// Helper to truncate text with ellipsis
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}

export function ChatList() {
  const { conversations, isLoading: conversationsLoading } = useConversations();
  const { activeConversationId } = useChat();
  const { sidebarCollapsed, focusedChatIndex, layout } = useUI();

  if (sidebarCollapsed) {
    if (conversationsLoading) {
      return (
        <box style={{ flexDirection: "column", flexGrow: 1, paddingLeft: 1 }}>
          <text fg={theme.chatList.loading}>...</text>
        </box>
      );
    }

    if (conversations.length === 0) {
      return (
        <box style={{ flexDirection: "column", flexGrow: 1, paddingLeft: 1 }}>
          <text fg={theme.chatList.empty}>-</text>
        </box>
      );
    }

    return (
      <box style={{ flexDirection: "column", flexGrow: 1 }}>
        {conversations.map((conv: Conversation, idx: number) => (
          <box
            key={conv.id}
            style={{
              paddingLeft: 1,
              paddingRight: 1,
              backgroundColor:
                activeConversationId === conv.id
                  ? colors.surface.selectedAlt
                  : idx === focusedChatIndex
                    ? colors.surface.hover
                    : "transparent",
            }}
          >
            <text
              fg={activeConversationId === conv.id ? colors.primary : theme.chatList.item.text}
            >
              {(conv.shortTitle || "N").charAt(0)}
            </text>
          </box>
        ))}
      </box>
    );
  }

  if (conversationsLoading) {
    return (
      <box style={{ flexGrow: 1, paddingLeft: 1, paddingTop: 1 }}>
        <text fg={theme.chatList.loading}>Loading conversations...</text>
      </box>
    );
  }

  if (conversations.length === 0) {
    return (
      <box style={{ flexGrow: 1, paddingLeft: 1, paddingTop: 1 }}>
        <text fg={theme.chatList.empty}>No conversations yet</text>
      </box>
    );
  }

  return (
    <scrollbox
      style={{
        flexGrow: 1,
        rootOptions: { backgroundColor: theme.sidebar.bg },
        wrapperOptions: { backgroundColor: theme.sidebar.bg },
        viewportOptions: { backgroundColor: theme.sidebar.bg },
        contentOptions: { backgroundColor: theme.sidebar.bg, gap: 1 },
        scrollbarOptions: {
          showArrows: false,
          trackOptions: {
            foregroundColor: theme.chatList.scrollbar.thumb,
            backgroundColor: theme.chatList.scrollbar.track,
          },
        },
      }}
    >
      {conversations.map((conv: Conversation, idx: number) => {
        const isSelected = activeConversationId === conv.id;
        const isFocused = idx === focusedChatIndex;
        const relativeTime = formatRelativeTime(conv.updatedAt);
        // Calculate max title length based on sidebar width (account for padding, indicator, timestamp)
        const maxTitleLength = Math.max(8, layout.sidebarWidth - 14);
        const displayTitle = truncateText(conv.shortTitle || "New Chat", maxTitleLength);

        return (
          <box
            key={conv.id}
            style={{
              paddingLeft: 1,
              paddingRight: 1,
              height: 1,
              backgroundColor: isSelected
                ? colors.surface.selected
                : isFocused
                  ? colors.surface.focused
                  : "transparent",
              borderColor: isSelected
                ? theme.chatList.item.borderSelected
                : isFocused
                  ? theme.chatList.item.borderFocused
                  : "transparent",
              borderStyle: "rounded",
              border: isSelected || isFocused,
            }}
          >
            <box style={{ flexDirection: "row", width: "100%" }}>
              <text
                fg={
                  isSelected
                    ? theme.chatList.item.indicator.selected
                    : isFocused
                      ? theme.chatList.item.indicator.focused
                      : theme.chatList.item.indicator.default
                }
              >
                {isSelected ? "● " : isFocused ? "› " : "  "}
              </text>
              <text
                fg={isSelected ? theme.chatList.item.selectedText : theme.chatList.item.title}
              >
                {displayTitle}
              </text>
              <box style={{ flexGrow: 1 }} />
              <text fg={theme.chatList.item.timestamp}>{relativeTime}</text>
            </box>
          </box>
        );
      })}
    </scrollbox>
  );
}
