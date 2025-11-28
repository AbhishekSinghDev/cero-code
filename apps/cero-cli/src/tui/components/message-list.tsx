import { useChat } from "@tui/hooks/use-chat";
import { useTheme } from "@tui/hooks/use-theme";
import { useUI } from "@tui/hooks/use-ui";
import type { ApiMessage } from "types/tui.type";
import { CommandsDisplay } from "./commands";
import { LoadingIndicator } from "./loading-indicator";
import { MessageBubble } from "./message-bubble";

export function MessageList() {
  const { messages, chatTitle, isNewChat, isLoading, isStreaming } = useChat();
  const { colors } = useTheme();
  const { focusMode, selectedModel } = useUI();

  const showCommands = isNewChat && messages.length === 0;

  return (
    <box style={{ flexDirection: "column", flexGrow: 1, flexShrink: 1, overflow: "hidden" }}>
      {/* Chat Header */}
      <box
        style={{
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: 1,
          paddingBottom: 1,
          backgroundColor: colors.bg2,
          flexDirection: "row",
          justifyContent: "space-between",
          borderColor: colors.border1,
          borderStyle: "single",
          flexShrink: 0,
        }}
      >
        {/* Chat title */}
        <box style={{ flexDirection: "row", flexGrow: 1 }}>
          <text fg={colors.accent}>💬 </text>
          <text fg={colors.fg1}>
            <strong>{chatTitle}</strong>
          </text>
        </box>

        {/* Status indicators */}
        <box style={{ flexDirection: "row" }}>
          <text fg={colors.fg5}>│ </text>
          <text fg={colors.fg4}>Focus: </text>
          <text fg={focusMode === "chat" ? colors.success : colors.fg3}>
            <strong>{focusMode}</strong>
          </text>
          <text fg={colors.fg5}> │ </text>
          <text fg={colors.fg4}>Model: </text>
          <text fg={colors.primary}>
            <strong>{selectedModel}</strong>
          </text>
        </box>
      </box>

      {/* Messages or Commands */}
      {showCommands ? (
        <CommandsDisplay showFull />
      ) : (
        <scrollbox
          stickyScroll
          stickyStart="bottom"
          style={{
            flexGrow: 1,
            flexShrink: 1,
            overflow: "hidden",
            rootOptions: { backgroundColor: colors.bg1 },
            wrapperOptions: { backgroundColor: colors.bg1 },
            viewportOptions: { backgroundColor: colors.bg1 },
            contentOptions: { backgroundColor: colors.bg1, paddingTop: 1, paddingBottom: 1 },
            scrollbarOptions: {
              showArrows: true,
              trackOptions: {
                foregroundColor: colors.primaryMuted,
                backgroundColor: colors.bg3,
              },
            },
          }}
        >
          {messages.map((msg: ApiMessage, idx: number) => {
            const isLastAssistant =
              msg.role === "assistant" && idx === messages.length - 1 && isStreaming;

            return (
              <MessageBubble
                key={msg.id}
                message={msg}
                isStreaming={isLastAssistant}
                colors={colors}
              />
            );
          })}
          {isLoading && <LoadingIndicator />}
        </scrollbox>
      )}
    </box>
  );
}
