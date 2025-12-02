# BlogIt API & Client README

## 📌 Overview

BlogIt is a full‑stack blogging platform built with a **Node.js + Express + Prisma backend** and a **React + TypeScript + Tailwind CSS frontend**. It provides user authentication, blog creation, editing, deletion, and a clean dashboard UI.

This README summarizes the system setup, project structure, and how to run both the server and client.

---

## 🚀 Features

### **Backend (API)**

* User registration & login (Email + Username identifier)
* JWT authentication
* Blog CRUD operations
* Prisma ORM with PostgreSQL
* Secure password hashing with bcrypt
* Protected routes for authenticated users

### **Frontend (Client)**

* React + TypeScript
* Tailwind CSS UI
* User-friendly dashboard
* Blog creation, viewing, editing
* API communication via Axios
* React Router for navigation

---

## 📁 Project Structure

```
BlogIt/
 ├── server/       # Backend (Node.js, Express, Prisma)
 └── client/       # Frontend (React, TS, Vite)
```

---

# 🛠️ Backend Setup (Server)

## 1️⃣ Install Dependencies

```
cd server
npm install
```

## 2️⃣ Configure Environment

Create a `.env` file:

```
DATABASE_URL="postgresql://user:password@localhost:5432/blogit"
JWT_SECRET="your_jwt_secret_key"
PORT=5000
```

## 3️⃣ Run Prisma

```
npx prisma migrate dev
npx prisma generate
```

## 4️⃣ Start Server

```
npm run dev
```

Server runs on: **[http://localhost:5000](http://localhost:5000)**

---

# 🖥️ Frontend Setup (Client)

## 1️⃣ Install Dependencies

```
cd client
npm install
```

## 2️⃣ Start Vite Dev Server

```
npm run dev
```

Frontend runs on: **[http://localhost:5173](http://localhost:5173)**

---

# 🔗 Connecting Client & Server

In `client/src/lib/axiosApi.ts`:

```
export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
```

Make sure the server is running before using the client.

---

# 🧪 API Endpoints Summary

### **Auth**

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| POST   | /auth/register | Create new user |
| POST   | /auth/login    | Login user      |

### **Blogs**

| Method | Endpoint   | Description                   |
| ------ | ---------- | ----------------------------- |
| POST   | /blogs     | Create a blog (auth required) |
| GET    | /blogs     | Get all blogs                 |
| GET    | /blogs/:id | Get single blog               |
| PUT    | /blogs/:id | Update blog                   |
| DELETE | /blogs/:id | Delete blog                   |

---

# 🧱 Technologies Used

### **Backend**

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* JWT
* Bcrypt

### **Frontend**

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Router DOM

---

# 🧩 Common Issues

### ❌ *Client cannot connect to server*

* Ensure correct baseURL in axiosApi.ts
* Ensure server CORS is enabled
* Ensure ports are not blocked

### ❌ *Prisma errors*

* Check database connection
* Run: `npx prisma format`
* Re-run migrations

---

# 📄 License

This project is for learning and personal development.

---

# 🎯 Author

Built with ❤️ by **George Karanja**
