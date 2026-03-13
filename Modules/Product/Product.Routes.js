import express from "express";
import { listProducts, addProduct, deleteProduct, getProductByID, updateProduct } from "./Product.Controller.js";
import verifyToken from "../../Middleware/verifyToken.js";


let productRoutes = express.Router();
//
//productRoutes.use(verifyToken); //apply the verifyToken middleware to all the routes in this router
// productRoutes.get("/products",verifyToken, listPosts);
productRoutes.get("/products", listProducts);
productRoutes.get("/myProducts", getProductByID);
// productRoutes.post("/products", verifyToken, createPost);
productRoutes.post("/products", addProduct);
// productRoutes.delete("/products/:id", verifyToken, deletePost);
productRoutes.delete("/products/:id",  deleteProduct);
// productRoutes.put("/products/:id", verifyToken, updatePost);
productRoutes.put("/products/:id",  updateProduct);


export default productRoutes;

