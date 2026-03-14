import express from 'express';
import { checkout } from './checkoutController.js';
import verifyToken from '../../Middleware/verifyToken.js';

const checkoutRoutes = express.Router();
checkoutRoutes.use(verifyToken);
checkoutRoutes.post('/checkout', checkout);

export default checkoutRoutes;