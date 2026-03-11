export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
   
        if (!req.decoded) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

       
        if (!roles.includes(req.decoded.role)) {
            return res.status(403).json({
                message: "You do not have permission to perform this action"
            });
        }

        next();
    };
};