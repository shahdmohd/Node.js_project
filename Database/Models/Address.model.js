import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    apartment: {
        type: String,
        required: [true, "Apartment is required"]
    },
    floor: {
        type: String,
        required: [true, "Floor is required"]
    },
    street: {
        type: String,
        required: [true, "Street is required"]
    },
    postal_code: {
        type: String,
        required: [true, "Postal code is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    }
}, {
    timestamps: true,
    versionKey: false
});

const addressModel = mongoose.model("Address", addressSchema);
export default addressModel;
