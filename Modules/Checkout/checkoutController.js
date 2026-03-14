/*
checkout:
load cart items with product prices
calculate total price
validate promo code and calculate discounts
create order with user details, items, total price, and applied discounts
clear cart after successful checkout
apply coupon discount only if the products in the cart match the products in the coupon
*/
import CartModel from "../../Database/Models/Cart.model.js";
import CouponModel from "../../Database/Models/coupon.model.js";
import OrderModel from "../../Database/Models/Orders.model.js";

export const checkout = async (req, res) => {
    try {
        const userId = req.user._id;
        const { promoCode } = req.body;
        const cart = await CartModel.findOne({ userId }).populate("items.productId");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        let totalPrice = 0;
        cart.items.forEach(item => {
            totalPrice += item.productId.price * item.quantity;
        });
        let discount = 0;
        if (promoCode) {
            const coupon = await CouponModel.findOne({ code: promoCode, isActive: true, startDate: { $lte: new Date() }, expiryDate: { $gte: new Date() } });
            if (!coupon) {
                return res.status(400).json({ message: "Invalid or expired promo code" });
            }

            const applicableProducts = cart.items.filter(item =>
               coupon.products.some(p => p.equals(item.productId._id))
           );

            if (applicableProducts.length === 0) {
               return res.status(400).json({ message: "Promo code does not apply to any products in the cart" });
            }

            let eligibleTotal = 0;
            applicableProducts.forEach(item => {
               eligibleTotal += item.productId.price * item.quantity;
            });

            if (coupon.type === "percentage") {
              discount = eligibleTotal * (coupon.value / 100);
            } else if (coupon.type === "fixed") {
                discount = Math.min(coupon.value, eligibleTotal); 
           }
           }
         const finalTotal = totalPrice - discount;
         const orderItems = cart.items.map(item => ({
            product: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }));

        const order = await OrderModel.create({
            user: userId,
            items: orderItems,
            totalAmount: finalTotal,
            discount: discount,
            status: "pending"
        });
        await CartModel.deleteOne({ userId });
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};