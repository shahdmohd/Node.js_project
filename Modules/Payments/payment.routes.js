import express from "express";
import { initiatePayment } from "./payment.controller.js";

let paymentRoutes = express.Router();

paymentRoutes.post("/create", initiatePayment);

export default paymentRoutes