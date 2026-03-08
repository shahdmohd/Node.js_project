import wishlistModel from "../../Database/Models/wishlist.model.js";
import mongoose from "mongoose";




let getWishlist = async (req, res) => {
    const userId = req.decoded._id;
// dont forget to populate with product details beacuse when i put it it gives me error that schema is not defined yet
    try {
        const wishlistItems = await wishlistModel.find({ userId });
        res.status(200).json({ message: "Wishlist fetched successfully", wishlist: wishlistItems });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}

let addToWishlist = async (req, res) => {
    const userId = req.decoded._id;
    const { productId } = req.body;
//mock test for  add to wish list but there is no schema yet soo 
//     const newWishlistItem = new wishlistModel({ userId, productId });
//     await newWishlistItem.save();
//    return res.status(201).json({ message: "Product added to wishlist", wishlistItem: newWishlistItem });

    if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product ID format" });
        }
    try {
        const existingWishlistItem = await wishlistModel.findOne({ userId, productId });
        if (existingWishlistItem) {
            return res.status(409).json({ message: "Product already in wishlist" });
        }
        else {
             return res.status(404).json({ error: 'Product not found or not authorized' })};
      

        const newWishlistItem = new wishlistModel({ userId, productId });
        await newWishlistItem.save();
        res.status(201).json({ message: "Product added to wishlist", wishlistItem: newWishlistItem });
    }
    
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}

let removeFromWishlist = async (req, res) => {
    const userId = req.decoded._id;
    const { productId } = req.params.productId;

      if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product ID format" });
        }
        
    try {
        const wishlistItem = await wishlistModel.findOneAndDelete({ userId, productId });
        if (!wishlistItem) {
            return res.status(404).json({ message: "Product not in wishlist or not authorized" });
        }
        res.status(200).json({ message: "Product removed from wishlist", wishlistItem });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


export { getWishlist, addToWishlist, removeFromWishlist }