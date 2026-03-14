import express from 'express';
import { addToCart, removeFromCart, getCart } from './cartController.js';
import verifyToken from '../../Middleware/verifyToken.js';
import { canUseAccount } from '../../Middleware/Admin/adminMiddleware.js';

const cartRoutes = express.Router();
cartRoutes.use(verifyToken);
cartRoutes.use(canUseAccount);

cartRoutes.post('/addToCart', addToCart);
cartRoutes.get('/getCart', getCart);
cartRoutes.delete('/removeFromCart', removeFromCart);

export default cartRoutes;