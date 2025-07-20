//time :- 9 hr 28 min
//This is User Authentication Middleware
//Note :- if "token" is stored in localStorage, and when we send API request from frontend , then we have to manually send token (in header) to backend 

import jwt from 'jsonwebtoken'

 
//User authentication middleware  (ie checking whether its a specific User or not by checking its token)            // whenever we login using correct credential ,we get one token
const authUser = async (req,res,next) =>{                   //req => incoming request object , res => response object to send a response  , next => a function that passes control to the next middleware 
    try{
        // console.log("headers :-",req.headers)
        // console.log("token :-", req.headers.token)
        const {token} = req.headers                        //basically JWT token is being sent from frontend as "token"(in request header)
        if(!token){                                        //This checks whether the token is missing or not valid
            return res.json({sucess:false, message:"Not Authorized login Again"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)                 //This verifies and decodes the JWT token using the secret key (JWT_SECRET) stored in your environment variables.           //If the token is valid, it decodes the token and returns its payload in form of object(ie actual data used/encoded when creating token here which is "id" => which contains user ID [in userController.js we created token for user using "id" ] ) in token_decode. otherwise throws an error
        req.body.userId = token_decode.id           //we are putting "id" from payload to "userId" in request.body  (basically is middleware ne , jab frontend se request aai to uske token ko verify krke usmese "id" ko nikalke req.body k "userId" m daal diya)
       
        // console.log("request body :-", req.body.userId)
        next()                                           //this passes control to the next middleware
    }
    catch(error){
       console.log(error)
       res.json({success:false, message:error.message})
    }
}


export default authUser

