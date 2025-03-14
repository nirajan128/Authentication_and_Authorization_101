# JWT Authentication Project

## Overview

This project demonstrates how to implement JSON Web Token (JWT) authentication in a full-stack application. The backend is built using Node.js, Express, and TypeScript, while the frontend is implemented using React and typescript. JWT is used to securely authenticate users and manage protected routes.

--- 

## Technologies Used

### Frontend:
- React (TypeScript)
- Axios for API requests

### Backend:
- Node.js with Express (TypeScript)
- `JsonwebToken` for JWT
- bcrypt for hasing the password
- PostgreSQL with Sequelize ORM

---

## How JWT Works in This Application

### 1. User Registration

- A new user provides their credentials (e.g., username and password) via the register route.
- The password is hashed using bcrypt before storing it in the database.
- After successful registration, a success message is returned.

### 2. User Login & Token Generation

- The user submits their credentials to the login route.
- The system verifies the credentials against the stored data.
- If valid, a JWT token is generated using jsonwebtoken and sent to the client.

### 3. Token Structure

A JWT consists of three parts:

**Header.Payload.Signature**

- **Header:** Specifies the algorithm (e.g., HS256) and token type.
- **Payload:** Contains user information (e.g., user ID, role, expiration time).
- **Signature:** A hashed combination of the header, payload, and a secret key.

Example JWT payload:

```json
{
  "id": "user123",
  "username": "testuser",
  "iat": 1629200912,
  "exp": 1629204512
}
```

### 4. Token Storage on the Client

- After login, the frontend stores the JWT in either localStorage or sessionStorage.
- The token is included in the Authorization header for protected requests.

### 5. Accessing Protected Routes

- When a request is sent to a protected endpoint, the token is verified using a middleware.
- If the token is valid:
 - The user ID is extracted and attached to the req object.
 - The next middleware is executed.

- If the token is invalid or expired, the request is denied.

### 6. Logout Process

- Logging out simply removes the token from storage on the client side.
- The server does not track active sessions, meaning token expiration is the only way to invalidate a token.
- How to Test JWT Functionality

--- 

### Using Postman:

- Register a user by sending a POST request with JSON credentials.
- Login and obtain the JWT token.
- Access a protected route by adding the JWT token as a Bearer Token in the Authorization header.

#### Example Authorization Header:

```http
{
  Authorization: Bearer <your_token_here>
}
```

---

### Backend and Frontend Setup

1. Clone this repository:

```sh
git clone <repository-url>
cd <repository-folder>/server
```

2. Install Dependencies
```sh
cd client
npm install

cd server
npm install
```

3. Setup .env
- Create a `.env` file in `server` directories with the following variables:
```sh
PORT=5000
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
JWT_SECRET=<your-jwt-secret>
```

4. Run the program
- Start the client and server, the client authentication logic won't work unless the sever is live
``` sh
npm run dev
```

---

## Conclusion
This project provides a structured approach to implementing JWT-based authentication. It ensures secure user authentication and authorization using token-based methods. By following the principles outlined above, developers can create scalable and secure authentication systems.

---

## License

This project is licensed under the MIT License.



