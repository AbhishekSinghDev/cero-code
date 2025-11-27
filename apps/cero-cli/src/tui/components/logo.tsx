import { colors, theme } from "../theme";

export const LOGO_LINES = [
  "┏━╸┏━╸┏━┓┏━┓┏━╸┏━┓╺┳┓┏━╸",
  "┃  ┣╸ ┣┳┛┃ ┃┃  ┃ ┃ ┃┃┣╸",
  "┗━╸┗━╸╹┗╸┗━┛┗━╸┗━┛╺┻┛┗━╸",
];

export const LOGO_MINI = ["CEROCODE"];

export const LOGO_INLINE = "CEROCODE";

export function Logo({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <box style={{ height: 1 }}>
        <text fg={theme.logo.text}>
          <strong>CERO</strong>
        </text>
        <text fg={theme.logo.accent}>CODE</text>
      </box>
    );
  }

  return (
    <box style={{ flexDirection: "column", minHeight: 3 }}>
      <text fg={colors.primary}>
        <strong>{LOGO_LINES.join("\n")}</strong>
      </text>
    </box>
  );
}
