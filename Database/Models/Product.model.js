import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    image: {
        type: [String]//type: array of strings -> bec the product may have more than one image
    }, 
     category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ratingsAverage: { // the avg rating of the product 
        type: Number,
        default: 0
    },

    ratingsQuantity: {
        type: Number,
        default: 0
    },
    isApproved: {
        type: Boolean,
        default: false
    }
})

const Product = mongoose.model("Product", productSchema);

export default Product;