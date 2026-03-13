import express from 'express';
import { addToCart, removeFromCart, getCart } from './cartController.js';
import verifyToken from '../../Middleware/verifytoken.js';

const cartRoutes = express.Router();
cartRoutes.use(verifyToken);

cartRoutes.post('/addToCart', addToCart);
cartRoutes.get('/getCart', getCart);
cartRoutes.delete('/removeFromCart', removeFromCart);

export default cartRoutes;