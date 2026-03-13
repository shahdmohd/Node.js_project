import express from "express";
import {canUseAccount} from "../../Middleware/Admin/adminMiddleware.js";
import {signin, signup, verifyAccount,getProfile,deleteProfile,updateProfile,changePassword }from "./userController.js"; 
import hashPassword from "../../Middleware/User/hashPassword.js";
import checkEmail from "../../Middleware/User/CheckEmail.js";
import verifyToken from "../../Middleware/verifyToken.js";
import { authorizeRoles } from "../../Middleware/roleMiddleware.js";
import validationMiddleware from "../../Middleware/validationMiddleware.js";
import { userSignupSchema, userUpdateSchema, changePasswordSchema } from "../../Validation/userValidation.js";


// import validationMiddleWareUSER from "../../Middleware/userValidationMiddleware.js";


let userRoutes = express.Router();

userRoutes.post("/signup", validationMiddleware(userSignupSchema), checkEmail, hashPassword, signup);
userRoutes.post("/signin",checkEmail, signin);
userRoutes.get("/verify/:email", verifyAccount);

userRoutes.get("/profile", verifyToken, canUseAccount, getProfile) 
userRoutes.put("/updateprofile", verifyToken, authorizeRoles("customer", "seller"), validationMiddleware(userUpdateSchema), updateProfile); 
userRoutes.put("/changepassword", verifyToken, validationMiddleware(changePasswordSchema), changePassword); 
userRoutes.delete("/deleteprofile", verifyToken, authorizeRoles("customer", "seller"), deleteProfile); 
export default userRoutes

