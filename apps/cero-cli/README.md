<div align="center">

# Cero

**AI-powered terminal assistant that doesn't suck**

[![npm version](https://img.shields.io/npm/v/cerocode.svg)](https://www.npmjs.com/package/cerocode)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[Installation](#installation) • [Usage](#usage) • [Commands](#commands) • [How it Works](#how-it-works)

</div>

---

## What is this?

Cero is a CLI tool that brings AI chat capabilities directly to your terminal. No API keys to manage, no configuration files to mess with, just install, authenticate once, and start chatting.

## Installation

```bash
npm install -g cerocode
```

Or with bun:

```bash
bun add -g cerocode
```

## Quick Start

```bash
# Authenticate via browser (one-time)
cero login

# Quick chat
cero chat "explain what DNS is"

# Launch interactive TUI
cero interactive

# Logout
cero logout
```

## Usage

### Authentication

Device authorization flow (like Netflix TV login). Authenticate once in your browser, credentials stored securely in your system keychain.

```bash
cero login
```

### Quick Chat

```bash
cero chat "your message here"
```

Responses stream back in real-time.

### Interactive Mode

```bash
cero interactive
```

Full-featured terminal UI with:

- **Chat area** — Real-time streaming with markdown rendering
- **Syntax highlighting** — Code blocks with language detection
- **Sidebar** — Conversation history navigation
- **Model selector** — Choose your AI model
- **Tool selector** — Enable/disable AI tools
- **20+ themes** — Cycle through with keyboard shortcuts


#### Available Themes

20 carefully crafted themes:

| Theme | Description |
|-------|-------------|
| Matrix | Classic green-on-black hacker aesthetic |
| Dracula | Popular dark theme with vibrant colors |
| Nord | Arctic, north-bluish palette |
| Monokai Pro | Professional dark theme |
| Catppuccin | Soothing pastel colors |
| Solarized Dark | Precision colors for machines and people |
| Gruvbox | Retro groove color scheme |
| Tokyo Night | Modern Japanese-inspired |
| One Dark Pro | Atom editor classic |
| Cyberpunk | Neon-fueled dystopian vibes |
| Ayu Dark | Subtle and elegant |
| Palenight | Material Design inspired |
| Synthwave | 80s synthwave aesthetic |
| One Light | Light theme alternative |
| GitHub Dark | GitHub's native dark |
| Everforest | Green-focused natural |
| Rosé Pine | Warm aesthetic palette |
| Tokyo Station | Gruvbox with Japanese flair |
| Kanagawa | Japanese-inspired warm colors |
| Oxocarbon | IBM Carbon design system |

## Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `cero login` | | Authenticate via device flow |
| `cero chat <message>` | `c` | Quick chat with AI |
| `cero interactive` | `i` | Launch interactive TUI |
| `cero logout` | | Clear stored credentials |
| `cero --help` | `-h` | Show help |
| `cero --version` | `-v` | Show version |

## How it Works

### Auth Flow

1. Run `cero login`
2. CLI requests device code from server
3. Approve in browser
4. Tokens stored in OS keychain (Keychain/Credential Manager/libsecret)

### Chat Flow

1. Send message via `cero chat` or interactive mode
2. Authenticated request to API
3. AI processes via background job
4. Response streams back via SSE
5. Rendered in real-time with markdown support

## Features

### Live

- **AI Chat** — Streaming responses in your terminal
- **Interactive TUI** — Full chat interface with React-based UI
- **Model Selection** — Choose your preferred AI model
- **Tool Selection** — Choose (Google search, Url inspection, Code execution)
- **Syntax Highlighting** — Code blocks with language detection
- **Markdown Rendering** — Rich text formatting
- **20+ Themes** — Personalize your experience
- **Conversation History** — Browse and continue past chats
- **Secure Auth** — OAuth 2.0 device flow
- **Cross-Platform** — macOS, Windows, Linux

### Coming Soon

- **Offline-First History** — Local + cloud sync
- **Agent Mode** — AI that iterates on tasks and explores your codebase
- **Codebase Context** — Project-aware answers
- **Multi-Model** — GPT, Claude

## Requirements

- Bun 1.0.0+
- A browser for authentication

## Development

```bash
git clone https://github.com/AbhishekSinghDev/cerocode.git
cd cerocode/apps/cero-cli
bun install
bun dev
```

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **CLI**: Commander.js
- **TUI**: OpenTUI (React-based)
- **Auth**: Better Auth + cross-keychain
- **Styling**: Chalk, Figlet, Boxen

## License

MIT © [Abhishek Singh](https://abhisheksingh.me)

---

<div align="center">
Part of the CeroCode ecosystem
</div>
