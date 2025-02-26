/* eslint-disable no-unused-vars */
import dotenv from "dotenv";
import pg from "pg";
dotenv.config(); //since its not in the root directory

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

// Test the connection
db
  .connect()
  .then(() => console.log("Connected to Supabase PostgreSQL"))
  .catch((err: any) => {
    console.error("Error connecting to Supabase PostgreSQL");
    console.error("Error details:", err);
  });

export default db;