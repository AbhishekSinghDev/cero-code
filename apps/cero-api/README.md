<div align="center">

# Cero API

**The backend powering Cero CLI and Web**

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

## What is this?

Backend API powering the Cero ecosystem. Handles OAuth 2.0 device authorization, AI chat with streaming responses, model selection, tool integrations, and conversation management. Built with Next.js 16.

## Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | API routes and server infrastructure |
| [Better Auth](https://www.better-auth.com/) | Authentication with device flow |
| [Drizzle ORM](https://orm.drizzle.team/) | Type safe database toolkit |
| [Neon Database](https://neon.tech/) | Serverless Postgres |
| [Inngest](https://www.inngest.com/) | Background jobs and realtime streaming |
| [Vercel AI SDK](https://github.com/vercel/ai) | AI model integration |
| [Google AI](https://ai.google.dev/) | Gemini models |
| [Zod](https://zod.dev/) | Runtime validation |

## Features

### Authentication

| Feature | Description |
|---------|-------------|
| Device Flow | OAuth 2.0 Device Authorization Grant (Netflix style) |
| GitHub OAuth | Social login integration |
| Bearer Tokens | CLI authentication |
| Session Management | 7 day expiry with cookie caching |

### AI Chat

| Feature | Description |
|---------|-------------|
| Multi Model Support | 10+ Gemini models (2.5 Pro, Flash, Lite, etc.) |
| AI Tools | Google Search, URL Context, Code Execution |
| Streaming | Real time token streaming via Inngest Realtime |
| Context Compression | TOON format compression for long conversations |
| Message Persistence | Full conversation history storage |

### Supported Models

| Model | Description |
|-------|-------------|
| Gemini 3 Pro Preview | Latest preview model |
| Gemini 2.5 Pro | Most capable |
| Gemini 2.5 Flash | Fast and efficient |
| Gemini 2.5 Flash Lite | Lightweight (default) |
| Gemini 2.0 Flash | Fast multimodal |
| Gemini 1.5 Pro | High performance |
| Gemini 1.5 Flash | Balanced |

### AI Tools

| Tool | Description |
|------|-------------|
| Google Search | Access latest information via web search |
| URL Context | Analyze content from specific URLs |
| Code Execution | Execute Python code for calculations |


## Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| Bun | 1.0+ |
| Database | Neon or Postgres |
| Google AI API | Required |
| GitHub OAuth | Required |
| Inngest | Required |

### Installation

```bash
cd apps/cero-api
bun install
cp .env.example .env
```

### Database Setup

```bash
bun db:generate    # Generate migrations
bun db:push        # Push schema to database
bun db:studio      # Open Drizzle Studio (optional)
```

### Development

```bash
bun dev            # API at http://localhost:3001
bun dev:inngest    # Inngest dev server (separate terminal)
```

### Production

```bash
bun build
bun start
```

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Returns `{ "status": "ok" }` |

### Authentication

All Better Auth endpoints at `/api/auth/*`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/device/code` | Request device authorization code |
| POST | `/api/auth/device/token` | Poll for access token |
| POST | `/api/auth/sign-in/github` | GitHub OAuth sign in |
| GET | `/api/auth/session` | Get current session |

### Chat

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message, receive streaming response |

**Request Body:**
```json
{
  "message": "your message",
  "conversationId": "optional",
  "aiModel": "gemini-2.5-flash-lite",
  "tools": ["google_search", "url_context", "code_execution"]
}
```

**Headers:** `Authorization: Bearer <token>`

**Response:** Server Sent Events stream

### Conversations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/conversations` | Get all user conversations |
| GET | `/api/conversations/[id]/messages` | Get messages in conversation |

### User

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/whoami` | Get authenticated user details |

### Background Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/inngest` | Inngest webhook endpoint |

## How It Works

### Device Authorization Flow

1. CLI requests device code from `/api/auth/device/code`
2. User opens verification URL (`/device` on web app)
3. User enters code and approves
4. CLI polls `/api/auth/device/token` until approved
5. API returns access token
6. CLI stores token in system keychain

### Chat Streaming

1. Client POSTs to `/api/chat` with message, model, and tools
2. API triggers Inngest background job
3. Job loads conversation context (with TOON compression for long chats)
4. AI streams response token by token via Inngest Realtime
5. Tokens sent to client as Server Sent Events
6. Messages persisted to database

### Realtime Channels

```typescript
chatChannel = channel((conversationId) => `chat.${conversationId}`)
  .addTopic("token")   // Individual tokens
  .addTopic("done")    // Completion signal
  .addTopic("error")   // Error handling
```


## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_GITHUB_CLIENT_ID="..."
BETTER_AUTH_GITHUB_CLIENT_SECRET="..."

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY="..."

# Inngest
INNGEST_SIGNING_KEY="..."
INNGEST_EVENT_KEY="..."

# Public URLs
NEXT_PUBLIC_WEBSITE_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3001"
```


## License

MIT © [Abhishek Singh](https://abhisheksingh.me)

---

<div align="center">
Part of the CeroCode ecosystem
</div>
