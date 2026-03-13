import express from "express";
import verifyToken from "../../Middleware/verifyToken.js";
import { placeOrder, getOrders, cancelOrder, updateStatus, getOrderById}
from "./orders.controller.js"; 

let orderRoutes = express.Router();

orderRoutes.get("/orders", verifyToken, getOrders);
orderRoutes.get("/orders/:orderID", verifyToken, getOrderById);
orderRoutes.post("/orders", verifyToken, placeOrder);
orderRoutes.post("/orders/:orderID/cancel", verifyToken, cancelOrder);
orderRoutes.post("/orders/:orderID/status", verifyToken, updateStatus);

export default orderRoutes
