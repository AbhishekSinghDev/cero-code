import type { ContentBlock } from "@tui/helpers/markdown";
import type { createSyntaxStyle } from "@tui/theme";
import type { ThemeColors } from "types/tui.type";

interface CodeBlockProps {
  block: ContentBlock & { type: "code" };
  colors: ThemeColors;
  syntaxStyle: ReturnType<typeof createSyntaxStyle>;
}

export function CodeBlock({ block, colors, syntaxStyle }: CodeBlockProps) {
  return (
    <box
      style={{
        marginTop: 1,
        marginBottom: 1,
        border: true,
        borderStyle: "rounded",
        borderColor: colors.border3,
        backgroundColor: colors.bg4,
      }}
    >
      {/* Language label */}
      <box
        style={{
          paddingLeft: 1,
          paddingRight: 1,
          backgroundColor: colors.bg3,
          flexDirection: "row",
        }}
      >
        <text fg={colors.fg3}>
          <strong>{block.language || "code"}</strong>
        </text>
      </box>
      {/* Code content with syntax highlighting */}
      {block.filetype ? (
        <code content={block.content} filetype={block.filetype} syntaxStyle={syntaxStyle} />
      ) : (
        <box style={{ paddingLeft: 1, paddingRight: 1, paddingTop: 1, paddingBottom: 1 }}>
          <text fg={colors.fg2}>{block.content}</text>
        </box>
      )}
    </box>
  );
}
