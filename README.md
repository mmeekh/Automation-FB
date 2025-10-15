# AutoFlow - Instagram Automation Platform

Modern Instagram automation SaaS with Next.js 14, TypeScript, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

**URL:** http://localhost:3007

## Docker

```bash
docker-compose up --build
```

**URL:** http://localhost:3005

## Test Credentials

- Email: any@email.com
- Password: any
- 2FA Code: 123456 (any 6 digits)

## Project Structure

```
├── app/              # Pages (Next.js App Router)
├── components/       # React components
├── lib/              # Business logic & utilities
├── messages/         # i18n translations (en, tr)
├── i18n/             # i18n config
├── public/           # Static files
├── Dockerfile        # Docker configuration
└── docker-compose.yml # Docker Compose configuration
```

## Features

- ✅ Multi-language (English, Turkish)
- ✅ Neumorphic design
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ State management (Zustand)
- ✅ Docker ready
- ✅ Responsive design

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** next-intl
- **State:** Zustand
- **Icons:** Heroicons

## Commands

```bash
npm run dev        # Development (port 3007)
npm run build      # Production build
npm start          # Production server
npm run lint       # ESLint
npm run type-check # TypeScript check
```

## License

MIT
