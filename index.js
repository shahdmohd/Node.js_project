import express from "express";
import  globalError  from "./Middleware/User/CatchError.js";
import { connection } from "./Database/dbconnect.js";
import userRoutes from "./Modules/Users/userRoutes.js";
import wishlistRoutes from "./Modules/Wishlist/wishlistRoutes.js";
import favoriteRoutes from "./Modules/Favorites/favoriteRoutes.js";

import adminRoutes from "./Modules/Admin/admin.routes.js";
import categoryRoutes from "./Modules/Category/Category.Routes.js";
import productRoutes from "./Modules/Product/Product.Routes.js";
import reviewsRoutes from "./Modules/Reviews/reviewsRoutes.js";


const app = express();


app.use(express.json());
app.use(userRoutes);
app.use(wishlistRoutes);
app.use(favoriteRoutes);
app.use(reviewsRoutes);
app.use(globalError);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(adminRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
