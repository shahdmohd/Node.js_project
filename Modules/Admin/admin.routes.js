import express from "express";
import {listUsers, getUser, approveUser, restrictUser, unrestrictUser, deleteUser, getProduct, approveProduct, unapproveProduct} from "./admin.controller.js"
import { listProducts, addProduct, deleteProduct, getProductByID } from "../Product/Product.Controller.js";
import {isAdmin, canUseAccount} from "../../Middleware/Admin/adminMiddleware.js";
const adminRoutes = express.Router();

adminRoutes.use(isAdmin) 

adminRoutes.get("/admin/users/", isAdmin, listUsers);
adminRoutes.get("/admin/users/:id", getUser);
adminRoutes.put("/admin/users/:id/approve", isAdmin, approveUser);
adminRoutes.put("/admin/users/:id/restrict", isAdmin, restrictUser);
adminRoutes.put("/admin/users/:id/unrestrict", isAdmin, unrestrictUser);
// adminRoutes.delete("/admin/users/:id/delete", deleteUser);
adminRoutes.get("/admin/products", listProducts);
adminRoutes.get("/admin/products/:id", getProduct);
adminRoutes.put("/admin/products/:id/approve", approveProduct);
adminRoutes.put("/admin/products/:id/unapprove", unapproveProduct);
adminRoutes.delete("/admin/products/:id", deleteProduct);



export default adminRoutes;
