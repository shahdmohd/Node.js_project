import mongoose, { Schema, model } from "mongoose";
import orderItemModel from "./OrderItem.model.js";

const orderSchema = new mongoose.Schema({
    items: {
        type: [orderItemModel.schema],
        required: [true, "Items are required"],   
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "User",
        required: [true, "User is required"]
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Payment",
        required: false
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    },
    totalAmount: {
        type: Number,
        required: false
    }
}, {
    timestamps: true,      
    versionKey: false 
});

const orderModel = model("Order", orderSchema);
export default orderModel;