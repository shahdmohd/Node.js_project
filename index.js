import "dotenv/config";
import express from "express";
import  globalError  from "./Middleware/User/CatchError.js";
import { connection } from "./Database/dbconnect.js";
import userRoutes from "./Modules/Users/userRoutes.js";
import paymentRoutes from "./Modules/Payments/payment.routes.js";

const app = express();


app.use(express.json());
app.use("/api/payment", paymentRoutes);
app.use(userRoutes);
app.use(globalError);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
