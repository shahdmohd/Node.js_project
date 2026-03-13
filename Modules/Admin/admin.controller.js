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

let approveUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id,
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

export {listUsers, getUser, approveUser, restrictUser, unrestrictUser, deleteUser}
