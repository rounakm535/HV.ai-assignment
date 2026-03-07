# Leave Management System

A full-stack web application that allows employees to apply for leave and employers to manage (approve/reject) those leave requests. 

Built with **Vue.js 3 + Tailwind CSS** (Frontend) and **Node.js + Express + MongoDB + JWT** (Backend).

## Project Overview

This assignment project simulates a real-world internal tool for HR teams. 
- **Employees** can register, log in, view their previous leave applications, and submit new ones.
- **Employers** can log in, view a master list of all leave requests, and approve or reject them.

## Tech Stack

**Frontend:**
- Vue.js 3
- Vite
- Tailwind CSS
- Vue Router (for routing)
- Axios (for API calls)

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JSON Web Token (JWT) for Authentication
- bcryptjs for password hashing

---

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB Database (Atlas or local)

### Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your_db_name
   JWT_SECRET=your_super_secret_jwt_key
   ```
   *(Note: For local testing, you can use a local mongodb URI like `mongodb://localhost:27017/leave-management`)*
4. Start the development server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173` (or similar port).

*(Note: The `backend/server.js` path is hardcoded as `http://localhost:5000/api` in `frontend/src/services/api.js`. Adjust it if you host the backend online or use a different local port.)*

---

## Environment Variables

### Backend `.env`

- `PORT`: Port number for the Express server (default `5000`).
- `MONGO_URI`: The connection string for your MongoDB database.
- `JWT_SECRET`: A secret string used to sign JSON Web Tokens.

---

## API Documentation

### Auth Endpoints
- **POST `/api/auth/register`**  
  **Body:** `{ name, email, password, role }` (role can be `'employee'` or `'employer'`, defaults to `'employee'`)  
  **Response:** JWT token + user details.

- **POST `/api/auth/login`**  
  **Body:** `{ email, password }`  
  **Response:** JWT token + user details.

### Leave Endpoints (Employee)
- **POST `/api/leaves/apply`** *(Requires Auth: Employee)*  
  **Body:** `{ leaveType, startDate, endDate, reason }`  
  **Response:** Created leave request object.

- **GET `/api/leaves/my`** *(Requires Auth: Employee)*  
  **Response:** Array of leave requests belonging to the logged-in user.

### Leave Endpoints (Employer)
- **GET `/api/leaves/all`** *(Requires Auth: Employer)*  
  **Response:** Array of all leave requests from all employees.

- **PUT `/api/leaves/:id/approve`** *(Requires Auth: Employer)*  
  **Response:** Updated leave request (status: 'approved').

- **PUT `/api/leaves/:id/reject`** *(Requires Auth: Employer)*  
  **Response:** Updated leave request (status: 'rejected').

---

## Deployment Steps

### Database (MongoDB Atlas)
1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Free Cluster.
3. In "Database Access", create a highly privileged user with a password.
4. In "Network Access", allow access from anywhere (IP: `0.0.0.0/0`) or just your hosting services.
5. Get the Connection String (URI) and format it properly.

### Backend (Render / Railway)
1. Push your code to a GitHub repository.
2. Sign up on [Render.com](https://render.com/) or [Railway.app](https://railway.app/).
3. Create a new **Web Service**.
4. Connect your GitHub repository.
5. Configure the Build Command (`npm install`) and Start Command (`npm start` or `node server.js`). Ensure you specify the `backend` Root Directory if you deployed as a monorepo.
6. Add the Environment Variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).
7. Deploy. Wait for the live URL `https://your-backend-url.onrender.com`.

### Frontend (Vercel)
1. In `frontend/src/services/api.js`, update the `baseURL` to the production URL of your backend.
   ```javascript
   const api = axios.create({
     baseURL: 'https://your-backend-url.onrender.com/api',
   });
   ```
2. Commit and push the updated code.
3. Sign up on [Vercel](https://vercel.com).
4. Create a "New Project" and import your GitHub repository.
5. Set the Root Directory to `frontend`.
6. Use the standard Vite presets (`npm run build` for Build Command, `dist` for Output Directory).
7. Click **Deploy**.

**Live URL Placeholders:**
- Frontend: `https://[your-frontend-app].vercel.app`
- Backend: `https://[your-backend-api].onrender.com`
