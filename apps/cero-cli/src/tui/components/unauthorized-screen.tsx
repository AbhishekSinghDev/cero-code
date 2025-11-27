import { useUI } from "@tui/hooks/use-ui";
import { theme } from "@tui/theme";

export function UnauthorizedScreen() {
  const { layout } = useUI();

  return (
    <box
      style={{
        width: layout.width,
        height: layout.height,
        backgroundColor: theme.app.bg,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <text fg={theme.status.warning}>⚠ Not Authenticated</text>
      <text fg={theme.status.hint}>Run 'cero login' in your terminal first</text>
      <text fg={theme.status.subtle}>[ESC to exit]</text>
    </box>
  );
}
