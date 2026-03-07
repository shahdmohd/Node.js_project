import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "mongodb://root:123@localhost:27017/myapp";

export const connection = mongoose.connect(mongoURI, {
    authSource: "admin"
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("MongoDB Connection Error:", err));