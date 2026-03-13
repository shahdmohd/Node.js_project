import express from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "./wishlistController.js";
import verifyToken from "../../Middleware/verifyToken.js";
import { authorizeRoles } from "../../Middleware/roleMiddleware.js";
import validationMiddleware, { paramsValidationMiddleware } from "../../Middleware/validationMiddleware.js";
import { addWishlistSchema, removeWishlistSchema } from "../../Validation/wishlistValidation.js";

let wishlistRoutes = express.Router();

wishlistRoutes.use(verifyToken);
wishlistRoutes.get("/wishlist", authorizeRoles("customer", "seller"), getWishlist);
wishlistRoutes.post("/wishlist", authorizeRoles("customer", "seller"), validationMiddleware(addWishlistSchema), addToWishlist);
wishlistRoutes.delete("/wishlist/:productId", authorizeRoles("customer", "seller"), paramsValidationMiddleware(removeWishlistSchema), removeFromWishlist);

export default wishlistRoutes