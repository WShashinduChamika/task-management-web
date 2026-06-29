# Task Management Web Application

A modern, fast, and feature-rich task management web application built with React, TypeScript, and Vite. This application provides a premium glassmorphic user interface to effectively manage, filter, and track tasks.

## 🚀 Features

- **User Authentication**: Secure login and registration with token-based authentication (including automatic token refresh).
- **Task Management**: Create, read, update, and delete tasks with priorities (High, Medium, Low) and statuses (Open, In Progress, Testing, Done).
- **Role-Based Access Control**: Different views and capabilities for `Admin` and `User` roles.
- **Responsive Design**: A sleek, fully responsive dashboard that looks great on both desktop and mobile devices.
- **Premium UI**: Utilizing modern web design patterns including glassmorphism, smooth animations, and optimized skeleton loading states.

## 🛠️ Dependencies

This project leverages modern frontend technologies for a robust developer and user experience:

- **Core**: React 19, TypeScript, Vite 8
- **State Management**: `@preact/signals-react` for lightweight and reactive global state
- **Data Fetching**: `@tanstack/react-query` & `axios`
- **Routing**: `react-router-dom` v7
- **Styling**: Tailwind CSS v4, `clsx`, `tailwind-merge`, `tailwindcss-animate`
- **UI Components**: `shadcn/ui` (Radix UI), `lucide-react` (icons)
- **Forms & Validation**: `react-hook-form` with `@hookform/resolvers` and `zod`
- **Date Formatting**: `date-fns` & `react-day-picker`

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (version 20 or higher recommended)
- npm (or yarn/pnpm)

### Installation

1. **Clone the repository**

   > **Note:** The `main` branch is the primary, updated branch for this project. Ensure you are on `main` for the most recent changes.

   ```bash
   git clone <repository-url>
   cd task-management-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory based on `.env.example` (if available) and configure your API URL.

   ```env
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 📖 Usage

- **Development**: Run `npm run dev` to start the local development server with hot-module replacement (HMR).
- **Production Build**: Run `npm run build` to compile the TypeScript code and bundle the application with Vite.
- **Preview Production Build**: Run `npm run preview` to locally serve the production bundle for testing.
- **Linting**: Run `npm run lint` to execute ESLint and ensure code quality.

## 🗂️ Project Structure

- `src/app/`: Core application configuration, routing, and global providers.
- `src/components/ui/`: Reusable, styled UI components (shadcn/ui).
- `src/core/`: Core utilities including API clients, generic constants, and local storage handlers.
- `src/modules/`: Feature-based modules containing isolated logic, views, API hooks, and stores (e.g., `auth`, `task`).
- `src/shared/`: Shared layouts, navigation components, and route guards used across multiple modules.
