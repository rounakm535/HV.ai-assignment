# 🏖️ Leave Management System

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

A sleek, modern full-stack web application that streamlines the process of leave management. Employees can easily apply for leave and track their requests, while employers have a centralized dashboard to manage and approve/reject applications.

---

## ✨ Core Features

### 👨‍💼 For Employees
- **Secure Authentication**: Register and log in securely.
- **Apply for Leave**: Submit new leave requests specifying the type, dates, and reason.
- **Track Status**: View a personalized dashboard showing all past and current leave requests with real-time status badges (Pending, Approved, Rejected).

### 🏢 For Employers
- **Centralized Dashboard**: View a master table of all leave requests from every employee.
- **Quick Actions**: Instantly approve or reject leave applications to streamline HR workflows.

---

## 🛠️ Tech Stack & Architecture

This application is built using a modern **MEVN** stack implementation with specialized tools for styling and bundling.

**Frontend Environment:**
- **Framework**: Vue.js 3 (Composition API)
- **Styling**: Tailwind CSS v4 (with modern glassmorphism & gradients)
- **Build Tool**: Vite
- **Routing**: Vue Router
- **HTTP Client**: Axios

**Backend Environment:**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas) & Mongoose ORM
- **Authentication**: Custom JWT (JSON Web Tokens)
- **Security**: Bcrypt.js (Password Hashing)

---

## 📂 Project Structure

The repository is organized into a clean monorepo format, separating the client UI from the REST API:

```text
HV.ai-assignment/
├── backend/                  # Express.js REST API
│   ├── config/               # Database connection strings
│   ├── controllers/          # Business logic for auth & leaves
│   ├── middleware/           # JWT verification & Role guards
│   ├── models/               # Mongoose schemas (User, LeaveRequest)
│   ├── routes/               # Express route definitions
│   └── server.js             # Application entry point
│
└── frontend/                 # Vue.js Client Application
    ├── src/
    │   ├── components/       # Reusable UI components (Navbar)
    │   ├── pages/            # View components (Dashboards, Auth)
    │   ├── router/           # Client-side route definitions
    │   ├── services/         # Axios API interceptors & config
    │   ├── App.vue           # Root component
    │   └── main.js           # Vue application initialization
    ├── style.css             # Tailwind v4 configuration & base styles
    └── vite.config.js        # Vite bundler configuration
```

---

## 🚀 Setup & Installation (Local Development)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB installation)

### 2. Backend Setup
Navigate into the backend directory and install dependencies:
```bash
cd backend
npm install
```
Create a `.env` file inside the `backend` folder and add your configuration:
```env
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
```
Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a *new* terminal, navigate into the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```
Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 🌐 API Reference

### Authentication
- `POST /api/auth/register` - Create a new user (employee/employer).
- `POST /api/auth/login` - Authenticate a user and receive a JWT.

### Leaves (Employee Access)
- `POST /api/leaves/apply` - Submit a new leave application.
- `GET /api/leaves/my` - Fetch all leave applications for the logged-in user.

### Leave Management (Employer Access)
- `GET /api/leaves/all` - Fetch all system leave applications.
- `PUT /api/leaves/:id/approve` - Update a specific application's status to 'approved'.
- `PUT /api/leaves/:id/reject` - Update a specific application's status to 'rejected'.

---

## ☁️ Deployment Guide

This project is configured for cloud deployment on **Vercel** (Frontend) and **Render** (Backend).

### Database (MongoDB Atlas)
1. Whitelist `0.0.0.0/0` in your Network Access settings to allow the cloud backend to connect.
2. Ensure your Database User has read/write privileges.

### Backend (Render)
1. Create a "New Web Service" on [Render](https://render.com/).
2. Connect your GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add all Environment Variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).
7. Deploy.

### Frontend (Vercel)
1. Update `baseURL` in `frontend/src/services/api.js` to point to your live Render backend URL.
2. Import the repository into [Vercel](https://vercel.com/).
3. Set the **Root Directory** to `frontend`.
4. Ensure the framework is set to **Vite**.
5. Deploy.

---

**Built with ❤️ for the HV.ai Assignment.**