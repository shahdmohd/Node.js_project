import "dotenv/config";
import express from "express";
import  globalError  from "./Middleware/User/CatchError.js";
import { connection } from "./Database/dbconnect.js";
import userRoutes from "./Modules/Users/userRoutes.js";
import categoryRoutes from "./Modules/Category/Category.Routes.js";
import productRoutes from "./Modules/Product/Product.Routes.js";
import paymentRoutes from "./Modules/Payments/payment.routes.js";

const app = express();


app.use(express.json());
app.use("/api/payment", paymentRoutes);
app.use(userRoutes);
app.use(globalError);
app.use(categoryRoutes);
app.use(productRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
