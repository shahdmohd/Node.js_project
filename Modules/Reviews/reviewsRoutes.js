import express from 'express';
import { addReview,getReviews,deleteReview,updateReview } from './reviewsController.js';
import verifyToken from '../../Middleware/verifyToken.js';
import { authorizeRoles } from '../../Middleware/roleMiddleware.js';

let reviewsRoutes = express.Router();
reviewsRoutes.use(verifyToken);

reviewsRoutes.get("/reviews",authorizeRoles("customer"),getReviews);
reviewsRoutes.post("/reviews/addreview",authorizeRoles("customer"), addReview);
reviewsRoutes.put("/reviews/updatereview/:reviewId", authorizeRoles("customer"), updateReview);
reviewsRoutes.delete("/reviews/deletereview/:reviewId", authorizeRoles("customer"), deleteReview);

export default reviewsRoutes;