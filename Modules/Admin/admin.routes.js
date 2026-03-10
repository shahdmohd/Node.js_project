import express from "express";
import {getUser, restrictUser} from "./admin.controller.js"
import isAdmin from "../../Middleware/Admin/adminMiddleware.js";
const adminRoutes = express.Router();

adminRoutes.use(isAdmin) 

adminRoutes.get("/users/:id", getUser);
adminRoutes.put("/users/:id/restrict", restrictUser);


export default adminRoutes;
