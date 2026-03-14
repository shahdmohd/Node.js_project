import CouponModel from "../../Database/Models/coupon.model.js";
const createCoupon = async (req, res) => {
    try {
        const { code, type, value, startDate, expiryDate } = req.body;
        const existingCoupon = await CouponModel.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ message: "Coupon code already exists" });
        }
        const coupon = await CouponModel.create({ code, type, value, startDate, expiryDate });
        res.status(201).json({ message: "Coupon created successfully", coupon });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getCoupons = async (req, res) => {
    try {
        const coupons = await CouponModel.find();
        res.status(200).json({ coupons });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, type, value, startDate, expiryDate } = req.body;
        const coupon = await CouponModel.findByIdAndUpdate(id, { code, type, value, startDate, expiryDate }, { new: true });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        res.status(200).json({ message: "Coupon updated successfully", coupon });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await CouponModel.findByIdAndDelete(id);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export { createCoupon, getCoupons, updateCoupon, deleteCoupon };

