import express from 'express';
import { addToCart, getCartItems, removeFromCart } from './cartController.js';
import verifyToken from '../../Middleware/verifytoken.js';

const cartRoutes = express.Router();
cartRoutes.use(verifyToken);

cartRoutes.post('/cart', addToCart);
cartRoutes.get('/cart', getCartItems);
cartRoutes.delete('/cart', removeFromCart);

export default cartRoutes;