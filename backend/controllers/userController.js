//time :- 8 hr 44 min   
//time 2 :- 9 hr 27 min

import validator from 'validator'
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'                       //jwt:- json web token (it's a way to securely send data between client and server) , It’s mostly used for authentication — like when a user logs in.
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'





//API to register new user
const registerUser = async (req,res) => {

    try{

        const {name, email, password} = req.body              //from the request received, we will take name, email and password of user for checking and storing user in database 
                                                

        //checking empty field
        if(!name || !email || !password){                     //checking if any of the field is empty or not , if empty we will send a response 
           return res.json({success:false, message:"Missing Details"})
        }
        
        //validating email format
        if(!validator.isEmail(email)){                       //ie checking whether the email is valid or not , if not valid we wil send a response)
           return res.json({success:false, message:"Enter a valid email"})
        }            
        
        //validating strong password
        if(password.length < 8){                           //checking the length of password
           return res.json({success:false, message:"Enter a strong password"} )
        }


       //finding existed user from database using email
       const existedUser = await userModel.findOne({email})            
        
        if(existedUser){            //if user already existed , we send this response
           return res.json({success:false, message:"User already exists with this Email"})
         }
        
        else{

        //encrypting password  
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)            //ie hashing user password before saving to database
        


        //--------- Storing Data in database --------- 

        const userData = {                           //creating object for storing these data
            name,
            email,
            password : hashedPassword
        }


        const newUser = new userModel(userData)      //Inserting "userData" object in userModel(defined in userModel.js) , by creating a new document
        const user = await newUser.save()            //Saving "newUser"(ie document) in database
        


        //creating  token for user (so that he can stay logged in)
        // format :-  jwt.sign(<-payload-> , <-secretKey->, <-option->(optional))           //payload :- This is the data you want to put inside the token (like user ID, email, etc.)       //secretKey :- (usually stored in ".env" file) used to sign(lock) the token, so that no one can change it      //options :- extra settings for token (like how long it should be valid {expiresIn : 1hr} )  
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)                 //jwt.sign() :- method from jwt package used to generate a token(which represents user Identify throught the session)     //{ id: user._id } :- we are embedding/putting user Id inside the token(which helps the backend to know which user belongs to this token.)       //process.env.JWT_SECRET :- his is a secret password only your server knows. It’s used to lock (sign) the token so no one can change it or fake it. 
        
        //generating response to send this token to user
        res.json({success:true,token})    
      
        } 
     }

    catch(error){
       console.log(error)
       res.json({success:false, message:error.message})
    }

}







//API for user Login
const loginUser = async (req,res) => {
    
    try{
      
        const{email, password} = req.body

        //finding registered user from database using email
        const user = await userModel.findOne({email})            
        
        //If user not exist (in database), then sending below response
        if(!user){                                         
          return res.json({success:false, message:"Invalid Credentails"})         //we are using "return" statement here , bcoz this will terminate the function after sending this response
        } 

        //If user Exist, Comparing the saved password(from database) with user entered password
       const isMatch = await bcrypt.compare(password, user.password)                //bcrypt.compare(password, user.password) : this function is used to compare plain text password(ie user entered password) with hashed password (ie user.password) stored in database         //it returns "true" if password matches, otherwise "false"

       if(isMatch){            //if "isMatch" is true (ie password matches), we will create and provide token to user
         const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
         res.json({success:true, token})
       }
       else{                  
         res.json({success:false, message:"Invalid Credentials"})
       }

    }
    catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }

}







//API to get user profile section detail
const getProfile = async (req,res) => {

   try{

      const {userId, docId} = req.body             //User will not send the "userId" from frontend , User will send the token and using that token we will get the "userId" (as defined in authUser.js)
      const userData = await userModel.findById(userId).select('-password')             //finding user in database using "userId"
      res.json({success:true, userData})         //sending userData(ie data of user stored in database) in response to frontend 
   }
   catch(error){
      console.log(error)
      res.json({success:false, message:error.message})
   }
}






