import { useTheme } from "@tui/hooks/use-theme";

export function LoadingIndicator() {
  const { colors } = useTheme();

  return (
    <box
      style={{
        marginLeft: 1,
        marginRight: 8,
        marginBottom: 1,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 1,
        paddingBottom: 1,
        backgroundColor: colors.bg2,
        borderColor: colors.secondary,
        borderStyle: "rounded",
        border: true,
      }}
    >
      <box style={{ flexDirection: "column" }}>
        <box style={{ flexDirection: "row", marginBottom: 1 }}>
          <text fg={colors.accent}>🤖 </text>
          <text fg={colors.fg2}>
            <strong>Cero</strong>
          </text>
          <text fg={colors.fg5}> · </text>
          <text fg={colors.secondary}>
            <strong>⏳ thinking</strong>
          </text>
        </box>
        <text fg={colors.border1}>────────────────────────────────────────</text>
        <box style={{ marginTop: 1, flexDirection: "row" }}>
          <text fg={colors.fg4}>Processing your request </text>
          <text fg={colors.secondary}>◐ ◓ ◑ ◒</text>
        </box>
      </box>
    </box>
  );
}
