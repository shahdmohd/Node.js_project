import express from "express";
import { listProducts, addProduct, deleteProduct, getProductByID, updateProduct } from "./Product.Controller.js";
import verifyToken from "../../Middleware/verifyToken.js";
import {authorizeRoles} from "../../Middleware/roleMiddleware.js"
import {canUseAccount} from "../../Middleware/Admin/adminMiddleware.js";

let productRoutes = express.Router();
//
productRoutes.use(verifyToken);
productRoutes.use(canUseAccount);
productRoutes.get("/products", listProducts);
productRoutes.get("/myProducts", getProductByID);
productRoutes.post("/products", authorizeRoles("seller"), addProduct);
productRoutes.delete("/products/:id", authorizeRoles("seller", "admin"), deleteProduct);
productRoutes.put("/products/:id", authorizeRoles("seller", "admin"), updateProduct);

export default productRoutes;

