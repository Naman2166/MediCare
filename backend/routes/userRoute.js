//Time :- 8 hr 57 min

import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorpay } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter = express.Router()         //creating instance of the router


//creating Endpoint to register the new user
userRouter.post('/register', registerUser)             //if we get POST request on '/api/user/register' path then "registerUser" function will execute(defined in userController.js)
userRouter.post('/login',loginUser)                    //"loginUser" function is defined in userController.js

userRouter.get('/get-profile',authUser,getProfile)      // "getProfile" => defined in userController.js     //authUser => its a middleware defined in authUser.js      //Note :- frontend sends "get" request to backend to "get/retrieve some data"   and  sends "post" request (along with some data) to "post/store that data"
userRouter.post('/update-profile', upload.single('image'), authUser ,updateProfile)    // updateProfile => defined in userController.js      //here we are using "upload" method(from multer.js) for handling file uploads
userRouter.post('/book-appointment', authUser , bookAppointment)                    //bookAppointment => defined in userController.js
userRouter.get('/appointments' , authUser, listAppointment)                          //listAppointment => defined in userController.js      //we have included "authUser" to get "userId" from token (received from frontend in headers) , So that we can use userId in listAppointment function
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
userRouter.post('/verifyRazorpay', authUser, verifyRazorpay) 

export default userRouter