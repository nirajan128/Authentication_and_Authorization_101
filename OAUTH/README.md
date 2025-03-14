# Full-Stack Application with Google OAuth, React, Node.js, TypeScript, and PostgreSQL

This is a full-stack web application built using React (TypeScript) for the frontend, Node.js/Express (TypeScript) for the backend, PostgreSQL as the database, and Google OAuth 2.0 for user authentication.

--- 
## Project Overview

This project demonstrates a modern full-stack architecture with secure user authentication using Google OAuth. Users can log in using their Google accounts, and their information is securely stored in a PostgreSQL database.

---

## Technologies Used

### Frontend:
- React (TypeScript)
- Axios for API requests

### Backend:
- Node.js with Express (TypeScript)
- Passport.js with Google OAuth Strategy
- PostgreSQL with Sequelize ORM

---

## Features

1. **Google OAuth Authentication**: Users can log in securely using their Google accounts.
2. **Frontend & Backend in TypeScript**: Both client and server are implemented with TypeScript for type safety.
3. **PostgreSQL Database**: User data is stored securely in a PostgreSQL database.
4. **RESTful API**: The backend provides RESTful endpoints for authentication and user management.

---

## Google OAuth Implementation

Google OAuth 2.0 is implemented using the Authorization Code flow. Here's how it works:

### Frontend Workflow

1. **Google Sign-In Button**:  
   The frontend render a "Sign in with Google" button. When clicked, it redirects the user to Google's authentication page.

2. **Accessing Protected Dashboard**:  
   After successful login, Google redirects the user to the protected dashboard.

### Backend Workflow

1. **Exchange Authorization Code for Access Token**:  
   The backend uses Passport.js with the Google OAuth strategy to exchange the authorization code for an access token and ID token by making a request to Google's token endpoint.

2. **Verify User Information**:  
   The ID token is decoded and verified to extract user information (e.g., email, name).

3. **Check or Create User in Database**:  
   The backend checks if the user already exists in the PostgreSQL database:
   - If yes, it retrieves the user's details.
   - If no, it creates a new user record in the database.


### Database Integration

The PostgreSQL database stores user information such as:
- User ID
- Name
- Email
- Profile Picture URL
- Timestamps (created_at, updated_at)

---

## Setup Instructions

Follow these steps to set up and run the project locally:

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


## License

This project is licensed under the MIT License.
