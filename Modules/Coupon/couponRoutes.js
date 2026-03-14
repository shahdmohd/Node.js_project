import express from 'express';
import { createCoupon, getCoupons, updateCoupon, deleteCoupon } from './couponController.js';
import verifyToken from '../../Middleware/verifyToken.js';

const couponRoutes = express.Router();
couponRoutes.use(verifyToken);
couponRoutes.post('/coupons', createCoupon);
couponRoutes.get('/coupons', getCoupons);
couponRoutes.put('/coupons/:id', updateCoupon);
couponRoutes.delete('/coupons/:id', deleteCoupon);
export default couponRoutes;