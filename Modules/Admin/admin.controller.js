import userModel from "../../Database/Models/User.model.js";
import Product from "../../Database/Models/Product.model.js";

let listUsers = async (req, res) => {
    let users = await userModel.find();
    res.json({mesaage: "List Of Users", data: users});
}

let getUser = async(req, res)=>{
    const user = await userModel.findById(req.params.id);
    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }
    res.json(user);
};

let approveUser = async (req, res) => {
  const user = await userModel.findByIdAndUpdate(req.params.id,
    { isApproved: true, isRestricted: false },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User approved successfully", user });
};

let restrictUser = async(req, res)=>{
    const user = await userModel.findByIdAndUpdate(req.params.id,
        {isRestricted: true},
        {new: true} // Mongoose returns the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({message: "User restricted", user});
};

let unrestrictUser = async (req, res) => {

  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    { isRestricted: false },
    { new: true }
  );

  if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  res.json({message: "User unrestricted", user});
};

let deactivateUser = async (req, res) => {

  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  res.json({message: "User deactivated", user});
};

let activateUser = async (req, res) => {

  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    { isActive: true },
    { new: true }
  );

  res.json({message: "User activated", user});
};

let deleteUser = async(req, res)=>{
  const user = await userModel.findByIdAndDelete(req.params.id);
  if(!user){
    return res.status(404).json({ message: "User not found" });
  }
  res.json({message: "User deleted", user});
}

let getProducts = async (req, res) => {
    let products = await Product.find()
    
    res.json({ message: "List of Products", data: products })
}


let getProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product fetched successfully",
      data: product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let approveProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product approved successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let unapproveProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id,
      { isApproved: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product unapproved successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {listUsers, getUser, approveUser, restrictUser, unrestrictUser, deleteUser, getProducts, getProduct, approveProduct, unapproveProduct}
