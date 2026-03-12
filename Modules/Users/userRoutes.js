import express from "express";
import {signin, signup, verifyAccount, getProfile }from "./userController.js"; 
import hashPassword from "../../Middleware/User/hashPassword.js";
import checkEmail from "../../Middleware/User/CheckEmail.js";
import verifyToken from "../../Middleware/verifyToken.js";

// import validationMiddleWareUSER from "../../Middleware/userValidationMiddleware.js";


let userRoutes = express.Router();

// userRoutes.get("/users", listUsers);
userRoutes.post("/signup",checkEmail,hashPassword, signup);
userRoutes.post("/signin",checkEmail, signin)
userRoutes.get("/verify/:email",verifyAccount)
userRoutes.get("/profile",verifyToken,getProfile)

export default userRoutes

