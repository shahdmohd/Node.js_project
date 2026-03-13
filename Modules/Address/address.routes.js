import express from "express";
import verifyToken from "../../Middleware/verifyToken.js";
import { addAddress,getAddresses, getAddressById, updateAddress , deleteAddress } from "./address.controller.js"; 

let addressRoutes = express.Router();

addressRoutes.get("/address", verifyToken, getAddresses);
addressRoutes.get("/address/:addressID", verifyToken, getAddressById);
addressRoutes.post("/address", verifyToken, addAddress);
addressRoutes.put("/address/:addressID", verifyToken, updateAddress);
addressRoutes.delete("/address/:addressID", verifyToken, deleteAddress);

export default addressRoutes;
