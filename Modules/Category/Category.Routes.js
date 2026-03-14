import express from "express";
import { listCategories, addCategory, deleteCategory, getCategoryByID, updateCategory  } from "./Category.Controller.js";
import { authorizeRoles } from "../../Middleware/roleMiddleware.js";
import { canUseAccount } from '../../Middleware/Admin/adminMiddleware.js';

let categoryRoutes = express.Router();
categoryRoutes.use(canUseAccount);

categoryRoutes.post("/category", authorizeRoles("seller", "admin"), addCategory);

categoryRoutes.get("/category", listCategories);

categoryRoutes.get("/category/:id", getCategoryByID);

categoryRoutes.put("/category/:id", authorizeRoles("seller", "admin"), updateCategory);

categoryRoutes.delete("/category/:id", authorizeRoles("seller", "admin"), deleteCategory);

export default categoryRoutes;