import express from "express";
import { listCategories, addCategory, deleteCategory, getCategoryByID, updateCategory  } from "./Category.Controller.js";
const router = express.Router();

let categoryRoutes = express.Router();


router.post("/category", addCategory);

router.get("/category", listCategories);

router.get("/category/:id", getCategoryByID);

router.put("/category/:id", updateCategory);

router.delete("/category/:id", deleteCategory);

export default categoryRoutes;