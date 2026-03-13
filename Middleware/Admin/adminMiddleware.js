let isAdmin = (req, res, next)=> {
    if (!req.decoded || req.decoded.role !== "admin"){
        return res.status(403).json({
            message: "Admin access only"
        });
    }
    next();
};

const canUseAccount = (req, res, next) => {
  if (!req.user.isApproved) {
    return res.status(403).json({ message: "Account is pending approval" });
  }

  if (req.user.isRestricted) {
    return res.status(403).json({ message: "Account is restricted" });
  }

  next();
};

export {isAdmin, canUseAccount}