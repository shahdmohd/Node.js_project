import "dotenv/config";
import express from "express";
import  globalError  from "./Middleware/User/CatchError.js";
import { connection } from "./Database/dbconnect.js";
import userRoutes from "./Modules/Users/userRoutes.js";
import wishlistRoutes from "./Modules/Wishlist/wishlistRoutes.js";
import favoriteRoutes from "./Modules/Favorites/favoriteRoutes.js";

import adminRoutes from "./Modules/Admin/admin.routes.js";
import reviewsRoutes from "./Modules/Reviews/reviewsRoutes.js";
import categoryRoutes from "./Modules/Category/Category.Routes.js";
import productRoutes from "./Modules/Product/Product.Routes.js";
import cartRoutes from "./Modules/Cart/cartRoutes.js";
import checkoutRoutes from "./Modules/Checkout/checkoutRoutes.js";
import couponRoutes from "./Modules/Coupon/couponRoutes.js";
//import paymentRoutes from "./Modules/Payments/payment.routes.js";

const app = express();
    

app.use(express.json());
app.use(userRoutes);
app.use(wishlistRoutes);
app.use(favoriteRoutes);
app.use(reviewsRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(checkoutRoutes);
app.use(couponRoutes);
//app.use(paymentRoutes)
app.use(adminRoutes);
app.use(globalError);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
