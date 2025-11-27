import { useUI } from "@tui/hooks/use-ui";
import { theme } from "../theme";
import { ChatInput } from "./chat-input";
import { MessageList } from "./message-list";

export function ChatArea() {
  const { layout } = useUI();

  return (
    <box
      style={{
        width: layout.chatWidth,
        height: layout.height,
        backgroundColor: theme.chatArea.bg,
        flexDirection: "column",
        border: true,
        borderStyle: "rounded",
        borderColor: theme.chatArea.borderColor,
      }}
    >
      <MessageList />

      {/* Divider */}
      <box style={{ height: 1, backgroundColor: theme.chatArea.divider }} />

      <ChatInput />
    </box>
  );
}
