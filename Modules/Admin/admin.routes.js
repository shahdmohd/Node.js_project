import express from "express";
import {listUsers, getUser, restrictUser, unrestrictUser, deactivateUser, activateUser} from "./admin.controller.js"
import isAdmin from "../../Middleware/Admin/adminMiddleware.js";
const adminRoutes = express.Router();

adminRoutes.use(isAdmin) 

adminRoutes.get("/admin/users/", listUsers);
adminRoutes.get("/admin/users/:id", getUser);
adminRoutes.put("/admin/users/:id/restrict", restrictUser);
adminRoutes.put("/admin/users/:id/unrestrict", unrestrictUser);
adminRoutes.delete("/admin/users/:id/deactivate", deactivateUser);
adminRoutes.put("/admin/users/:id/activate", activateUser);

export default adminRoutes;
