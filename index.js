import express from "express";
import  globalError  from "./Middleware/User/CatchError.js";
import { connection } from "./Database/dbconnect.js";
import userRoutes from "./Modules/Users/userRoutes.js";
import categoryRoutes from "./Modules/Category/Category.Routes.js";
import productRoutes from "./Modules/Product/Product.Routes.js";
import cartRoutes from "./Modules/Cart/cartRoutes.js";

const app = express();


app.use(express.json());
app.use(userRoutes);
app.use(globalError);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
