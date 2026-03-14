import orderModel from "../../Database/Models/Orders.model.js";
import Product from "../../Database/Models/Product.model.js";

let placeOrder = async (req, res) => {
    req.body.user = req.decoded._id;
    let newOrder = await orderModel.create(req.body);
    let populatedOrder = await orderModel.findById(newOrder._id).populate({
        path: "items",
        populate: {
            path: "product"
        }
    }).populate("user");
    
    if (!populatedOrder.totalAmount) {
        let totalAmount = 0;
        populatedOrder.items.forEach(item => {
            totalAmount += item.product.price * item.quantity;
        });
        populatedOrder.totalAmount = totalAmount;
    }

    await populatedOrder.save();
    res.status(201).json({ message: "Order placed successfully", data: populatedOrder });
}

let getOrders = async (req, res) => {
    let orders = await orderModel.find({ user: req.decoded._id }).populate({
        path: "items",
        populate: {
            path: "product"
        }
    }).populate("user");
    res.status(200).json({ message: "List of Orders", data: orders });
}

let getAllOrders = async (req, res) => {
    let orders = await orderModel.find().populate({
        path: "items",
        populate: {
            path: "product"
        }
    }).populate("user");
    res.status(200).json({ message: "List of Orders", data: orders });
}

let getOrderById = async (req, res) => {
    let { orderID } = req.params;
    let orders = await orderModel.find({ user: req.decoded._id }).populate({
        path: "items",
        populate: {
            path: "product"
        }
    }).populate("user");
    if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order details", data: orders[0] });
}

let updateStatus = async (req, res) => {
    let { orderID } = req.params;
    let { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "status is required" });
    }

    let order = await orderModel.findById(orderID);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", data: order });
}

let cancelOrder = async (req, res) => {
    let { orderID } = req.params;
    let order = await orderModel.findById(orderID);
    
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.decoded._id.toString()) {
        return res.status(403).json({ message: "You can only cancel your own orders" });
    }

    if (order.status !== "pending") {
        return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", data: order });
}


export { placeOrder, getOrders, getOrderById, updateStatus, cancelOrder, getAllOrders };