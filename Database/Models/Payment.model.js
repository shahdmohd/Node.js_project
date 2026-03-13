import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0.01, "Price must be greater than zero"],
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"]
    },
    quantity: {
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer"
        },
        required: [true, "Quantity is required"]
    }
}, {
    versionKey: false 
});

export const orderItemModel = mongoose.model("OrderItem", orderItemSchema);
