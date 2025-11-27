import { useUI } from "@tui/hooks/use-ui";
import { theme } from "@tui/theme";

export function InitializingScreen() {
  const { layout } = useUI();

  return (
    <box
      style={{
        width: layout.width,
        height: layout.height,
        backgroundColor: theme.app.bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <text fg={theme.status.loading}>◆ Initializing CEROCODE...</text>
    </box>
  );
}
