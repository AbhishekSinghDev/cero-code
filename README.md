# Cero CLI

AI-powered command-line interface with chat and agent capabilities.

## Installation

```bash
npm install -g cero-cli
```

Or with pnpm:

```bash
pnpm add -g cero-cli
```

## Usage

After installation, you can use the `cero` command from anywhere in your terminal:

```bash
cero --help
```

### Available Commands

#### Login

Authenticate with Cero using device authorization flow:

```bash
cero login
```

#### Logout

Log out from your Cero account:

```bash
cero logout
```

#### Exit

Exit the CLI:

```bash
cero exit
```

### Options

- `-v, --version` - Display version number
- `-h, --help` - Display help information

## Configuration

Cero CLI connects to the Cero platform at `https://cero.abhisheksingh.me` by default.

## Features

- 🤖 AI-powered chat and agent capabilities
- 🔐 Secure authentication with device authorization flow
- 🎨 Beautiful CLI interface with colored output
- ⚡ Fast and lightweight

## Development

### Prerequisites

- Node.js 18+
- pnpm 10+

### Setup

1. Clone the repository:

```bash
git clone https://github.com/AbhishekSinghDev/cero-cli.git
cd cero-cli
```

2. Install dependencies:

```bash
pnpm install
```

3. Run in development mode:

```bash
pnpm dev
```

4. Build the project:

```bash
pnpm build
```

### Scripts

- `pnpm dev` - Run in development mode with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Run the built version
- `pnpm validate-env` - Validate environment variables

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Abhishek Singh

## Author

**Abhishek Singh**

- GitHub: [@AbhishekSinghDev](https://github.com/AbhishekSinghDev)
- Repository: [cero-cli](https://github.com/AbhishekSinghDev/cero-cli)

## Support

For issues and questions, please open an issue on [GitHub](https://github.com/AbhishekSinghDev/cero-cli/issues).
