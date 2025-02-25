import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import db from "./db";
import { Query, QueryResult } from "pg";

dotenv.config();

// Interface for the user object to define the structure and ensure type safety
export interface User {
    id: number,
    google_id: string,
    firstname: string;
    lastname:string;
    email: string;
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL:process.env.GOOGLE_CALLBACK_URL
},async (accessToken:string, refreshToken:string, profile:Profile, done) =>{
     try {
        //get the user details from google profile
        const userEmail = profile.emails?.[0].value;
        const fullName = profile.displayName.split("");
        const firstName = fullName[0];
        const lastName = fullName.slice(1).join(" ") || ""; //handle the case with no lastName

        //check if user exists in database
        const result: QueryResult<User> = await db.query("SELECT * FROM usermone WHERE email = $1", [userEmail]);

        let user: User; // Define a user variable with the User interface type

        //If the user exists, set the user to the first index of result
        if(result.rows.length > 0){
            user = result.rows[0];
        }else{ //ELse store new user in the database
            const newUser: QueryResult<User> = await db.query("INSERT INTO usermone (google_id,firstname,lastname,email) VALUES ($1,$2,$3,$4) RETURNING *", 
                [profile.id.toString(), firstName,lastName,userEmail]
            )

            user = newUser.rows[0]; // Assign the newly created user
        }
        return done(null, user);  // Pass the user object to the next middleware
     } catch (error) {
        console.log(error);
        return(error);
     }
} ))

// Serialize user: Stores only the user ID in the session for efficiency
// This helps keep the session data lightweight instead of storing the whole user object
passport.serializeUser((user:Express.User, done) => {
    done(null, (user as User).id);
  });
  

// Deserialize user: Retrieves the full user data from the database using the stored ID
// This happens on every request after authentication to keep user data fresh and secure
passport.deserializeUser(async (id: number, done) => {
    try {
      const result: QueryResult<User> = await db.query("SELECT * FROM usermone WHERE id = $1", [id]);
      const user = result.rows[0];
  
      if (user) {
        done(null, user); // Pass the full user object
      } else {
        done(new Error("User not found"), null);
      }
    } catch (err) {
      done(err, null);
    }
  });
  

