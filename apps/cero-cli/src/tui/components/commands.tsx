import type { Command } from "types/tui.type";
import { colors, theme } from "../theme";

export const COMMANDS: Command[] = [
  { key: "n", description: "New chat", context: "global" },
  { key: "Tab", description: "Switch focus", context: "global" },
  { key: "b", description: "Toggle sidebar", context: "sidebar" },
  { key: "↑↓", description: "Navigate history", context: "sidebar" },
  { key: "Enter", description: "Select chat", context: "sidebar" },
  { key: "m", description: "Change model", context: "chat" },
  { key: "1-5", description: "Quick select model", context: "chat" },
  { key: "Esc", description: "Exit / Close", context: "global" },
];

interface CommandsDisplayProps {
  showFull?: boolean;
  compact?: boolean;
}

export function CommandsDisplay({ showFull = false, compact = false }: CommandsDisplayProps) {
  if (compact) {
    return (
      <box style={{ flexDirection: "column", paddingLeft: 1, height: 3 }}>
        <text fg={theme.commands.divider}>─── Keys ───</text>
        <box style={{ flexDirection: "row" }}>
          <text fg={theme.commands.key}>[n]</text>
          <text fg={theme.commands.divider}> new </text>
          <text fg={theme.commands.key}>[b]</text>
          <text fg={theme.commands.divider}> sidebar</text>
        </box>
        <box style={{ flexDirection: "row" }}>
          <text fg={theme.commands.key}>[↑↓]</text>
          <text fg={theme.commands.divider}> nav </text>
          <text fg={theme.commands.key}>[↵]</text>
          <text fg={theme.commands.divider}> select</text>
        </box>
      </box>
    );
  }

  if (showFull) {
    return (
      <box
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        {/* Logo */}
        <box style={{ marginBottom: 1, flexDirection: "column", alignItems: "center" }}>
          <text fg={colors.primary}>
            <strong>CEROCODE</strong>
          </text>
          <text fg={theme.logo.subtitle}>Agentic CLI</text>
        </box>

        {/* Welcome message */}
        <box style={{ marginBottom: 1 }}>
          <text fg={theme.commands.welcome}>Welcome! Start typing or use these commands:</text>
        </box>

        {/* Commands box */}
        <box
          style={{
            flexDirection: "column",
            border: true,
            borderStyle: "rounded",
            borderColor: theme.commands.box.border,
            paddingLeft: 1,
            paddingRight: 1,
            backgroundColor: theme.commands.box.bg,
            width: 40,
          }}
        >
          <text fg={theme.commands.box.header}>
            <strong>⌨ Keyboard Shortcuts</strong>
          </text>

          {/* Global */}
          <text fg={theme.commands.sectionHeader}>── Global ──</text>
          <text>
            <span fg={theme.commands.keyHighlight}>n </span>
            <span fg={theme.commands.keyDescription}>New chat</span>
          </text>
          <text>
            <span fg={theme.commands.keyHighlight}>Tab </span>
            <span fg={theme.commands.keyDescription}>Switch focus</span>
          </text>
          <text>
            <span fg={theme.commands.keyHighlight}>Esc </span>
            <span fg={theme.commands.keyDescription}>Exit / Close</span>
          </text>

          {/* Sidebar */}
          <text fg={theme.commands.sectionHeader}>── Sidebar ──</text>
          <text>
            <span fg={theme.commands.keyHighlight}>b </span>
            <span fg={theme.commands.keyDescription}>Toggle sidebar</span>
          </text>
          <text>
            <span fg={theme.commands.keyHighlight}>↑↓ j/k </span>
            <span fg={theme.commands.keyDescription}>Navigate history</span>
          </text>
          <text>
            <span fg={theme.commands.keyHighlight}>Enter </span>
            <span fg={theme.commands.keyDescription}>Select chat</span>
          </text>

          {/* Chat */}
          <text fg={theme.commands.sectionHeader}>── Chat ──</text>
          <text>
            <span fg={theme.commands.keyHighlight}>m </span>
            <span fg={theme.commands.keyDescription}>Change AI model</span>
          </text>
          <text>
            <span fg={theme.commands.keyHighlight}>1-5 </span>
            <span fg={theme.commands.keyDescription}>Quick model select</span>
          </text>
        </box>

        <box style={{ marginTop: 1, flexDirection: "row" }}>
          <text fg={theme.commands.divider}>Press [</text>
          <text fg={colors.primary}>n</text>
          <text fg={theme.commands.divider}>] to start a new chat</text>
        </box>
      </box>
    );
  }

  return null;
}
