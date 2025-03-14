# Authentication and Authorization 101

Three distinct authentication implementations demonstrating different security approaches:
1. **JWT Implementation** - Traditional email/password login
2. **OAuth Implementation** - Google Social Login
3. **Hybrid Implementation** - Combined JWT + Google OAuth

Built with:
- **Backend**: Node.js/Express (TypeScript), PostgreSQL
- **Frontend**: React (TypeScript)

--- 

## 1. JWT Implementation

### Features
- Email/password registration & login
- JWT token generation/validation
- Protected routes with middleware


## 2. OAuth Implementation

### Features
- Google Sign-In integration
- OAuth 2.0 authorization code flow
- Session management with secure cookies
- User profile synchronization

## 3. Hybrid Implementation

### Features
- Combined JWT + OAuth flow
- Unified user database
- Token exchange endpoint
- Cross-authentication validation

---

```sh
  Step guide and Project setup instruction has been provided foreach projects
```
---

## Basic Requirement for each project
- Configure Database - [Postgress](https://supabase.com/)
  - You can use supabase or any other site.
- Configure Google CLient - [GoogleCLient](https://www.youtube.com/watch?v=__03uyFWj0Y)

---

## License

This project is licensed under the MIT License.