//time :- 13 hr 43 min
//This is doctor Authentication Middleware

import jwt from 'jsonwebtoken'

 
//Doctor authentication middleware  (ie checking whether its a specific Doctor or not by checking its token)            // whenever we login using correct credential ,we get one token
const authDoctor = async (req,res,next) =>{                   //next => a function that passes control to the next middleware 
    try{
         
        const {dtoken} = req.headers;             //dtoken => key        //Express automatically converts all 'header keys'(send from frontend [eg dToken]) to lowercase, so 'dToken'(from frontend) becomes 'dtoken'(in backend)
         
        if(!dtoken){                                                                 //This checks whether the dToken is missing or not valid
            return res.json({sucess:false, message:"Not Authorized login Again"})
        }
        
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)              //This verifies and decodes the JWT token using the secret key (JWT_SECRET) stored in your environment variables.           //If the dToken is valid, it decodes the dToken and returns its payload in form of object(ie actual data used/encoded when creating dToken, here which is "id" => which contains user ID [in doctorController.js we created token for doctor using "id" ] ) in token_decode. otherwise throws an error
        req.body.docId = token_decode.id                                            //we are putting "id" from payload to "userId" in request.body  (basically is middleware ne , jab frontend se request aai to uske token ko verify krke usmese "id" ko nikalke req.body k "docId" m daal diya)
        next()                                                                       //this passes control to the next middleware
    }
    catch(error){
       console.log(error)
       res.json({success:false, message:error.message})
    }
}


export default authDoctor

