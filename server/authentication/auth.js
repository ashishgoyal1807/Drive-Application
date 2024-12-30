import jwt from "jsonwebtoken";//Imports the jsonwebtoken library to work with JWT tokens

export const verifytoken=(req,res,next)=>{

    try
    {
      const authHeader=req.header('authorization');//This retrieves the Authorization header from the incoming request.
      //Usually, the header format is Bearer <token>.
    
        if(!authHeader)//If there is no authorization header (meaning no token is provided),
        {
           return res.status(500).json({message:"NOT AUTHORIZED"});
        }
    
        const token=authHeader.split(" ")[1]; /* The authHeader usually starts with Bearer, followed by the token.*/
    // if authHeader = "Bearer abc123xyz", then:

//authHeader.split(" ") would result in ["Bearer", "abc123xyz"].
//token would be "abc123xyz".
        jwt.verify(token,process.env.JWT_TOKEN_SECRET,(err,user)=>{//jwt.verify validates the token using the secret key 
        // (process.env.JWT_TOKEN_SECRET),
        //  which is stored securely in environment variables.
            if(err)
            {
                res.status(403).json({err}); 
            }
    
            req.user=user;
            next();
        });
    }
    
    catch(err)
    {
        console.log({message:err.message});
    }

}