import express from "express";
import { listCategories, addCategory, deleteCategory, getCategoryByID, updateCategory  } from "./Category.Controller.js";

let categoryRoutes = express.Router();

categoryRoutes.post("/category", addCategory);

categoryRoutes.get("/category", listCategories);

categoryRoutes.get("/category/:id", getCategoryByID);

categoryRoutes.put("/category/:id", updateCategory);

categoryRoutes.delete("/category/:id", deleteCategory);

export default categoryRoutes;