import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: [true, "Order ID is required"]
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    currency: {
        type: String,
        default: "EGP",
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0.01, "Amount must be greater than zero"]
    },
    paidAt: {
        type: Date
    }
}, {
    timestamps: true,
    versionKey: false
});

const paymentModel = mongoose.model("Payment", paymentSchema);
export default paymentModel;
