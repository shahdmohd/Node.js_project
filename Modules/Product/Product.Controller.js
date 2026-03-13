import jwt from "jsonwebtoken";
import Product from "../../Database/Models/Product.model.js";



let listProducts = async (req, res) => {
    let products = await Product.find({isApproved: true})
        .select(["name", "price", " -_id"])
        .populate("seller")
        .populate("category"); 
    res.json({ message: "List of Products",
               data: products 
            })
}

let addProduct = async (req, res) => {
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

let getProductByID = async (req, res) => {

    let product = await Product.findOne({_id: req.params.id, isApproved: true})
        .populate("category")
        .populate("seller"); //is it imp?

    if(!product){
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({
        message: "Product",
        data: product
    });

};

 let updateProduct = async (req, res) => {

    let product = await Product.findByIdAndUpdate(
        req.params.id,
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

    let product = await Product.findByIdAndDelete(req.params.id);

    if(!product){
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({
        message: "Product deleted"
    });

};

// let myPosts = async (req, res) => {
//     let decoded = await req.decoded;  

//     let myPosts = await postModel.find({createdBy: req.decoded._id}).populate("createdBy", "name email");

//     res.json({ message: "My Posts", data: myPosts })
// }

// let createPost = async (req, res) => {
//     //catch tokenfrom the header
//     // let token = req.headers.token;
//     //console.log(token); //send fromm postman

//     //to decrypt the token and get the user data from it we need to use jwt.verify() 
    
//     // jwt.verify(token, "iti", async (err, decoded) => { //return error if there error and decoded(the real data) if the token is right 
//     // if(err){
//     //     return res.status(401).json({message: "Invalid Token"})
//     // }else{
//         // req.body.createdBy = decoded._id; //add the user id to the req body to be inserted in the database
//         let decoded = req.decoded; //get the decoded data from the req object that is added by the verifyToken middleware
//         req.body.createdBy = decoded._id; //add the user id to the req body to be inserted in the database
//         let newPost = await postModel.insertMany(req.body);
//         res.json({ message: "Post Created", data: newPost })
//     // }
    
    
// }
// // )
// // }

// let deletePost = async (req, res) => {
//     let id = req.params.id;
//     // let deletedPost = await postModel.findByIdAndDelete(id);
//     // res.json({ message: "Post Deleted", data: deletedPost })
//     //no need to return the deleted post data
//     await postModel.findByIdAndDelete(id);
//     res.json({ message: "Post Deleted"})
// }
export { listProducts, addProduct, deleteProduct, getProductByID, updateProduct}