# JWT + Google OAuth Authentication System

This full-stack application implements dual authentication methods:
- **JWT** for email/password login
- **Google OAuth 2.0** for social login
Built with React (TypeScript) frontend, Node.js/Express (TypeScript) backend, and PostgreSQL.

## Architecture Overview

**Frontend**  
- Login Form → JWT Authentication
- Google Sign-In → OAuth Flow → JWT Issuance

**Backend**  
 Express → Passport.js →
├── JWT Strategy (Local Login)
└── Google OAuth Strategy

## Workflow Comparison

### Frontend Workflow:

1. **Initial Load:**
   - Check URL for token parameter

2. **If token found in URL:**
   - Extract token from query parameters
   - Send token to backend for verification (/api/verify-token)
     - If valid:
       - Store JWT in memory/local storage
       - Redirect to dashboard

     - If invalid:
       - Clear token
       - Show error message

   - Remove token from URL (for security)

3. **If no token in URL:**
   - Display login options (Email/Password or Google Sign-In)

4. **Email/Password Login:**
   - User enters credentials
   - Send to backend (/auth/login)
   - Receive JWT
   - Store JWT
   - Redirect to dashboard

5. **Google Sign-In:**
   - User clicks Google button
   - Redirect to Google OAuth flow

6. **For subsequent requests:**
   - Include JWT in Authorization header

### Backend Workflow:

1. **Google OAuth Callback (/auth/google/callback):**
   - Receive authorization code from Google
   - Exchange code for Google tokens
   - Verify Google ID token
   - Find or create user in database
   -  Generate JWT for user
   - Redirect to frontend with JWT in URL parameter

2. **Email/Password Login (/auth/login):**
   - Validate credentials
   - Generate JWT
   - Send JWT in response

4. **Protected Routes:
 #### JWT Checker Middleware:**
   - Extract token from Authorization header or query parameter
    - Verify JWT
    - If valid, move to next function
    - If invalid, return 401 Unauthorized

3. **Token Verification middleware (Dashboard):**
   - Receive token from frontend
   - Verify JWT signature
   - Check token expiration
   - If valid, send user data 
   - If invalid, return error

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
**