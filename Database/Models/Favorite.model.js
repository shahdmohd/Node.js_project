import mongoose from "mongoose";
import { Schema, model } from "mongoose";


const favoriteSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

const favoriteModel = model("Favorite", favoriteSchema);
export default favoriteModel