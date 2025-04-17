<div align="center">
<h1>Marine Vessel Tracking Application</h1>

A real-time marine vessel tracking application built with Vue + TypeScript for the front-end and Express/Socket.io for the back-end.

[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vue](https://img.shields.io/badge/Vue-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-cb52ff?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Socket.io](https://img.shields.io/badge/Socket.io%20-%20%235C5C5C?style=for-the-badge&logo=socketdotio)](https://socket.io/)
[![Vitest](https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Supertest](https://img.shields.io/badge/supertest-ff69b4?style=for-the-badge)](https://github.com/visionmedia/supertest)
</div>

## Features
- Pinia state management
- Track multiple vessels in *real-time*
- Interactive map display with Google Maps API
- Real-time updates with Socket.io
- Filter vessels by name
- Add, edit, and delete vessels
-Pan to vessel location on the map from sidebar


## Project Structure
```
marine-vessel-app/
├── client/                 # Vue 3 frontend
│   ├── src/
│   │   ├── components/     # Vue components
│   │   │   ├── map/        # Map components
│   │   │   ├── sidebar/    # Sidebar components
│   │   │   └── ui/         # Reusable UI components
│   │   ├── composables/    # Vue composables
│   │   ├── stores/         # Pinia stores
│   │   └── types/          # TypeScript type definitions
│   ├── tests/              # Frontend tests
│   └── ...
├── server/                 # Express.js backend
│   ├── src/
│   │   ├── controllers/    # API controllers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── socket/         # Socket.io handlers
│   ├── prisma/             # Prisma schema and migrations
│   ├── tests/              # Backend tests
│   └── ...
└── shared/                 # Shared code between client and server
    └── types/              # Shared TypeScript interfaces
```

## Getting Started
### Prerequisites
- Node.js (v18+)
- pnpm (v10+)
- PostgreSQL Database

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/georgeeburt/marine-vessel-app.git
cd marine-vessel-app`
```

---

### 2. Install dependencies:
#### Install root dependencies:
```bash
pnpm install
```

---

#### Install client dependencies:
```bash
cd client
pnpm install
cd ..
```

---

#### Install server dependencies:
```bash
cd server
pnpm install
cd ..
```

### 3. Set up environment variables
- Create a `.env` file in the `/server` directory and populate with environment variables:
```
DATABASE_URL=postgres_db_url
PORT=port_number
```

- Create a `.env` file in the `/client` directory and populate with environment variables:
```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_API_URL=backend_api_url

```

### 4. Set up and seed the database:
```bash
cd server
pnpm prisma migrate dev
pnpm seed
```

## Running Tests
### Back-end Tests
```bash
cd server
pnpm test
```

### Front-end Tests
```bash
cd client
pnpm test
```

## Scripts

| Script/Command                  | Description                             |
| ------------------------------- | ----------------------------------------|
| `pnpm format:check`             | Runs format checking on the codebase.   |
| `pnpm format`                   | Runs prettier formatter on the codebase.|
| `pnpm lint`                     | Runs ESLint linter on the codebase.     |
| `pnpm lint:fix`                 | Fixes linting errors.                   |
