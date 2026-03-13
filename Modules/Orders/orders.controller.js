import orderModel from "../../Database/Models/Orders.model.js";
import Order from "../../Database/Models/Orders.model.js";

let placeOrder = async (req, res) => {
    req.body.user = req.decoded._id;
    let newOrder = await orderModel.create(req.body);
    let populatedOrder = await orderModel.findById(newOrder._id).populate("items").populate("user");
    await populatedOrder.save();
    res.status(201).json({ message: "Order placed successfully", data: populatedOrder });
}

let getOrders = async (req, res) => {
    let orders = await Order.find({ user: req.decoded._id }).populate("items").populate("user");
    res.status(200).json({ message: "List of Orders", data: orders });
}

let getOrderById = async (req, res) => {
    let { orderID } = req.params;
    let order = await Order.findById(orderID).populate("items").populate("user");
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order details", data: order });
}

let updateStatus = async (req, res) => {
    let { orderID } = req.params;
    let { status } = req.body;
    let order = await Order.findByIdAndUpdate(orderID, { status }, { new: true });
    res.status(200).json({ message: "Order status updated", data: order });
}

let cancelOrder = async (req, res) => {
    let { orderID } = req.params;
    let order = await Order.findByIdAndUpdate(orderID, { status: "Cancelled" }, { new: true });
    res.status(200).json({ message: "Order cancelled successfully", data: order });
}


export { placeOrder, getOrders, getOrderById, updateStatus, cancelOrder };