import userModel from "../../Database/Models/User.model.js";

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

let restrictUser = async(req, res)=>{
    const user = await userModel.findByIdAndUpdate(req.params.id,
        {isRestricted: true},
        {new: true} // Mongoose returns the updated document
    );
    res.json({message: "User restricted", user});
};

let unrestrictUser = async (req, res) => {

  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    { isRestricted: false },
    { new: true }
  );

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

export {listUsers, getUser, restrictUser, unrestrictUser, deactivateUser, activateUser}
