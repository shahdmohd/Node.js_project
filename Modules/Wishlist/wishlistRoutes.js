import express from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "./wishlistController.js";
import verifyToken from "../../Middleware/verifyToken.js";

let wishlistRoutes = express.Router();

wishlistRoutes.use(verifyToken);
wishlistRoutes.get("/wishlist", getWishlist);
wishlistRoutes.post("/wishlist", addToWishlist);
wishlistRoutes.delete("/wishlist/:productId", removeFromWishlist);

export default wishlistRoutes