import jwt from "jsonwebtoken";

import Product from "../../Database/Models/Product.model.js";



let listProducts = async (req, res) => {

let products = await Product.find({isApproved: true})
        .select("name price", " -_id")
        .populate("seller")
        .populate("category"); 
    res.json({ message: "List of Products",
               data: products 
            })
}

let addProduct = async (req, res) => {
    let decoded = req.decoded;
    req.body.seller = decoded._id;
    try {

        let product = new Product(req.body);

        await product.save();

        res.json({
            message: "Product added successfully",
            data:product
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// let getProductByID = async (req, res) => {
//     let decoded = req.decoded;  // check to remove it or not 

//     let product = await Product.findOne({_id: req.params.id, seller: decoded._id})
//         .populate("category", "name")
//         .populate("seller", "name"); //is it imp?

//     if(!product){
//         return res.status(404).json({ message: "Product not found" });
//     }
//     res.json({
//         message: "Product",
//         data: product
//     });

// };

let myProducts = async (req, res) => {

    let products = await Product.find({
        seller: req.decoded._id
    });

    res.json({
        message: "My Products",
        data: products
    });

};

 let updateProduct = async (req, res) => {

    let decoded =  req.decoded; //->
    let product = await Product.findOneAndUpdate(
        { _id: req.params.id, seller: decoded._id },
        req.body,
        { new: true }
    );

   
    if(!product){
        return res.status(404).json({ message: "Product not found" });
    }
    res.json({
        message: "Product updated",
        data: product
    });

};

let deleteProduct = async (req, res) => {

    let product = await Product.findOneAndDelete({ _id: req.params.id, seller: req.decoded._id });

    if(!product){
        return res.status(404).json({ message: "Product not found" });
    }
  
    res.json({
        message: "Product deleted"
    });

};


export { listProducts, addProduct, deleteProduct, myProducts, updateProduct}
// export { listProducts, addProduct, deleteProduct, myProducts, getProductByID, updateProduct}