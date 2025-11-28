import { useAuth } from "@tui/hooks/use-auth";
import { useTheme } from "@tui/hooks/use-theme";

interface UserInfoProps {
  collapsed?: boolean;
}

export function UserInfo({ collapsed }: UserInfoProps) {
  const { user } = useAuth();
  const { colors, currentThemeName } = useTheme();

  if (collapsed) {
    return null;
  }

  return (
    <box
      style={{
        flexDirection: "column",
        border: true,
        borderColor: colors.border1,
        borderStyle: "rounded",
      }}
    >
      <box style={{ flexDirection: "row", alignItems: "center" }}>
        <text fg={colors.success}>
          <strong>{user.name}</strong>
        </text>
      </box>
      <text fg={colors.fg5} style={{ wrapMode: "none" }}>
        <strong>{user.email}</strong>
      </text>
      <text fg={colors.primary}>
        <strong>{currentThemeName}</strong>
      </text>
    </box>
  );
}
