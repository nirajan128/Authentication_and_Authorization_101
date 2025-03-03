import * as express from 'express';

// Augmenting the Express module to define a custom `User` interface for `req.user`.
// By default, Express does not have a `user` property on the request object. When we use Passport.js for authentication, 
// it attaches the authenticated user to `req.user`. However, TypeScript doesn't know the structure of `req.user` by default,
// leading to type errors when accessing properties like `req.user.id` or `req.user.email`.
//
// This augmentation defines the structure of `req.user` (e.g., `id`, `google_id`, `firstname`, `lastname`, and `email`) so 
// TypeScript can properly infer the types and avoid errors when accessing these properties.
// It ensures type safety and enhances developer experience by providing autocomplete and type checking during development.

declare global {
  namespace Express {
    interface User {
      id: number;
      google_id: string;
      firstname: string;
      lastname: string;
      email: string;
    }
  }
}