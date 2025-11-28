import { DEFAULT_AI_MODEL_ID, SUPPORTED_AI_MODELS } from "@cerocode/constants";
import { useChat } from "@tui/hooks/use-chat";
import { useTheme } from "@tui/hooks/use-theme";
import { useUI } from "@tui/hooks/use-ui";
import { useCallback } from "react";
import { ModelSelector } from "./model-selector";

export function ChatInput() {
  const {
    selectedModel,
    modelSelectorOpen,
    inputFocused,
    isInputDisabled,
    toggleModelSelector,
  } = useUI();
  const { sendMessage } = useChat();
  const { colors } = useTheme();

  const currentModel =
    SUPPORTED_AI_MODELS.find((m) => m.id === selectedModel) ??
    SUPPORTED_AI_MODELS.find((m) => m.id === DEFAULT_AI_MODEL_ID);

  const handleSubmit = useCallback(
    (value: string) => {
      const trimmed = value.trim().toLowerCase();

      // Check for /m command to open model selector
      if (trimmed === "/m") {
        toggleModelSelector();
        return;
      }

      if (!isInputDisabled && value.trim()) {
        sendMessage(value, selectedModel);
      }
    },
    [isInputDisabled, sendMessage, selectedModel, toggleModelSelector]
  );

  return (
    <box
      style={{
        flexDirection: "column",
        backgroundColor: colors.bg2,
        flexShrink: 0,
      }}
    >
      {/* Model selector dropdown */}
      {modelSelectorOpen && <ModelSelector />}

      {/* Model info row */}
      <box style={{ paddingLeft: 1, paddingRight: 1, flexDirection: "row" }}>
        <text fg={colors.fg5}>⚡</text>
        <text fg={colors.primary}> {currentModel?.name}</text>
        <text fg={colors.border1}> • </text>
        <text fg={colors.fg5}>type </text>
        <text fg={colors.accent}>/m</text>
        <text fg={colors.fg5}> + Enter to change model</text>
        {isInputDisabled && (
          <>
            <text fg={colors.border1}> • </text>
            <text fg={colors.warning}>⏳ Generating...</text>
          </>
        )}
      </box>

      {/* Input field */}
      <box
        style={{
          minHeight: 3,
          marginLeft: 1,
          marginRight: 1,
          marginBottom: 1,
          border: true,
          borderStyle: inputFocused && !isInputDisabled ? "double" : "single",
          borderColor: isInputDisabled
            ? colors.border1
            : inputFocused
              ? colors.border3
              : colors.border1,
          backgroundColor: isInputDisabled ? colors.bg1 : colors.bg3,
          maxHeight: 10,
        }}
      >
        <input
          placeholder={
            isInputDisabled
              ? "Waiting for response..."
              : "Type a message… (Enter to send, /m for models)"
          }
          focused={inputFocused && !isInputDisabled && !modelSelectorOpen}
          onSubmit={handleSubmit}
        />
      </box>
    </box>
  );
}
