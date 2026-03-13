import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        maxlength: 500
    }
}, {
    timestamps: true,
    versionKey: false
});

const reviewModel = model("Review", reviewSchema);

export default reviewModel;