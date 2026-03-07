import jwt from "jsonwebtoken"

let verifyToken=(req,res,next)=>
{
    let token = req.headers.token;
    jwt.verify(token,"Ecommerce",async(err,decoded)=>
    {
       if (err)
       {
           return res.status(401).json({message: "Invalid Token"})
       }
       else{
                req.decoded = decoded
               next();
           }
    }
)
}

export default verifyToken