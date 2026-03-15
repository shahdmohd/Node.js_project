import express from "express";
import verifyToken from "../../Middleware/verifyToken.js";
import { authorizeRoles } from "../../Middleware/roleMiddleware.js";
import { placeOrder, getOrders, cancelOrder, updateStatus, getOrderById, getAllOrders }
from "./orders.controller.js"; 
import { canUseAccount } from '../../Middleware/Admin/adminMiddleware.js';

let orderRoutes = express.Router();
orderRoutes.use(verifyToken);
orderRoutes.use(canUseAccount);

orderRoutes.get("/orders", verifyToken, getOrders);
orderRoutes.get("/allorders", verifyToken, authorizeRoles("admin"), getAllOrders);
orderRoutes.get("/orders/:orderID", verifyToken, getOrderById);
orderRoutes.post("/orders", verifyToken, placeOrder);
orderRoutes.post("/orders/:orderID/cancel", verifyToken, cancelOrder);
orderRoutes.post("/orders/:orderID/status", verifyToken, authorizeRoles("admin"), updateStatus);

export default orderRoutes
