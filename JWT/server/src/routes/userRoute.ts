import { Request,Response,NextFunction, Router } from "express";
import db from "../config/db";
import bcrypt from "bcryptjs";
import generateToken from "../utilities/jwtGenerator";

const route =  Router();

route.post("/register", async (req:Request, res:Response) =>{
    try {

    //gets user input from client side
    const{firstName, lastName, email, password} = req.body;

    //hash the password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //insert the user into db
    const queryData = `INSERT INTO usermone (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *`
    await db.query(queryData, [email, bcryptPassword, firstName, lastName]);

    res.status(200).json({message: "User successfully registered"})
        
    } catch (error) {
        res.status(401).json({message: " Error while registering"})
    }
    
})

route.post("/login", async (req:Request, res:Response) => {
    try {
        // 1. get user input from client side
        const{email, password} = req.body;

        //2. check if user exists in db
        const existingUser = await db.query("SELECT * FROM usermone WHERE email = $1", [email]);
         
        // If the length of the return value from step 22 is 0, the user does not exist.
        if(existingUser.rows.length === 0){
            res.status(401).json({message:"The following user does not exists"})
        }

        // 3. If the user exists in db, validate the user password with stored password with bcrypt
        const isPasswordValid = await bcrypt.compare(password, existingUser.rows[0].password)

        // If the validation does not pass retuen an error message
        if(!isPasswordValid){
            res.status(401).json({message: "Invalid Credentials"})
        }

        //4. If the password matches, Generate a JWT token and return it to client
        const generatedJwtToken = generateToken(existingUser.rows[0].id);
        res.json({generatedJwtToken});
    } catch (error) {
        
    }
})

export default route;