import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../config/db"; // Import your database connection

dotenv.config();

/* Define AuthRequest to include user */
interface AuthRequest extends Request {
    user?: any;
}

const jwtAuthenticator = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.header("Authorization")?.split(" ")[1];

    if (!authHeader) {
       res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        // 1️. Verify the JWT token
        const decoded = jwt.verify(authHeader!, process.env.JWT_SECRET as string) as { id: string };

        // 2️. Fetch user details from the database
        const userQuery = await db.query("SELECT id, firstname, lastname, email FROM usermone WHERE id = $1", [decoded.id]);

        if (userQuery.rows.length === 0) {
             res.status(401).json({ message: "User not found" });
        }

        // 3️. Attach full user data to request
        req.user = userQuery.rows[0];

        // 4️. Continue to next middleware
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default jwtAuthenticator;
