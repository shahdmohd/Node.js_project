import mongoose from "mongoose";

const mongoURI = "mongodb://localhost:27017/myapp";

export const connection = mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error:", err));