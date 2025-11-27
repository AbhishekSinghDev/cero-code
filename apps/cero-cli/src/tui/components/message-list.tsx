import { useChat } from "@tui/hooks/use-chat";
import type { ApiMessage } from "types/tui.type";
import { theme } from "../theme";
import { CommandsDisplay } from "./commands";

interface MessageBubbleProps {
  message: ApiMessage;
  isStreaming: boolean;
}

function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isEmpty = !message.content || message.content.length === 0;

  return (
    <box
      style={{
        marginLeft: isUser ? 4 : 0,
        marginRight: isUser ? 0 : 4,
        paddingLeft: 2,
        paddingRight: 2,
        borderColor: isUser
          ? theme.message.user.borderColor
          : isStreaming
            ? theme.message.assistant.borderColorStreaming
            : theme.message.assistant.borderColor,
        borderStyle: "rounded",
        border: true,
      }}
    >
      <box style={{ flexDirection: "column" }}>
        {/* Header */}
        <box style={{ flexDirection: "row" }}>
          <text fg={isUser ? theme.message.user.name : theme.message.assistant.name}>
            <strong>{isUser ? "You" : "◆ Cero"}</strong>
          </text>
          <text fg={theme.message.timestamp}> · {message.timestamp}</text>
          {isStreaming && <text fg={theme.message.streaming}> ● streaming</text>}
        </box>
        {/* Content */}
        {!isEmpty && <text fg={theme.message.content}>{message.content}</text>}
      </box>
    </box>
  );
}

function LoadingIndicator() {
  return (
    <box
      style={{
        marginLeft: 0,
        marginRight: 2,
        marginBottom: 1,
        paddingLeft: 1,
        paddingRight: 1,
        backgroundColor: theme.loading.bg,
        borderColor: theme.loading.borderColor,
        borderStyle: "rounded",
        border: true,
      }}
    >
      <box style={{ flexDirection: "column" }}>
        <box style={{ flexDirection: "row" }}>
          <text fg={theme.loading.name}>
            <strong>◆ Cero</strong>
          </text>
          <text fg={theme.loading.status}> ● thinking...</text>
        </box>
        <text fg={theme.loading.text}>Processing your request...</text>
      </box>
    </box>
  );
}

export function MessageList() {
  const { messages, chatTitle, isNewChat, isLoading, isStreaming } = useChat();

  const showCommands = isNewChat && messages.length === 0;

  return (
    <box style={{ flexDirection: "column", flexGrow: 1 }}>
      {/* Chat Header */}
      <box
        style={{
          paddingLeft: 1,
          paddingRight: 1,
          backgroundColor: theme.chatArea.header.bg,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <text fg={theme.chatArea.header.icon}>
          <strong>◆</strong>
        </text>
        <text fg={theme.chatArea.header.title}>
          {" "}
          <strong>{chatTitle}</strong>
        </text>
        <text fg={theme.chatArea.header.status}> [Connected]</text>
      </box>

      {/* Divider */}
      <box style={{ height: 1, backgroundColor: theme.chatArea.divider }} />

      {/* Messages or Commands */}
      {showCommands ? (
        <CommandsDisplay showFull />
      ) : (
        <scrollbox
          stickyScroll
          stickyStart="bottom"
          style={{
            flexGrow: 1,
            rootOptions: { backgroundColor: theme.chatArea.bg },
            wrapperOptions: { backgroundColor: theme.chatArea.bg },
            viewportOptions: { backgroundColor: theme.chatArea.bg },
            contentOptions: { backgroundColor: theme.chatArea.bg, paddingTop: 1 },
            scrollbarOptions: {
              showArrows: false,
              trackOptions: {
                foregroundColor: theme.chatArea.scrollbar.thumb,
                backgroundColor: theme.chatArea.scrollbar.track,
              },
            },
          }}
        >
          {messages.map((msg, idx) => {
            const isLastAssistant =
              msg.role === "assistant" && idx === messages.length - 1 && isStreaming;

            return <MessageBubble key={msg.id} message={msg} isStreaming={isLastAssistant} />;
          })}
          {isLoading && <LoadingIndicator />}
        </scrollbox>
      )}
    </box>
  );
}
