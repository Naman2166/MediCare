//time :- 5 hr 56 min
//authAdmin.js :- this file is custom middleware used for authentication of admin (ie it checks whether the loggedIn user is Admin or not (or) have admin rights or not before allowing access to certain parts of your app.  ) 


import jwt from 'jsonwebtoken'


//admin authentication middleware  (ie checking whether its admin or not by checking its token)            // whenever we login using correct credential ,we get one token
const authAdmin = async (req,res,next) =>{                   //req => incoming request object , res => response object to send a response  , next => a function that passes control to the next middleware 
    try{

        const {atoken} = req.headers                        //basically JWT token is being sent from frontend as "atoken" (ie in lowercase)(in request header)
        if(!atoken){                                        //This checks whether the token is missing or not valid
            return res.json({sucess:false, message:"Not Authorized login Again"})
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)                 //This verifies the JWT token using the secret key (JWT_SECRET) stored in your environment variables.           //If the token is valid, it decodes the token and returns its payload in token_decode.   
    
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){        // This checks whether the decoded token matches the "admin's credentials" (email + password) or not 
            return res.json({sucess:false, message:"Not Authorized login Again"})
        }

        next()                                           //this passes control to the next middleware
    }
    catch(error){
       console.log(error)
       res.json({success:false, message:error.message})
    }
}


export default authAdmin

