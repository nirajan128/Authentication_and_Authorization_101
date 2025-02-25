import {User} from '../../config/passport'; // Import the custom User interface from the passport configuration


// 📄 This is a TypeScript declaration file (.d.ts). Declaration files provide type definitions without actual implementation.
// They help TypeScript understand the shape and structure of existing JavaScript code or third-party libraries.

// 🔍 Why `.d.ts`? 
// - Provides type information to TypeScript without adding executable code.
// - Allows you to extend or modify existing libraries' type definitions (like Express).
// - Helps maintain type safety and avoid TypeScript errors for custom properties (e.g., req.user.firstName).

// 📁 Why inside the `express` folder?
// - Organizes custom type definitions specifically for the Express library.
// - Makes it clear that the types in this file are meant to extend Express’s built-in types.
// - TypeScript recognizes that you're extending Express's internal `User` interface by matching the folder name with the library name.

// 🔗 Purpose of this declaration:
// - Extends Express's built-in `User` interface to include custom properties defined in your own `User` interface from the Passport configuration.
// - Allows you to access custom user properties (like firstName, lastName, email) on `req.user` without TypeScript errors.

declare global {
    namespace Express {
        // Extend the built-in Express User interface with our custom User interface
    // This ensures that req.user will have the correct properties throughout the application
      interface User extends User {} // Extending the Express User with your custom User interface
    }
  }