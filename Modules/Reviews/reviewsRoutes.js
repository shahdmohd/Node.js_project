import express from 'express';
import { addReview, getReviews, deleteReview, updateReview } from './reviewsController.js';
import verifyToken from '../../Middleware/verifyToken.js';
import { authorizeRoles } from '../../Middleware/roleMiddleware.js';
import validationMiddleware, { paramsValidationMiddleware } from '../../Middleware/validationMiddleware.js';
import { addReviewSchema, updateReviewSchema, reviewIdParamSchema } from '../../Validation/reviewsValidation.js';
import { canUseAccount } from '../../Middleware/Admin/adminMiddleware.js';

let reviewsRoutes = express.Router();
reviewsRoutes.use(verifyToken);
reviewsRoutes.use(canUseAccount);

reviewsRoutes.get("/reviews", authorizeRoles("customer"), getReviews);
reviewsRoutes.post( "/reviews/addreview", authorizeRoles("customer"), validationMiddleware(addReviewSchema), addReview);
reviewsRoutes.put("/reviews/updatereview/:reviewId",authorizeRoles("customer"), paramsValidationMiddleware(reviewIdParamSchema),validationMiddleware(updateReviewSchema),updateReview);
reviewsRoutes.delete("/reviews/deletereview/:reviewId",authorizeRoles("customer"),paramsValidationMiddleware(reviewIdParamSchema),deleteReview);

export default reviewsRoutes;