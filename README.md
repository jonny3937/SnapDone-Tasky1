# SnapDone

SnapDone is a full-stack task management platform designed to help users organize, track, and complete their tasks efficiently. The project consists of a React-based frontend (client) and a Node.js/Express backend (server) with Prisma ORM for database management.

---

## Project Structure

- `client/` – Frontend application (React + TypeScript)
- `server/` – Backend API (Node.js + Express + Prisma)

---

## Features
- User authentication (JWT-based)
- Task management (add, complete, delete, restore)
- User profile and settings
- Responsive design

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/jonny3937/SnapDone-Tasky1.git
cd SnapDone
```

### 2. Install dependencies
#### Client
```bash
cd client
npm install
```
#### Server
```bash
cd ../server
npm install
```

### 3. Set up the database (Server)
```bash
npx prisma migrate dev --name init
```

### 4. Run the applications
#### Start the backend server
```bash
cd server
npm run start:dev
```
#### Start the frontend client
```bash
cd ../client
npm run dev
```

- The backend runs on [http://localhost:3000](http://localhost:3000) by default.
- The frontend runs on [http://localhost:5173](http://localhost:5173) by default.

---

## Folder Details

### client/
- Built with React and TypeScript
- Main folders:
  - `src/api/` – Axios API config
  - `src/components/` – UI components
  - `src/context/` – React context providers
  - `src/pages/` – Application pages
  - `src/services/` – API service layer
  - `src/assets/` – Static assets

### server/
- Built with Node.js, Express, and Prisma
- Main folders:
  - `src/controllers/` – Route controllers
  - `src/middleware/` – Express middleware
  - `src/routes/` – API route definitions
  - `src/utils/` – Utility functions
  - `src/types/` – TypeScript types
  - `prisma/` – Prisma schema and migrations



