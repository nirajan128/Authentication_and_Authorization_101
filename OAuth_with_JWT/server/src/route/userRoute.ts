import { Router,Request,Response } from "express";
import db from "../config/db";
import bcrypt from "bcryptjs";
import generateToken from "../utilities/jwtGenerator";
import passport from "passport";
import { error } from "console";

//set up router
const route = Router();

//Register Logic
route.post("/register", async (req:Request, res:Response) => {
    try {
      //1. get the user inputs from frontend
      const{email, firstname,lastname,password} = req.body;

      //2. hash and salt the password using bcrypt
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(password, salt);

      //3. check in the db if there is a user with the email address provided
      const userExists = await db.query("SELECT * FROM usermone WHERE email = $1", [email]);

      //4. If there is return and json with error message
      if(userExists.rows.length > 0){
        res.status(401).json({error: "User exists"});
        return
      }

      //5. If not run db query to insert the user in to db
      const queryData = `INSERT INTO usermone (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *`
      await db.query(queryData, [email, bcryptPassword, firstname, lastname]);

    
      //6. return a success satus code
      res.status(200).json({message: "User successfully registered"})

      //7. TO TEST INCLUDE THE USER INPUT AS JSON IN THE BODY
        
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Error while registering"})
    }
  
})

//Login logic
route.post("/login", async(req:Request, res: Response)=>{
    try {
        //1. Get the user email and password from frontend
        const{email, password} = req.body;

        //2. Check the the provided user exist in db using email
         const existingUser = await db.query("SELECT * FROM usermone WHERE email = $1", [email]);

        //3. If the user does not exists return and error status code and message
        if(existingUser.rows.length == 0){
            res.status(401).json({error: "User does not exist"});
            return
        }

        //4. If user does exists hash the provided password and vrify it with hased password in db using bcrypt.compare
        const isPasswordValid = await bcrypt.compare(password,existingUser.rows[0].password);

        //5. If password does not match(false) return an error message with status code
        if(!isPasswordValid){
            res.status(401).json({error: "User does not exist"});
            return
        }

        //6. If password matches(true) call jwtGenerator util and pass user id as param
        const token = generateToken(existingUser.rows[0].id)
       
        //7. send the token as a response
        res.json(token);

        // TO TEST INCLUDE THE USER INPUT AS JSON IN THE BODY
    } catch (error) {
        
    }
})

//[GOOGLE ROUTES]
route.get("/google",passport.authenticate("google", {scope:['profile', 'email']}))

route.get("/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
      const token = generateToken((req.user as any).id);

      //Sends back the token as url, In the fornt end the Authcontext looks for this token, if found calls login passes the token and sets the token
      res.redirect(`http://localhost:5173?token=${token}`);
    }
  );

export default route;