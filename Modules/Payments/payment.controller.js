import paymentModel from "../../Database/Models/Payment.model.js";
import orderModel from "../../Database/Models/Orders.model.js";
import userModel from "../../Database/Models/User.model.js";
import { createIntention, buildCheckoutUrl } from "./payment.service.js";

async function initiatePayment(req, res) {
  try {
    const userId = req.decoded._id;
    const { order, currency } = req.body;

    if (!order) {
      return res.status(400).json({ message: "order is required" });
    }

    const existingOrder = await orderModel.findById(order).populate({
      path: "items",
      populate: {
        path: "product"
      }
    });
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (existingOrder.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized: Order does not belong to this user" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const billingData = {
      apartment: "N/A",
      email: user.email,
      floor: "N/A",
      first_name: user.name || "User",
      last_name: user.name || "User",
      phone_number: user.phone && user.phone.trim() ? user.phone : "+20100000000",
      postal_code: "12345",
      street: user.address || "N/A",
      city: "Cairo",
      country: "EG",
      state: "Cairo"
    };

    const paymentData = {
      order,
      user: userId,
      amount: existingOrder.totalAmount,
      currency: currency || "EGP",
      status: "pending"
    };
    let newPayment = await paymentModel.create(paymentData);

    const intention = await createIntention({
      amount: existingOrder.totalAmount,
      currency: currency || "EGP",
      orderId: order,
      billingData,
      items: existingOrder.items
    });

    const checkoutUrl = buildCheckoutUrl(intention.client_secret);

    return res.status(200).json({
      success: true,
      clientSecret: intention.client_secret,
      checkoutUrl,
      paymentId: newPayment._id,
      message: "Payment intention created successfully"
    });
  } catch (error) {
    console.error("Payment initiation error:", error);
    
    if (error.response?.data) {
      return res.status(error.response.status || 500).json({ 
        message: "Paymob API Error",
        error: error.response.data 
      });
    }
    
    return res.status(500).json({ 
      message: "Failed to initiate payment", 
      error: error.message 
    });
  }
}

async function getPayments(req, res) {
  try {
    const userId = req.decoded._id;
    const payments = await paymentModel.find({ user: userId }).populate("order");
    return res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error("Get payments error:", error);
    return res.status(500).json({ message: "Failed to retrieve payments", error: error.message });
  }
}

async function getAllPayments(req, res) {
  try {
    const payments = await paymentModel.find().populate("order");
    return res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error("Get payments error:", error);
    return res.status(500).json({ message: "Failed to retrieve payments", error: error.message });
  }
}

export { initiatePayment, getPayments, getAllPayments };