//API to update user Profile
const updateProfile = async (req,res) => {
 
   try{
 
      const {userId, name, phone, address, gender, dob} = req.body           //how userID comes in req.body is defined in authUser.js
      const imageFile = req.file

      //checking missing fields
      if(!name || !phone || !dob || !gender){
         return res.json({success:false, message:"Data Missing"})
      }

      //finding user (using userId) and updating information in database (which we get from frontend)
      await userModel.findByIdAndUpdate(userId , {name, phone, address:JSON.parse(address), gender, dob})         //JSON.parse(address) => for converting JSON object (received from frontend) into string (to store in database)
      
      //Handling image file
      if(imageFile){
         
         //upload image to cloudinary
         const imageUpload  = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"} )           //once image is uploaded , cloudinary will return bunch of information (like URL, size, format, etc)       //imageFile.path → This is the location of the image on your server (probably uploaded by the user).    //{resource_type: "image"} → This tells Cloudinary that you're uploading a image
         const imageURL = imageUpload.secure_url               //this line gives you the public HTTPS link (ie URL) to the image (the one you can use in frontend or store in DB).
      
         //Updating in database
         await userModel.findByIdAndUpdate(userId, {image:imageURL})
      }

      res.json({success:true, message:"Profile Updated"})

   }
   catch(error){
      console.log(error)
      res.json({success:false, message:error.message})
   }
}








//API to book appointment 
const bookAppointment = async (req,res) => {
        
   try{

      const{userId, docId, slotDate, slotTime} = req.body             //we got userId from token received from frontend (defined in authUser.js)
      

      //getting doctor data from database
      const docData = await doctorModel.findById(docId).select('-password')          //finding doctor in database using "docId" and getting all information expect password
      
      //checking whether doctor exist or not
      if (!docData) {
         return res.json({ success: false, message: "Doctor not found" });
      }

      //checking whether doctor is available or not
      if(!docData.available){
         return res.json({success:false , message:"Doctor not available"})
      } 
      
      else{

         //--------------------------------------------------------------------------------------------------------------------------------
         let slot_booked = docData.slot_booked || {};        //it gives the list of all slots booked in form of object
        
          //checking for slot availability (by 1st checking the slots already booked on that date and time)
         if(slot_booked[slotDate]){                          //Check if any bookings exist for that date (meaning that date exists in the slots_booked object)
            if(slot_booked[slotDate].includes(slotTime)){                //If yes, check if the time is already taken (ont that date)
              return res.json({success:false , message:"Slot not available"})     //If yes, tell the user that the doctor is not available at that time.
            }
            else{
               slot_booked[slotDate].push(slotTime)           //If No(ie slot not booked) , we will assign this slot to patient (ie we push this time slot on that date in slot_booked object)
            }
         }

         else{                             //Here no booking exist on that date(meaning that date does not exists in the slots_booked object)
            slot_booked[slotDate] = []      //Therefore we are creating empty array for that date for adding time slots (ie assigning time slots to patient)
            slot_booked[slotDate].push(slotTime)     //we have assigned a slotTime(ie user selected time) to user (by adding time slot on that date in slot_Booked object)
         }
         //--------------------------------------------------------------------------------------------------------------------------------



         //-------------Storing appointment data in database------------

         //getting user data from database
         const userData = await userModel.findById(userId).select('-password')


         //Deleting information of slot booked from doctor's data before saving it to databas e(because we are copying doctors data(ie docData) inside appointment data(ie appointmentData), and we dont want to store "slot_booked" field from docData [which contains information of all the slot booked by doctor] inside appointment data)
         delete docData.slot_booked
         
         //creating object for storing appointment data
         const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()          //current date
         }

         //Inserting data in appointment Model & save in database
         const newAppointment = new appointmentModel(appointmentData)
         await newAppointment.save()
        
        
         //Update the "slot_booked" property in docData (ie in database so that updated time slots will be visible)
         await doctorModel.findByIdAndUpdate(docId,{slot_booked}) 

         res.json({success:true , message:"Appointment Booked"})

      }
      
   }  
   catch(error){
      console.log(error)
      res.json({success:false, message:error.message})
   }
}








// API to get list of user's All Appointments  (for displying in "/my-appointments" page in UI)
const  listAppointment = async (req,res) => {

   try{

      const {userId} = req.body

      //Getting all appointmets of user from database using userId
      const appointments = await appointmentModel.find({userId})            //findById(userId) is used to find one document by id => userId,  but here we have to find multiple documents (ie appointments)  from single id therefore we have used findone() method 

      res.json({success:true , appointments})
   }
   catch(error){
      console.log(error)
      res.json({success:false , message:error.message})
   }
}








