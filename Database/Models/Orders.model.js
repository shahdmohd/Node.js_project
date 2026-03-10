import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    items: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "OrderItem",
        required: [true, "Items are required"],   
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "User",
        required: [true, "User is required"]
    },
    paymentID: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Payment",
        required: [true, "Payment is required"]
    },
    addressID: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Address",
        required: [true, "Address is required"]
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    },
    totalAmount: {
        type: Number,
        required: [true, "Total amount is required"],
        min: [0, "Total amount cannot be negative"]
    },
    placedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,      
    versionKey: false 
});

export const orderModel = mongoose.model("Order", orderSchema);
