"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = __importDefault(require("pg"));
dotenv_1.default.config(); //since its not in the root directory
const db = new pg_1.default.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
});
// Test the connection
db
    .connect()
    .then(() => console.log("Connected to Supabase PostgreSQL"))
    .catch((err) => {
    console.error("Error connecting to Supabase PostgreSQL");
    console.error("Error details:", err);
});
exports.default = db;
