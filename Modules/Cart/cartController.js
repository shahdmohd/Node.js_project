import cartModel from "../../Database/Models/Cart.model.js";
import productModel from "../../Database/Models/Product.model.js";
 
/*
add a product to the cart:
if cart exists, update it by adding the new product and quantity
if cart doesn't exist, create a new cart with the product and quantity
if product already exists in the cart, update the quantity
if product doesn't exist in the cart, add it to the cart
*/

const addToCart = async (req, res) => {
    let { productId, quantity } = req.body;
    let userId = req.decoded._id;
    let product = await productModel.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
        cart = new cartModel({ userId, items: [{ productId, quantity }] });
    } else {
        let itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
    }
    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
};

/*
remove a product from the cart:
if cart doesn't exist, return an error
if product doesn't exist in the cart, return an error
if product exists in the cart, remove it from the cart
if there are more than one of the product in the cart, decrease the quantity by the specified amount
if there are other products in the cart, return the updated cart
if cart is empty after removing the product, delete the cart
*/
const removeFromCart = async (req, res) => {
    let { productId, quantity } = req.body;
    let userId = req.decoded._id;
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }
    let itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
    }
    if (cart.items[itemIndex].quantity > quantity) {
        cart.items[itemIndex].quantity -= quantity;
    } else {
        cart.items.splice(itemIndex, 1);
    }
    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
};

/*
get the cart:
if cart doesn't exist, return an error
if cart exists, return the cart with populated product details
if cart is empty, return an empty cart
*/

const getCart = async (req, res) => {
    let userId = req.decoded._id;
    let cart = await cartModel.findOne({ userId }).populate("items.productId", "name price -_id");
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart retrieved", cart });
};

export { addToCart, removeFromCart, getCart };

