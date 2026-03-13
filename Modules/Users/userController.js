
import userModel from "../../Database/Models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendEmail } from "../../Email/email.js";


let signup =  async (req, res) => {
    let addUser = await userModel.insertMany(req.body); 
    sendEmail(req.body.email)
    addUser[0].password = undefined
    res.json({message: "User Added", data: addUser})
}


let signin = async (req, res, next) => {

    let foundUser = req.foundUser 

    if(!foundUser){
        let error = new Error("Invalid Password or Email")
        error.statusCode = 422
        return next(error)
    }

    let matchPassword = bcrypt.compareSync(
        req.body.password,
        foundUser.password
    )

    if(!matchPassword){
        let error = new Error("Invalid Password or Email")
        error.statusCode = 422
        return next(error)
    }

    if(foundUser.isConfirmed == false){
        let error = new Error("Please Verify Your Email")
        error.statusCode = 401
        return next(error)
    }

    let token = jwt.sign(
        {
            _id: foundUser._id,
            role: foundUser.role,
            email: foundUser.email
        },
        "Ecommerce",
    )

    res.json({
        message: "Welcome",
        data: foundUser,
        token: token
    })
}
       



let verifyAccount = (req,res) => {
       
    let verifyEmail = req.params.email 
    jwt.verify(verifyEmail, "emailToken", async(err, decoded) => {
        if(err){
            return res.status(401).json({message: "Invalid Token"})
        }
       
        console.log(decoded);
        await userModel.findOneAndUpdate({email: decoded}, {isConfirmed: true})
        res.status(200).json({message: "Account Verified"})
    })
}




 const getProfile = async (req, res) => {
  try {
    
    const user = await userModel.findById(req.decoded._id)
      .select("-password") 
    

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let updateProfile = async (req, res) => {
  try {
    const userId = req.decoded._id;
    const { email,name,phone, address, } = req.body;

    


    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { email, name, phone, address },

      { new: true, runValidators: true } 
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




let deleteProfile = async (req, res) => {
  try {
    const userId = req.decoded._id;

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile deleted successfully",
      data: { deletedUser: deletedUser.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


let changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await userModel.findById(req.decoded._id);
    
    
    const isMatch = bcrypt.compareSync(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    
  
    user.password = bcrypt.hashSync(newPassword, 10);
    await user.save();
    
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {signin,signup,verifyAccount,getProfile,updateProfile,deleteProfile,changePassword}

