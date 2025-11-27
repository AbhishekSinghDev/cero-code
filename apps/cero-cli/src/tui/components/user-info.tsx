import { useAuth } from "@tui/hooks/use-auth";
import { colors, theme } from "../theme";

interface UserInfoProps {
  collapsed?: boolean;
}

export function UserInfo({ collapsed }: UserInfoProps) {
  const { user, isLoading, isAuthenticated, error } = useAuth();

  if (collapsed) {
    return (
      <box style={{ paddingLeft: 1, paddingRight: 1 }}>
        <text fg={isAuthenticated ? colors.success : colors.error}>●</text>
      </box>
    );
  }

  if (isLoading) {
    return (
      <box
        style={{
          flexDirection: "column",
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <box style={{ flexDirection: "row", alignItems: "center" }}>
          <text fg={theme.userInfo.indicator.loading}>◌ </text>
          <text fg={theme.userInfo.loading}>Loading...</text>
        </box>
      </box>
    );
  }

  if (error) {
    return (
      <box
        style={{
          flexDirection: "column",
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <box style={{ flexDirection: "row", alignItems: "center" }}>
          <text fg={theme.userInfo.error}>● </text>
          <text fg={theme.userInfo.error}>Error</text>
        </box>
        <text fg={theme.userInfo.hint}>
          {error.length > 20 ? `${error.slice(0, 20)}...` : error}
        </text>
      </box>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <box
        style={{
          flexDirection: "column",
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <box style={{ flexDirection: "row", alignItems: "center" }}>
          <text fg={theme.userInfo.indicator.unauthenticated}>● </text>
          <text fg={theme.userInfo.loading}>Not logged in</text>
        </box>
        <text fg={theme.userInfo.hint}>Run 'cero login'</text>
      </box>
    );
  }

  return (
    <box
      style={{
        flexDirection: "column",
        paddingLeft: 1,
        paddingRight: 1,
      }}
    >
      <box style={{ flexDirection: "row", alignItems: "center" }}>
        <text fg={theme.userInfo.indicator.authenticated}>● </text>
        <text fg={theme.userInfo.name}>
          <strong>{user.name}</strong>
        </text>
      </box>
      <text fg={theme.userInfo.email}>{user.email}</text>
    </box>
  );
}
