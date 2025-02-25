import {User} from '../../config/passport'; // Import the custom User interface from the passport configuration

// This file extends the default Express User interface with a custom User type from our passport configuration.
// By doing this, TypeScript will recognize the custom properties we have defined for the user object (such as id, google_id, firstName, lastName, and email).
// This enables proper type checking, IntelliSense autocompletion, and reduces runtime errors when accessing req.user in routes or middleware.

declare global {
    namespace Express {
        // Extend the built-in Express User interface with our custom User interface
    // This ensures that req.user will have the correct properties throughout the application
      interface User extends User {} // Extending the Express User with your custom User interface
    }
  }