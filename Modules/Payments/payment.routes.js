import express from "express";
import verifyToken from "../../Middleware/verifyToken.js";
import { authorizeRoles } from "../../Middleware/roleMiddleware.js";
import { initiatePayment, getPayments, getAllPayments }from "./payment.controller.js";

let paymentRoutes = express.Router();

paymentRoutes.post("/create-payment", verifyToken, initiatePayment);
paymentRoutes.get("/payments", verifyToken, getPayments );
paymentRoutes.get("/all-payments", verifyToken, authorizeRoles("admin"), getAllPayments );

export default paymentRoutes