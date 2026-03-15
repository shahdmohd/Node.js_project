import express from 'express';
import { checkout } from './checkoutController.js';
import verifyToken from '../../Middleware/verifyToken.js';
import { canUseAccount } from '../../Middleware/Admin/adminMiddleware.js';

const checkoutRoutes = express.Router();
checkoutRoutes.use(verifyToken);
checkoutRoutes.use(canUseAccount);
checkoutRoutes.post('/checkout', checkout);

export default checkoutRoutes;