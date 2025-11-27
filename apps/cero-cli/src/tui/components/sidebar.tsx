import { useChat } from "@tui/hooks/use-chat";
import { useUI } from "@tui/hooks/use-ui";
import { colors, theme } from "../theme";
import { ChatList } from "./chat-list";
import { CommandsDisplay } from "./commands";
import { Logo } from "./logo";
import { UserInfo } from "./user-info";

export function Sidebar() {
  const { layout, sidebarCollapsed } = useUI();
  const { messages } = useChat();

  const showCommands = messages.length > 0;

  if (sidebarCollapsed) {
    return (
      <box
        style={{
          width: 0,
          height: layout.height,
          backgroundColor: theme.sidebar.bg,
          flexDirection: "column",
          borderStyle: "rounded",
          borderColor: theme.sidebar.borderColor,
          border: true,
        }}
      >
        <box style={{ paddingLeft: 1 }}>
          <text fg={colors.primary}>◆</text>
        </box>
        <box style={{ height: 1, backgroundColor: theme.sidebar.dividerColor }} />
        <ChatList />
        <box style={{ flexGrow: 1 }} />
        <box style={{ height: 1, backgroundColor: theme.sidebar.dividerColor }} />
        <UserInfo collapsed />
      </box>
    );
  }

  return (
    <box
      style={{
        width: layout.sidebarWidth,
        height: layout.height,
        backgroundColor: theme.sidebar.bg,
        flexDirection: "column",
        borderStyle: "rounded",
        borderColor: theme.sidebar.borderColor,
        border: true,
      }}
    >
      {/* Header with Logo */}
      <box style={{ paddingLeft: 1, paddingRight: 1 }}>
        <Logo compact={layout.sidebarWidth < 28} />
      </box>

      {/* New Chat Button */}
      <box
        style={{
          marginLeft: 1,
          marginRight: 1,
          marginTop: 1,
          marginBottom: 1,
          height: 3,
          backgroundColor: theme.sidebar.newChatButton.bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <text fg={theme.sidebar.newChatButton.text}>
          <strong>+ New Chat</strong>
        </text>
      </box>

      {/* Section Header */}
      <box style={{ paddingLeft: 1, paddingRight: 1, marginBottom: 1, flexDirection: "row" }}>
        <text fg={theme.sidebar.sectionHeader.text}>HISTORY</text>
        <text fg={theme.sidebar.sectionHeader.hint}> [↑↓]</text>
      </box>

      {/* Chat List */}
      <ChatList />

      {/* Commands or User Info */}
      <box style={{ height: 1, backgroundColor: theme.sidebar.dividerColor }} />
      {showCommands ? (
        <CommandsDisplay compact />
      ) : (
        <box style={{ paddingLeft: 1, flexDirection: "row", minHeight: 2 }}>
          <text fg={theme.sidebar.sectionHeader.text}>[n]</text>
          <text fg={theme.sidebar.sectionHeader.hint}> new </text>
          <text fg={theme.sidebar.sectionHeader.text}>[b]</text>
          <text fg={theme.sidebar.sectionHeader.hint}> sidebar</text>
        </box>
      )}

      {/* User Info */}
      <box style={{ height: 1, backgroundColor: theme.sidebar.dividerColor }} />
      <box style={{ minHeight: 3 }}>
        <UserInfo />
      </box>
    </box>
  );
}
