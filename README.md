# Complete-Authentication-API

A secure authentication system built with Express and JSON Web Tokens (JWT) to provide robust user verification and role-based access control. This API streamlines user registration and login processes, ensuring scalability and data integrity with MongoDB.
It also includes complete frontend which can be integrated to any existing web application.

## Overview

UserAuth-JWT API is designed to offer a reliable authentication mechanism for web applications. By utilizing JWT for token-based authentication and role-based access control, it ensures that only authorized users can access protected routes and resources.

## Features

- **Secure Authentication:** Implements JWT-based token generation and validation for user login and registration.
- **Role-Based Access Control:** Differentiates user access based on roles to enhance security.
- **User Management:** Provides endpoints for user registration, login, and access to protected routes.
- **Performance Optimization:** Designed to integrate seamlessly with scalable MongoDB databases.

## Tech Stack

- **Backend Framework:** Node.js, Express.js  
- **Authentication:** JSON Web Tokens (JWT)  
- **Database:** MongoDB  
- **Environment Management:** dotenv  

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)  
- npm (v6+)  
- A MongoDB instance or connection string  

### Installation

1. **Clone the Repository:**  
   ```bash
   git clone https://github.com/Aman-mania/UserAuth-JWT.git
   cd UserAuth-JWT
   ```
2. **Install Dependencies:**

```bash
npm install
```
3. **Configure Environment Variables:**
  Create a .env file in the root directory with:

```.env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
4. **Run the Server:**

```bash
npm start
```
The API server will run on http://localhost:3000.


**API Endpoints**
1. **Register User**
Endpoint: POST /api/user/register
Description: Registers a new user.
Request Body Example:
```json
{
  "name": "your_username",
  "email": "your_email@example.com",
  "pass": "your_password",
  "pass_cnf": "your_password",
  "tc": "true"
}
```

2. **User Login**
Endpoint: POST /api/user/login
Description: Authenticates a user and returns a JWT token.
Request Body Example:

```json
{
  "email": "your_email@example.com",
  "pass": "your_password"
}
```
