import { useChat } from "@tui/hooks/use-chat";
import { useUI } from "@tui/hooks/use-ui";
import { AI_MODELS } from "../context/ui-context";
import { theme } from "../theme";

function ModelSelector() {
  const { selectedModel } = useUI();

  return (
    <box
      style={{
        flexDirection: "column",
        backgroundColor: theme.modelSelector.bg,
        border: true,
        borderStyle: "rounded",
        borderColor: theme.modelSelector.borderColor,
        marginLeft: 1,
        marginRight: 1,
      }}
    >
      <box style={{ paddingLeft: 1 }}>
        <text fg={theme.modelSelector.header}>Select Model (1-5):</text>
      </box>
      {AI_MODELS.map((model, idx) => {
        const isSelected = model.id === selectedModel;
        return (
          <box key={model.id} style={{ paddingLeft: 1, flexDirection: "row" }}>
            <text fg={theme.modelSelector.number}>{idx + 1}. </text>
            <text
              fg={
                isSelected
                  ? theme.modelSelector.bullet.selected
                  : theme.modelSelector.bullet.default
              }
            >
              {isSelected ? "● " : "○ "}
            </text>
            <text
              fg={
                isSelected
                  ? theme.modelSelector.name.selected
                  : theme.modelSelector.name.default
              }
            >
              {model.name}
            </text>
            <text fg={theme.modelSelector.provider}> [{model.provider}]</text>
          </box>
        );
      })}
    </box>
  );
}

export function ChatInput() {
  const { selectedModel, modelSelectorOpen, inputFocused, isInputDisabled } = useUI();
  const { sendMessage } = useChat();

  const currentModel = AI_MODELS.find((m) => m.id === selectedModel) ?? AI_MODELS[0];

  const handleSubmit = (value: string) => {
    if (!isInputDisabled && value.trim()) {
      sendMessage(value);
    }
  };

  return (
    <box
      style={{
        flexDirection: "column",
        backgroundColor: theme.input.bg,
      }}
    >
      {/* Model selector dropdown */}
      {modelSelectorOpen && <ModelSelector />}

      {/* Model info row */}
      <box style={{ paddingLeft: 1, paddingRight: 1, flexDirection: "row" }}>
        <text fg={theme.input.model.icon}>⚡</text>
        <text fg={theme.input.model.name}> {currentModel?.name}</text>
        <text fg={theme.input.model.separator}> • </text>
        <text fg={theme.input.model.hint}>[m] change model</text>
        {isInputDisabled && (
          <>
            <text fg={theme.input.model.separator}> • </text>
            <text fg={theme.input.model.generating}>⏳ Generating...</text>
          </>
        )}
      </box>

      {/* Input field */}
      <box
        style={{
          height: 3,
          marginLeft: 1,
          marginRight: 1,
          marginBottom: 1,
          border: true,
          borderStyle: inputFocused && !isInputDisabled ? "double" : "single",
          borderColor: isInputDisabled
            ? theme.input.borderColorDisabled
            : inputFocused
              ? theme.input.borderColorFocused
              : theme.input.borderColor,
          backgroundColor: isInputDisabled ? theme.input.fieldBgDisabled : theme.input.fieldBg,
        }}
      >
        <input
          placeholder={
            isInputDisabled ? "Waiting for response..." : "Type a message… (Enter to send)"
          }
          focused={inputFocused && !isInputDisabled}
          onSubmit={handleSubmit}
        />
      </box>
    </box>
  );
}
