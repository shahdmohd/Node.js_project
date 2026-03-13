import Category from "../../Database/Models/Category.Model.js ";

let listCategories = async (req, res) => {
    let categories = await Category.find();
    res.json({ message: "List of Categories", data: categories });
};

let addCategory = async (req, res) => {
    try {
        let category = new Category(req.body);
        await category.save();
        res.json({ message: "Category added successfully", data: category });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

let getCategoryByID = async (req, res) => {
    let category = await Category.findById(req.params.id);
    res.json({ message: "Category", data: category });
};

let updateCategory = async (req, res) => {
    let category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json({ message: "Category updated", data: category });
};

let deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
};

export { listCategories, addCategory, deleteCategory, getCategoryByID, updateCategory };