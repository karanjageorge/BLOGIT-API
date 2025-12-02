# 📝 BlogIt API

A **Node.js + TypeScript + Express + Prisma** backend for a blogging platform called **BlogIt**.  
This API handles user authentication, allowing users to **register**, **login**, and **logout** securely.

---

## Tech Stack

- **Node.js** – Server runtime
- **Express.js** – Backend framework
- **TypeScript** – Type safety and scalability
- **Prisma ORM** – Database ORM for SQL Server
- **Microsoft SQL Server** – Database
- **bcrypt** – Password hashing
- **jsonwebtoken (JWT)** – Authentication tokens
- **cookie-parser** – Manage auth cookies

---

## Features

### Authentication System
- **User Registration**
  - Validates input (firstName, lastName, username, email, password)
  - Checks for unique username/email
  - Hashes passwords using bcrypt
  - Returns `"Account created successfully"`

- **User Login**
  - Accepts username **or** email + password
  - Verifies hashed password
  - Generates JWT token and sets as `authToken` cookie
  - Returns user info and `"Login successful"`

- **User Logout**
  - Clears the authentication cookie
  - Returns `"logout successful"`

---


