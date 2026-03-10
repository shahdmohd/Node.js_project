import express from 'express';
import { getFavorites, addFavorite, removeFromFavorites } from './favoriteController.js';
import verifyToken from '../../Middleware/verifyToken.js';

let favoriteRoutes = express.Router();
favoriteRoutes.use(verifyToken);

favoriteRoutes.get("/favorites", getFavorites);
favoriteRoutes.post("/favorites", addFavorite);
favoriteRoutes.delete("/favorites/:productId", removeFromFavorites);

export default favoriteRoutes;