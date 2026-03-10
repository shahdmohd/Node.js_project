exports.isAdmin = (req, res, next)=> {
    if (!req.decoded || req.decoded.role !== "admin"){
        return res.status(403).json({
            message: "Admin access only"
        });
    }
    next();
};