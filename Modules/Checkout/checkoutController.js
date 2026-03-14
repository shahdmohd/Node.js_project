/*
checkout:
load cart items with product prices
calculate total price
validate promo code and calculate discounts
create order with user details, items, total price, and applied discounts
payment methods (credit card, PayPal, cash on delivery, wallet)
clear cart after successful checkout
*/
import CartModel from "../../Database/Models/Cart.model.js";
import CouponModel from "../../Database/Models/coupon.model.js";
import OrderModel from "../../Database/Models/order.model.js";

export const checkout = async (req, res) => {
    try {
        const userId = req.user._id;
        const { paymentMethod, promoCode } = req.body;
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
            if (coupon.type === "percentage") {
                discount = (totalPrice * coupon.value) / 100;
            } else {
                discount = coupon.value;
            }
        }
        const finalTotal = totalPrice - discount;
        const orderItems = cart.items.map(item => ({
            product: item.productId._id,
            quantity: item.quantity
        }));
        const order = await OrderModel.create({
            user: userId,
            items: orderItems,
            total: finalTotal,
            discount: discount,
            paymentMethod: paymentMethod
        });
        await CartModel.deleteOne({ userId });
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};