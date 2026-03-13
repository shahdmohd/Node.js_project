import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer"
        }
    }
}, {
    versionKey: false 
});

const orderItemModel = mongoose.model("OrderItem", orderItemSchema);
export default orderItemModel;
