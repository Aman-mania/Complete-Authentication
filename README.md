# JWT_AUTH_System - Full Stack Web Application

A complete web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that provides secure authentication using JSON Web Tokens (JWT). This system ensures robust user verification, role-based access control, and a responsive frontend for seamless user experience.

## Overview

JWT_AUTH_System is designed as a full-stack web application to provide a user-friendly authentication mechanism. Users can register, log in, and access protected areas based on their roles. The frontend, built with React.js, offers a smooth UI, while the backend, powered by Node.js and Express.js, ensures secure authentication and database management using MongoDB.

**HOME PAGE**
![image](https://github.com/user-attachments/assets/885dd425-5f39-4797-9177-c8c470afa960)

**Register / Login**
![image](https://github.com/user-attachments/assets/d010a3be-cbaf-40d1-8b27-05ee0c06bf66)
![image](https://github.com/user-attachments/assets/cc89d79c-5617-40c1-a719-1c0e7117bc73)

**Dashboard (Authenticated User)**
![image](https://github.com/user-attachments/assets/8a16b0e3-d871-42ef-ab3e-b26ba4475ae7)

**Change Password (Authenticated User)**
![image](https://github.com/user-attachments/assets/7602fd0b-4708-46aa-af99-8eda8b1ee236)

**Contact (Report Messages)**
![image](https://github.com/user-attachments/assets/f1463395-23aa-430d-b829-1dedfee7f20d)

## Features

- **Secure Authentication:** Implements JWT-based token generation and validation for user login and registration.
- **Role-Based Access Control:** Differentiates user access based on roles to enhance security.
- **User Management:** Provides endpoints for user registration, login, and profile management.
- **Frontend UI:** A modern and responsive React.js-based interface.
- **Protected Routes:** Ensures only authorized users can access specific pages and functionalities.
- **Performance Optimization:** Designed to integrate seamlessly with a scalable MongoDB database.

## Tech Stack

### Frontend
- **Framework:** React.js
- **State Management:** Context API / Redux (optional)
- **Styling:** Tailwind CSS / Material-UI
- **API Requests:** Axios

### Backend
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
