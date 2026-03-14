import express from 'express';
import { createCoupon, getCoupons, updateCoupon, deleteCoupon } from './couponController.js';
import verifyToken from '../../Middleware/verifyToken.js';
import {authorizeRoles} from "../../Middleware/roleMiddleware.js"
import {canUseAccount} from "../../Middleware/Admin/adminMiddleware.js";

const couponRoutes = express.Router();
couponRoutes.use(verifyToken);
couponRoutes.use(canUseAccount);
couponRoutes.use(authorizeRoles("seller", "admin"));
couponRoutes.post('/coupons', createCoupon);
couponRoutes.get('/coupons', getCoupons);
couponRoutes.put('/coupons/:id', updateCoupon);
couponRoutes.delete('/coupons/:id', deleteCoupon);
export default couponRoutes;