# Pizza Order Manager

A full-stack real-time pizza ordering system managed by a kitchen dashboard.

## Project Structure

This monorepo contains three main components:

1.  **Backend (`/backend`)**: A Node.js/Express server that handles API requests, database interactions (MongoDB), and real-time communication via Socket.io.
2.  **Customer Frontend (`/frontend/customer`)**: A React application for customers to browse pizzas, add them to a cart, order, and track their order status in real-time.
3.  **Kitchen Frontend (`/frontend/kitchen`)**: A React application for kitchen staff to view incoming orders and update their status (Placed -> Preparing -> Ready -> Completed).

## Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.io, TypeScript.
- **Frontend**: React, Vite, TailwindCSS v4, Socket.io-client, React Router DOM.

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Ensure a local instance is running or update connection string)

## Installation & Running

You need to run the backend and both frontends simultaneously for the complete experience.

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Runs on `http://localhost:4000` (default).

### 2. Customer App

```bash
cd frontend/customer
npm install
npm run dev
```

Runs on `http://localhost:5173` (default).

### 3. Kitchen App

```bash
cd frontend/kitchen
npm install
npm run dev
```

Runs on `http://localhost:5174` (default).

## Features

- **Real-time Ordering**: Orders placed in the Customer app appear instantly in the Kitchen app.
- **Live Status Updates**: When the kitchen updates an order's status, the Customer app reflects the change immediately.
- **Responsive Design**: Built with TailwindCSS for mobile and desktop support.
