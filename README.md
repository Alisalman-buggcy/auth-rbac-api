# 🚀 Auth RBAC API (Node.js + TypeScript + PostgreSQL)

A secure backend authentication system built with **Node.js, Express, TypeScript, PostgreSQL, and JWT**.  
It includes authentication, authorization (RBAC), refresh tokens, and protected routes.

---

## ✨ Features

- 🔐 User Registration & Login
- 🧾 Password hashing with bcrypt
- 🎟️ JWT Access & Refresh Tokens
- 🛡️ Role-Based Access Control (RBAC)
- 👤 User Profile API
- 🔒 Protected Routes Middleware
- 🗄️ PostgreSQL Database Integration
- ⚙️ TypeScript Support
- 🚀 Modular Architecture (Controller / Service / Middleware)

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

## 📁 Project Structure
src/
│
├── config/ # Database & environment config
├── controllers/ # Route controllers
├── middlewares/ # Auth & role middleware
├── routes/ # API routes
├── services/ # Business logic
├── utils/ # JWT utilities
├── app.ts # Express app setup
└── server.ts # Server entry point


---

## ⚙️ Environment Variables

Create a `.env` file in root:

```env
PORT=5001

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=mydb

# JWT Secrets
JWT_ACCESS_SECRET=super_access_secret_key_123
JWT_REFRESH_SECRET=super_refresh_secret_key_456


Installation & Setup
1️⃣ Clone repository
git clone https://github.com/Alisalman-buggcy/auth-rbac-api.git
cd auth-rbac-api

2️⃣ Install dependencies
npm install

3️⃣ Setup database

Run PostgreSQL and create table:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password TEXT,
  role VARCHAR(20) DEFAULT 'user',
  refresh_token TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

4️⃣ Run project
npm run dev

🔐 API Endpoints
Auth Routes
Register
POST /auth/register
Login
POST /auth/login
User Routes
Profile (Protected)
GET /users/profile

Headers:

Authorization: Bearer <access_token>
Admin Routes (RBAC)
Admin Access
GET /users/admin

Only accessible by:

role = admin

🔄 JWT Flow
User logs in
Server generates:
Access Token (15m)
Refresh Token (7d)
Access token used for protected route

🛡️ Middleware
Auth Middleware
Verifies JWT token
Attaches user to request
Role Middleware
Checks user role
Blocks unauthorized access


👨‍💻 Author

Developed by Hafiz Ali Salman