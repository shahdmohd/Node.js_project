import express from "express";
import {listUsers, getUser, approveUser, restrictUser, unrestrictUser, deleteUser, getProducts, getProduct, approveProduct, unapproveProduct} from "./admin.controller.js"
import { listProducts, deleteProduct } from "../Product/Product.Controller.js";
import {isAdmin, canUseAccount} from "../../Middleware/Admin/adminMiddleware.js";
const adminRoutes = express.Router();

adminRoutes.use(isAdmin) 

adminRoutes.get("/admin/users/", listUsers);
adminRoutes.get("/admin/users/:id", getUser);
adminRoutes.put("/admin/users/:id/approve", approveUser);
adminRoutes.put("/admin/users/:id/restrict", restrictUser);
adminRoutes.put("/admin/users/:id/unrestrict", unrestrictUser);
adminRoutes.delete("/admin/users/:id/delete", deleteUser);
adminRoutes.get("/admin/products", getProducts);
adminRoutes.get("/admin/products/:id", getProduct);
adminRoutes.put("/admin/products/:id/approve", approveProduct);
adminRoutes.put("/admin/products/:id/unapprove", unapproveProduct);
adminRoutes.delete("/admin/products/:id", deleteProduct);



export default adminRoutes;
