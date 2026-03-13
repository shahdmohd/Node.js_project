import reviewModel from "../../Database/Models/Reviews.model.js";
import Product from "../../Database/Models/Product.model.js";
import mongoose from "mongoose";

let addReview = async (req, res) => {
    const userId = req.decoded._id;
    const { productId, rating, comment } = req.body;

     if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(400).json({ message: "Invalid Product ID format" });
        }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
     }

  if (!product.isApproved) {
  return res.status(403).json({ message: "Product not approved yet" });
  }
  
    try {
    
        const existingReview = await reviewModel.findOne({ userId, productId });
        if (existingReview) {
            return res.status(409).json({ message: "You have already reviewed this product" });
        }
        //  const newReview = new reviewModel({ userId, productId, rating, comment });
        const newReview = await reviewModel.create({ userId, productId, rating, comment });
        await newReview.populate("productId");
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

let getReviews = async (req, res) => {
    const userId=req.decoded._id;
    try {
        // const reviews = await reviewModel.find({ userId });
        const reviews = await reviewModel.find({ userId }).populate("productId");
        res.status(200).json({ message: "Reviews fetched successfully", reviews });
    
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

let updateReview = async (req, res) => {
    const userId = req.decoded._id;
    const { reviewId } = req.params;
        
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
                    return res.status(400).json({ message: "Invalid Review ID format" });
        }

    const {productId,rating, comment } = req.body;
     if (productId) {
        return res.status(400).json({ message: "Product ID cannot be updated" });
    }
    const updateData = {};
    if (rating !== undefined) updateData.rating = rating;
    if (comment !== undefined) updateData.comment = comment;

    try {
        const review = await reviewModel.findOneAndUpdate(
            { _id: reviewId, userId }, 
            updateData,
            { returnDocument: 'after',runValidators: true }
        );

        if (!review) {
            return res.status(404).json({ message: "Review not found or not authorized" });
        }

        res.json({
            message: "Review updated successfully",
            data: review
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

let deleteReview = async (req, res) => {
    const userId = req.decoded._id;
    const { reviewId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
                    return res.status(400).json({ message: "Invalid Review ID format" });
        }
        
    let review = await reviewModel.findOneAndDelete({ _id: reviewId, userId: userId });

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    res.json({
        message: "Review deleted",
        data: review
    });
};

export { addReview, getReviews, updateReview, deleteReview };
