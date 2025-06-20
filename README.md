# Scrooge Vault

This project is a React application built with Vite, designed to simulate a "Scrooge Vault" where users can claim daily rewards. It provides a clean and interactive interface for displaying a vault balance, a countdown timer until the next claim is available, and a log of all successful claims.

## Features

* **Vault Balance Display**: Clearly shows the current accumulated balance in the vault.
* **Claim Mechanism**: Users can claim rewards once a timer expires, with a simulated loading state.
* **Dynamic Timer**: A countdown timer indicates when the next claim will be available, glowing intensely when ready.
* **Claim History**: A log displays all previous claims, including the amount and time since the claim was made.
* **Confetti Animation**: A celebratory confetti effect appears upon a successful claim.
* **Responsive Design**: Built with Tailwind CSS for a responsive and modern user interface.
* **Toast Notifications**: Provides feedback for successful claims using `react-toastify`.
* **Custom Animations**: Includes subtle animations for elements like the vault chest (`animate-float`), balance (`animate-pulse-light`), and log items (`animate-fade-in`).

## Technologies Used

* **React**: A JavaScript library for building user interfaces.
* **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
* **Vite**: A fast build tool for modern web projects.
* **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
* **ESLint**: For identifying and reporting on patterns found in ECMAScript/JavaScript code.
* **React Confetti**: For celebratory animations.
* **React Toastify**: For customizable toast notifications.

## Project Structure

├── public/
│   ├── box.png
│   └── vault-opening.gif
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button.tsx
│   │   │   ├── LogItem.tsx
│   │   │   └── Timer.tsx
│   │   ├── molecules/
│   │   │   ├── ClaimLogs.tsx
│   │   │   └── VaultCard.tsx
│   │   └── organisms/
│   │       └── VaultClaimModule.tsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts


## Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd scrooge-vault
    ```

2.  **Install dependencies:**

    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```
    Or using pnpm:
    ```bash
    pnpm install
    ```

## Usage

### Development Server

To run the project in development mode with hot-module reloading:

```bash
npm run dev
# or yarn dev
# or pnpm dev
This will typically start the development server at http://localhost:5173.

Building for Production
To build the application for production, which will output optimized static files to the dist directory:

Bash

npm run build
# or yarn build
# or pnpm build
Preview Production Build
To preview the built application locally:

Bash

npm run preview
# or yarn preview
# or pnpm preview
Linting
To run ESLint and check for code quality issues:

Bash

npm run lint
# or yarn lint
# or pnpm lint
Configuration
ESLint
The project uses eslint.config.js for ESLint configuration. It extends recommended JavaScript and TypeScript ESLint rules and includes plugins for React Hooks and React Refresh.

TypeScript
TypeScript configuration is managed by tsconfig.json, which references tsconfig.app.json for application-specific settings and tsconfig.node.json for Node.js-related files (like vite.config.ts).

Vite
The vite.config.ts file configures Vite, integrating the React plugin and Tailwind CSS.