import jwt from "jsonwebtoken";
import userModel from "../Database/Models/User.model.js";

let verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, "Ecommerce");

    const user = await userModel.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.decoded = decoded;
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default verifyToken;
