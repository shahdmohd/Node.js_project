import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    type: {
        type: String,
        enum: ["percentage", "fixed"],
        required: true,
        default: "percentage"
    },
    value: {
        type: Number,
        required: true,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    startDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
}, { timestamps: true, versionKey: false });

const CouponModel = mongoose.model("Coupon", couponSchema);

export default CouponModel;