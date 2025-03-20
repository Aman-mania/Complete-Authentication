# JWT_AUTH_System - Full Stack Web Application

A complete web application built with the MERN stack (MongoDB, Express.js, Node.js) that provides secure authentication using JSON Web Tokens (JWT). This system ensures robust user verification, role-based access control, and a responsive frontend for seamless user experience.

## Deployed on railway
**Have a look youself: https://complete-authentication-production.up.railway.app/**

## Overview

JWT_AUTH_System is designed as a full-stack web application to provide a user-friendly authentication mechanism. Users can register, log in, and access protected areas based on their roles. The frontend, built with HTML,CSS and JS, offers a smooth UI, while the backend, powered by Node.js and Express.js, ensures secure authentication and database management using MongoDB.

**HOME PAGE**
![image](https://github.com/user-attachments/assets/2fe0d865-9379-4be5-b39a-26a96234c1eb)

**Register / Login**
![image](https://github.com/user-attachments/assets/e420e23c-f56d-40fd-b195-9ccc7095ea33)
![image](https://github.com/user-attachments/assets/001cb754-d82d-41b7-a1c6-7ac103fa6b89)

**Dashboard (Authenticated User)**
![image](https://github.com/user-attachments/assets/93c3a584-936e-4563-869f-b17c1899bd19)

**Change Password (Authenticated User)**
![image](https://github.com/user-attachments/assets/4fe7cc7b-a397-402e-8ace-5996d72c8b11)

**Contact (Report Messages)**
![image](https://github.com/user-attachments/assets/bf8d6592-33f3-4e00-8485-0b7523dd32ca)

## Features

- **Secure Authentication:** Implements JWT-based token generation and validation for user login and registration.
- **Role-Based Access Control:** Differentiates user access based on roles to enhance security.
- **User Management:** Provides endpoints for user registration, login, and profile management.
- **Frontend UI:** A modern and responsive HTML/CSS/JS-based interface.
- **Protected Routes:** Ensures only authorized users can access specific pages and functionalities.
- **Performance Optimization:** Designed to integrate seamlessly with a scalable MongoDB database.

## Tech Stack

- **Framework:** Node.js, Express.js
- **Authentication:** JSON Web Tokens (JWT)
- **Database:** MongoDB (Atlas)
- **Environment Management:** dotenv

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)  
- npm (v6+)  
- MongoDB instance or connection string  
- A modern browser (Chrome, Firefox, Edge, etc.)

### Installation

1. **Clone the Repository:**  
   ```bash
   git clone https://github.com/Aman-mania/Complete-Authentication.git
   cd Complete-Authentication
   ```
2. **Install Backend Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**  
   Create a `.env` file in both the backend and frontend directories with:
   
   ```env
   PORT=3000 //Or any other port you want
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the complete application (Frontend + Server):**

   ```bash
   npm run dev
   ```

5. **The application frontend will run on http://localhost:3000.**
    If you want to run this on a different port, update the PORT variable in .env

## API Endpoints

### 2. **User Login**
**Endpoint:** `POST /api/user/login`  
**Description:** Authenticates a user and returns a JWT token.

Similarly, other webpages can be accessed.


For more details, refer to the official documentation or contact the developer @aman-mania. 🚀
