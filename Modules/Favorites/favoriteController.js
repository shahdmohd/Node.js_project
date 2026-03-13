import mongoose from "mongoose";
import favoriteModel from "../../Database/Models/Favorite.model.js";


let getFavorites = async (req,res) => {
    let userId =req.decoded._id;
    // let favorites=await favoriteModel.find({userId})
    let favorites=await favoriteModel.find({userId}).populate("productId");
    res.status(200).json({message: "Favorites fetched successfully", favorites: favorites})
}

 let addFavorite = async (req,res) => {
    let userId =req.decoded._id;
    let {productId} = req.body;
   if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid Product ID format" });

    }
    try { 
        let existingFavorite = await favoriteModel.findOne({ userId, productId }); 
    if (existingFavorite) {
        return res.status(409).json({ message: "Product already in favorites" });    
    }
    //  const newFavorite = new favoriteModel({ userId, productId })
     const newFavorite = new favoriteModel({ userId, productId });
     await newFavorite.save();
     await newFavorite.populate("productId");
    return res.status(201).json({ message: "Product added to favorites", favorite: newFavorite });
}
catch (error) {
    return res.status(500).json({ message: error.message });
}
}

let removeFromFavorites = async (req,res) => {
    let userId =req.decoded._id;
    let {productId} = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid Product ID format" });
    }
    let favorite = await favoriteModel.findOneAndDelete({ userId, productId });
    if (!favorite) {
        return res.status(404).json({ message: "Product not in favorites " });

    }
    res.status(200).json({ message: "Product removed from favorites" });

    
    }

    export  {getFavorites,addFavorite,removeFromFavorites}