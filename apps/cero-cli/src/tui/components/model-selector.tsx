import { SUPPORTED_AI_MODELS } from "@cerocode/constants";
import { useKeyboard } from "@opentui/react";
import { useTheme } from "@tui/hooks/use-theme";
import { useUI } from "@tui/hooks/use-ui";
import { useCallback, useMemo, useState } from "react";

export function ModelSelector() {
  const { selectedModel, setSelectedModel, toggleModelSelector } = useUI();
  const { colors } = useTheme();

  // Find current model index
  const currentIndex = useMemo(
    () => SUPPORTED_AI_MODELS.findIndex((m) => m.id === selectedModel),
    [selectedModel]
  );

  const [focusedIndex, setFocusedIndex] = useState(Math.max(0, currentIndex));

  const handleSelect = useCallback(
    (index: number) => {
      const model = SUPPORTED_AI_MODELS[index];
      if (model) {
        setSelectedModel(model.id);
      }
    },
    [setSelectedModel]
  );

  // Handle keyboard navigation within the selector
  useKeyboard((key) => {
    // Close on escape
    if (key.name === "escape") {
      toggleModelSelector();
      return;
    }

    // Navigate up
    if (key.name === "up" || key.name === "k") {
      setFocusedIndex((prev) => Math.max(0, prev - 1));
      return;
    }

    // Navigate down
    if (key.name === "down" || key.name === "j") {
      setFocusedIndex((prev) => Math.min(SUPPORTED_AI_MODELS.length - 1, prev + 1));
      return;
    }

    // Select on enter
    if (key.name === "return") {
      handleSelect(focusedIndex);
      return;
    }

    // Quick select by number (1-9, 0 for 10)
    if (key.name && /^[0-9]$/.test(key.name)) {
      const num = key.name === "0" ? 10 : Number.parseInt(key.name, 10);
      const idx = num - 1;
      if (idx >= 0 && idx < SUPPORTED_AI_MODELS.length) {
        handleSelect(idx);
      }
      return;
    }
  });

  // Calculate visible items (show max 8 with scroll)
  const maxVisible = 10;
  const totalItems = SUPPORTED_AI_MODELS.length;
  const scrollOffset = Math.max(
    0,
    Math.min(focusedIndex - Math.floor(maxVisible / 2), totalItems - maxVisible)
  );
  const visibleItems = SUPPORTED_AI_MODELS.slice(scrollOffset, scrollOffset + maxVisible);

  return (
    <box
      style={{
        flexDirection: "column",
        border: true,
        borderStyle: "rounded",
        borderColor: colors.primary,
        marginLeft: 1,
        marginRight: 1,
        marginBottom: 1,
        padding: 1,
        flexGrow: 1,
      }}
    >
      {/* Header */}
      <box style={{ flexDirection: "row", marginBottom: 1 }}>
        <text fg={colors.primary}>⚡ </text>
        <text fg={colors.fg1}>
          <strong>Select AI Model</strong>
        </text>
        <text fg={colors.fg4}> • ↑↓/jk navigate • Enter select • Esc close</text>
      </box>

      {/* Model list */}
      {visibleItems.map((model, idx) => {
        const actualIndex = scrollOffset + idx;
        const isSelected = model.id === selectedModel;
        const isFocused = actualIndex === focusedIndex;
        const displayNum = actualIndex + 1;

        return (
          <box
            key={model.id}
            style={{
              flexDirection: "row",
              paddingLeft: 1,
              paddingRight: 1,
            }}
          >
            {/* Number shortcut */}
            <text fg={colors.fg5}>{displayNum <= 10 ? `${displayNum % 10}. ` : "   "}</text>

            {/* Selection indicator */}
            <text fg={isSelected ? colors.success : colors.fg5}>
              {isSelected ? "● " : "○ "}
            </text>

            {/* Model name */}
            <text fg={isFocused ? colors.warning : isSelected ? colors.fg1 : colors.fg2}>
              {isFocused ? <strong>{model.name}</strong> : model.name}
            </text>

            {/* Description */}
            <text fg={colors.fg4}> - {model.description}</text>

            {/* Provider badge */}
            <text fg={colors.accent}> [{model.provider}]</text>
          </box>
        );
      })}

      {/* Footer hint */}
      <box style={{ flexDirection: "row", marginTop: 1, paddingLeft: 1 }}>
        <text fg={colors.fg5}>Press 1-9,0 for quick select • Current: </text>
        <text fg={colors.success}>{SUPPORTED_AI_MODELS[currentIndex]?.name || "None"}</text>
      </box>
    </box>
  );
}
