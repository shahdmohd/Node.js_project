import userModel from "../../Database/Models/User.model.js";

let getUser = async(req, res)=>{
    const user = await userModel.findById(req.params.id);
    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }
    res.json(user);
};

let restrictUser = async(req, res)=>{
    const user = await userModel.findByIdAndUpdate(req.params.id,
        {isRestricted: true},
        {new: true} // Mongoose returns the updated document
    );
    res.json({
    message: "User restricted",
    user
  });
};

export {getUser, restrictUser}
