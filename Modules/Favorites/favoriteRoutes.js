import express from 'express';
import { getFavorites, addFavorite, removeFromFavorites } from './favoriteController.js';
import verifyToken from '../../Middleware/verifyToken.js';
import { authorizeRoles } from '../../Middleware/roleMiddleware.js';
import validationMiddleware, { paramsValidationMiddleware } from '../../Middleware/validationMiddleware.js';
import { addFavoriteSchema, removeFavoriteSchema } from '../../Validation/favoriteValidation.js';
import { canUseAccount } from '../../Middleware/Admin/adminMiddleware.js';

let favoriteRoutes = express.Router();
favoriteRoutes.use(verifyToken);
favoriteRoutes.use(canUseAccount);

favoriteRoutes.get("/favorites", authorizeRoles("customer", "seller"), getFavorites);
favoriteRoutes.post("/favorites", authorizeRoles("customer", "seller"), validationMiddleware(addFavoriteSchema), addFavorite);
favoriteRoutes.delete("/favorites/:productId", authorizeRoles("customer", "seller"), paramsValidationMiddleware(removeFavoriteSchema), removeFromFavorites);

export default favoriteRoutes;