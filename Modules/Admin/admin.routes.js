import express from "express";
import {listUsers, getUser, approveUser, restrictUser, unrestrictUser, deleteUser} from "./admin.controller.js"
import {isAdmin, canUseAccount} from "../../Middleware/Admin/adminMiddleware.js";
const adminRoutes = express.Router();

adminRoutes.use(isAdmin) 

adminRoutes.get("/admin/users/", listUsers);
adminRoutes.get("/admin/users/:id", getUser);
adminRoutes.put("/admin/users/:id/approve", approveUser);
adminRoutes.put("/admin/users/:id/restrict", restrictUser);
adminRoutes.put("/admin/users/:id/unrestrict", unrestrictUser);
// adminRoutes.delete("/admin/users/:id/delete", deleteUser);

export default adminRoutes;
