import express from "express";
import { listProducts, addProduct, deleteProduct, getProductByID, updateProduct } from "./Product.Controller.js";
import verifyToken from "../../Middleware/verifyToken.js";


let productRoutes = express.Router();
//
productRoutes.use(verifyToken); 
productRoutes.get("/products", listProducts);
productRoutes.get("/myProducts", getProductByID);
productRoutes.post("/products", addProduct);
productRoutes.delete("/products/:id",  deleteProduct);
productRoutes.put("/products/:id",  updateProduct);


export default productRoutes;

