# TaskFlow — Full Stack Task Manager App

A modern full stack productivity web application built for portfolio presentation. Users can securely register, log in, and manage personal tasks through a responsive dashboard.

## Features

- User authentication with JWT
- Register and login pages
- Protected personal dashboard
- Create, edit, complete, reopen, and delete tasks
- Task priority: low, medium, high
- Optional due dates
- Dashboard statistics and progress indicator
- MongoDB database integration
- Responsive modern UI with glassmorphism design

## Tech Stack

**Frontend:** React, Vite, React Router, Axios, CSS  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

## Project Structure

```text
task-manager-app-fixed/
├── client/          # React frontend
├── server/          # Express backend
├── README.md
└── .gitignore
```

## Run Locally

### 1. Start MongoDB

```bash
sudo systemctl start mongod
```

### 2. Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### 3. Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task_manager_app
JWT_SECRET=change_this_secret_key
```

## Portfolio Description

TaskFlow is a full stack task management application designed to demonstrate practical MERN stack development skills. The project includes secure authentication, protected routes, user-specific data, CRUD operations, and a modern responsive dashboard suitable for real-world productivity use cases.
