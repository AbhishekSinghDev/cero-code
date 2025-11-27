export const colors = {
  // Brand colors - Terminal Matrix Style
  primary: "#00ff41", // Terminal green (vibrant)
  primaryMuted: "#5eb88d", // Softer green for less emphasis
  secondary: "#00d4ff", // Terminal cyan
  accent: "#a855f7", // Purple accent
  amber: "#ffb700", // Amber for warnings

  // Status colors
  success: "#00ff41",
  warning: "#ffb700",
  error: "#ff3366",
  info: "#00d4ff",

  // Deep Space Background colors (purple-blue undertone)
  bg: {
    primary: "#0f0f14", // Deep space (oklch 0.06 0.015 280 equivalent)
    secondary: "#14141b", // Slightly elevated
    tertiary: "#1a1a24", // Input fields, panels
    elevated: "#1e1e2a", // Cards, elevated surfaces
    disabled: "#0a0a0e", // Disabled state
  },

  // Surface colors (for interactive elements)
  surface: {
    selected: "#1a2f1a", // Selected with green tint
    selectedAlt: "#162016", // Alternative selected
    focused: "#1a1a2a", // Focused with purple tint
    hover: "#18181f", // Hover state
    glass: "rgba(255, 255, 255, 0.02)", // Glass effect
    glassHover: "rgba(255, 255, 255, 0.05)",
  },

  // Border colors - Glass-like
  border: {
    primary: "rgba(255, 255, 255, 0.08)", // Main borders
    secondary: "rgba(255, 255, 255, 0.05)", // Subtle borders
    muted: "rgba(255, 255, 255, 0.12)", // Muted borders
    focused: "#00ff41", // Focused input border (green glow)
    selected: "#00ff41", // Selected item border
    focusedAlt: "#00d4ff", // Alternative focus (cyan)
  },

  // Text colors - Cool off-whites
  text: {
    primary: "#e8e8f0", // Primary text (cool off-white)
    secondary: "#c0c0cc", // Secondary text
    muted: "#8888a0", // Muted/dimmed text
    subtle: "#6666780", // Very subtle text
    disabled: "#555566", // Disabled text
    veryMuted: "#444455", // Very muted (timestamps, hints)
    placeholder: "#555566", // Placeholder text
  },

  // Semantic text colors
  textSemantic: {
    user: "#00ff41", // User messages (terminal green)
    assistant: "#8888a0", // Assistant messages
    streaming: "#00d4ff", // Streaming indicator (cyan)
    connected: "#00ff41", // Connected status
  },

  // Glow colors (for special effects)
  glow: {
    green: "rgba(0, 255, 65, 0.3)",
    cyan: "rgba(0, 212, 255, 0.3)",
    purple: "rgba(168, 85, 247, 0.3)",
    amber: "rgba(255, 183, 0, 0.3)",
  },
} as const;

export const theme = {
  // App container
  app: {
    bg: colors.bg.primary,
  },

  // Sidebar
  sidebar: {
    bg: colors.bg.secondary,
    borderColor: colors.border.secondary,
    dividerColor: colors.border.secondary,
    logo: {
      primary: colors.primary,
      secondary: colors.text.primary,
    },
    newChatButton: {
      bg: colors.primary,
      text: colors.bg.primary,
    },
    sectionHeader: {
      text: colors.text.disabled,
      hint: colors.text.veryMuted,
    },
  },

  // Chat list
  chatList: {
    scrollbar: {
      track: colors.bg.tertiary,
      thumb: colors.primaryMuted,
    },
    item: {
      bg: "transparent",
      selectedBg: colors.surface.selected,
      focusedBg: colors.surface.focused,
      collapsedSelectedBg: colors.surface.selectedAlt,
      collapsedFocusedBg: colors.surface.hover,
      borderSelected: colors.border.selected,
      borderFocused: colors.border.focusedAlt,
      text: colors.text.secondary,
      selectedText: colors.primary,
      focusedText: colors.secondary,
      title: colors.text.primary,
      timestamp: colors.text.veryMuted,
      preview: colors.text.disabled,
      indicator: {
        selected: colors.primary,
        focused: colors.secondary,
        default: colors.text.secondary,
      },
    },
    loading: colors.text.subtle,
    empty: colors.text.disabled,
  },

  // Chat area
  chatArea: {
    bg: colors.bg.primary,
    borderColor: colors.border.primary,
    header: {
      bg: colors.bg.secondary,
      icon: colors.primary,
      title: colors.text.primary,
      status: colors.primary,
    },
    divider: colors.border.secondary,
    scrollbar: {
      track: colors.bg.tertiary,
      thumb: colors.primaryMuted,
    },
  },

  // Messages
  message: {
    user: {
      bg: colors.surface.selected,
      borderColor: colors.primary,
      name: colors.primary,
    },
    assistant: {
      bg: colors.bg.elevated,
      borderColor: colors.border.muted,
      borderColorStreaming: colors.secondary,
      name: colors.text.muted,
    },
    timestamp: colors.text.veryMuted,
    content: colors.text.primary,
    streaming: colors.secondary,
  },

  // Loading indicator
  loading: {
    bg: colors.bg.elevated,
    borderColor: colors.secondary,
    name: colors.text.muted,
    status: colors.secondary,
    text: colors.text.subtle,
  },

  // Chat input
  input: {
    bg: colors.bg.secondary,
    fieldBg: colors.bg.tertiary,
    fieldBgDisabled: colors.bg.disabled,
    borderColor: colors.border.primary,
    borderColorFocused: colors.primary,
    borderColorDisabled: colors.border.muted,
    model: {
      icon: colors.text.veryMuted,
      name: colors.primary,
      separator: colors.border.muted,
      hint: colors.text.veryMuted,
      generating: colors.amber,
    },
  },

  // Model selector
  modelSelector: {
    bg: colors.bg.secondary,
    borderColor: colors.border.muted,
    header: colors.text.subtle,
    number: colors.text.veryMuted,
    bullet: {
      selected: colors.primary,
      default: colors.text.muted,
    },
    name: {
      selected: colors.primary,
      default: colors.text.primary,
    },
    provider: colors.text.veryMuted,
  },

  // User info
  userInfo: {
    indicator: {
      authenticated: colors.success,
      unauthenticated: colors.error,
      loading: colors.amber,
    },
    name: colors.text.primary,
    email: colors.text.disabled,
    error: colors.error,
    loading: colors.text.subtle,
    hint: colors.text.disabled,
  },

  // Commands display
  commands: {
    divider: colors.text.veryMuted,
    key: colors.text.disabled,
    description: colors.text.veryMuted,
    sectionHeader: colors.text.veryMuted,
    keyHighlight: colors.primary,
    keyDescription: colors.text.muted,
    welcome: colors.text.subtle,
    box: {
      bg: colors.bg.secondary,
      border: colors.border.primary,
      header: colors.text.muted,
    },
  },

  // Logo
  logo: {
    icon: colors.primary,
    text: colors.text.primary,
    accent: colors.primary,
    subtitle: colors.text.disabled,
  },

  // Status screens (loading, unauthenticated)
  status: {
    loading: colors.primary,
    warning: colors.amber,
    error: colors.error,
    hint: colors.text.muted,
    subtle: colors.text.disabled,
  },
} as const;