// API to cancel Appointment   (from "/my-appointments" page in UI ) 
const cancelAppointment = async (req,res) => {

   try{

      const {userId, appointmentId} = req.body

      //retrieve appointment data from database
      const appointmentData = await appointmentModel.findById(appointmentId)
      
      //verify appointment user
      if(appointmentData.userId !==  userId){                       // Here we are checking if the user who sends the cancel request (ie userId) and the user who book the appointment (ie appointmentData.userId) are same or not 
           return res.json({success:false , message:'Unauthorized action'})
      }

      //changing "cancelled" property inside appointmentModel   
      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})       //by default "cancelled : false" (ie appointment not cancelled) , here we make "cancelled : true" (ie appointment cancelled) 


      //releasing doctor slot (ie removing this timeSlot from "slot_Booked" object in doctorModel)
        const {docId , slotDate , slotTime} = appointmentData
      
        const doctorData = await doctorModel.findById(docId) 
      
        let slot_booked = doctorData.slot_booked

        slot_booked[slotDate] = slot_booked[slotDate].filter(e => e !== slotTime)           // Using filter() method we will filter/remove this 'slotTime' from slot_booked (ie all the 'slotTime' inside "slotDate" will pass the filter() function except the 'slotTime' which gets canceled)
        
        await doctorModel.findByIdAndUpdate(docId, {slot_booked})

        res.json({success:true , message:"Appointment Cancelled"})

   }
   catch(error){
      console.log(error)
      res.json({success:false , message:error.message})
   }
}






 

//--------------Creating Razorpay object -----------------
const razorpayInstance = new razorpay({                         //here we have initailized razorpay (by creating its object) and providing one object (containing 'id' and 'secret Key') as its initial value
    key_id : process.env.RAZORPAY_KEY_ID ,                      //we get this 'id' and 'secret key' from 'razorpay' website 
    key_secret : process.env.RAZORPAY_KEY_SECRET
})



// API to make Payment of Appointment using razorpay
const paymentRazorpay = async (req,res) => {


   try{
       
      
      const { appointmentId } = req.body

      console.log("check1")

      const appointmentData = await appointmentModel.findById(appointmentId)
      

      // 🔍 Debugging the amount
      console.log("Appointment ID:", appointmentId);
      console.log("Appointment Amount:", appointmentData.amount);


      //checking if the appointment data is available or not  OR if the appointment is cancelled or not 
      if(!appointmentData || appointmentData.cancelled){
         return res.json({success:false , message:"Appointment Cancelled or Not found"})
      }
 
      console.log("check2")

      //Creating options for Razorpay payment
      const options = {
         amount : appointmentData.amount * 100,          //we multiply 100 to remove 2 decimal points   // Amount in paisa (INR)
         currency :  process.env.CURRENCY || "INR",
         receipt : appointmentId.toString(),
      }

      console.log("check3")
      console.log(options)
      console.log("check4")

      //Creating an order
      const order = await razorpayInstance.orders.create(options)   //orders.create() => to create a new order (here order containing amount , currency , receipt)
         
      console.log("check5")
      res.json({success:true , order})
 
      }

   catch(error){
      console.log(error)
      res.json({success:false , message:error.message})
      }

}








// API to verify payment of razorpay
const verifyRazorpay = async (req,res) => {

   try{

      const {razorpay_order_id} = req.body           //flow :- once payment successfull =>  response(containing 'razorpay_order_id') sent by razorpay => that response is sent to backend as request
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)          //getting information of order(ie payment) from razorpayInstance using order_id

      // console.log(orderInfo)
      if(orderInfo.status === 'paid'){
         await appointmentModel.findByIdAndUpdate(orderInfo.receipt , {payment:true})            //receipt means appointment id
         res.json({success:true , message:"Payment Successful"})
      }
      else{
         res.json({success:false , message:"Payment failed"})
      }

   }
   catch(error){
      console.log(error)
      res.json({success:false , message:error.message})
   }

} 







export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay}
