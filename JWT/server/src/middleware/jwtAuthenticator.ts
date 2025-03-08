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
    try {
        // 1️⃣ Extract token from Authorization header
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "No token, authorization denied" });
            return;
        }

        const token = authHeader.split(" ")[1];

        // 2️⃣ Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        // 3️⃣ Fetch user details from the database
        const userQuery = await db.query("SELECT id, firstname, lastname, email FROM usermone WHERE id = $1", [decoded.id]);

        if (userQuery.rows.length === 0) {
           res.status(401).json({ message: "User not found" });
           return;
        }

        // 4️⃣ Attach user data to request
        req.user = userQuery.rows[0];

        // 5️⃣ Continue to next middleware
        next();
    } catch (error) {
        console.error("JWT Auth Error:", error);
         res.status(401).json({ message: "Invalid or expired token" });
         return;
    }
};

export default jwtAuthenticator;
