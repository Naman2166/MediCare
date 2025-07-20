//time : 5 hr 15 min
//current time :- 12 hr 16 min


import validator from "validator"             //it's a middleware that checks if the data send by user is correct or not ( like checking if an email is really an email, or if a password is strong enough.(eg validator.isEmail(value)) , validator.isStrongPassword(value) )
import bcrypt from "bcryptjs"                   // bcrypt is a tool that encrypt password (ie changes the password into secret code ie hash [eg naman123 => $2b$10D9]) so that they are safe and secure when saved in database and it also compares password when user logs in 
import {v2 as cloudinary} from "cloudinary"   // cloudinary is a cloud service used to upload and store images or videos , get URLs to use in our website/app
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'                //it is used for authentication and authorization in web apps.(ie JWT is a small piece of data that proves who you are. It’s like an ID card that a website gives you after you log in.[we send JWT with every request and server checks it to know that it's us(ie authorized user)])
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"





//API for adding doctor
const addDoctor = async (req,res) => {                     //whenever we call this API, we pass doctor deatils (sucha such as email,password,image ,etc)
  
    try{
        //getting all the data from new doctor's request
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body                        
        const imageFile  = req.file

        //console.log({ name, email, password, speciality, degree, experience, about, fees, address },imageFile);
     
        //checking for all the data to add new doctor
        if( !name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){                // if any of these data(ie name, email, etc) is missing then this block will execute (ie message will send as a response)
            return res.json({success:false, message:"missing details"})                                                       //to send response back to the client in json format   
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"please enter a valid email"})            
        }

        //validating strong password
        if(password.length < 8){
          return res.json({success:false, message:"please enter a strong password"})            
        }

        //Encryping (ie hashing) doctor password
        const salt = await bcrypt.genSalt(10)                                // this generates a random string(called salt) to mix with the password.           // number 10 means complexity higher(ie safer but slower)
        const hashedPassword = await bcrypt.hash(password, salt)             //this line mixes original password with salt and creates hashed code              //For Hashing :- we can also write "bcrypt.hash(password,10)", but we want to add random string also (with the password), therefore we first use "genSalt" method             //For comparison :- we can write "bcrypt.compare(password, hashedPassword)"
                                                                                                                
        //upload image to cloudinary
         if (!imageFile) {
           return res.status(400).json({ success: false, message: 'No image file uploaded' });
         }
         const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})                 // it uploads an image to cloudinary          //imageFile.path :-  path of image file you wanted to upload             //this line returns information about uploaded file(such as URL, ID, size,etc) and it gets stored in "imageUpload" variable  
         const imageUrl = imageUpload.secure_url                                                                       // it gets the URL(Link) of that uploaded image , so that we can use it to access the image
        

        //for saving this above data in database 
        const doctorData = {
          name,
          email,
          image:imageUrl,
          password:hashedPassword,
          speciality,
          degree,
          experience,
          about,
          fees,
          address:JSON.parse(address),              //it coverts address(which is in string form) into javaScript object (ie JSON form)           //basically    JSON.parse() => string to object ,  JSON.stringify() => object to string
          date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)              //adding new doctorData (ie document) into  collection or model
        await newDoctor.save()
 
        res.json({success:true, message:"Doctor Added"})
      }

    catch (error){
        console.log(error);
        res.json({success:false, message:error.message})
    }

}







//API for admin Login
const loginAdmin = async (req,res) => {
      try{
          const {email, password} = req.body

          if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
               const token = jwt.sign(email+password, process.env.JWT_SECRET)                          //it gives us one token , whenever we login with correct credentials(ie correct email and password)          //jwt.sign() is used to create a token that securely stores user information (like email or user ID) so the user can stay logged in.
               res.json({success:true , token})
          }
          else{
            res.json({success:false , message:"Invalid Credentials"})
          }
      }

      catch(error){
        console.log(error.message);
        res.json({success:false, message:error.message})
      }
}






// API to get all doctors list for admin panel
 const allDoctors = async (req,res) => {
   try{

    const doctors = await doctorModel.find({}).select('-password')             //this will find deatils of all doctors and remove password field from doctor's data (ie we will not send password in response, rest all the information of doctor will be sent)
    res.json({success:true, doctors})                       //in response , we send doctors data
   }
   catch(error){
     console.log(error.message);
     res.json({success:false, message:error.message})
   }

 }






//API to get all appointments list (for admin panel)
const appointmentsAdmin = async(req,res) => {

    try{
       
      const appointments = await appointmentModel.find({})           //this gives all the appointments of all the doctors and users
      res.json({success:true , appointments})
    }
    catch(error){
      console.log(error.message);
      res.json({success:false, message:error.message})
    }

}






//API to cancel Appointment (from admin panel)
const appointmentCancel = async (req,res) => {

  try{

     const {appointmentId} = req.body

     //retrieve appointment data from database
     const appointmentData = await appointmentModel.findById(appointmentId)
     
     
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








//API to get dashboard data for admin panel
const adminDashboard = async (req,res) => {

  try{
 
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors : doctors.length,
      appointments : appointments.length,
      patients : users.length,
      latestAppointments : appointments.reverse().slice(0,5)          //to get the 5 latest appointment on the top
    }

    res.json({success:true , dashData})

  }
  catch(error){
    console.log(error)
    res.json({success:false , message:error.message}) 
  }
}







export {addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard};



/*  

"export {addDoctor}"   :-
  - allows exporting multiple things from a module (eg export {adddoctor, hospital, doctor} )          //here hospital and doctor are differents objects or functions
  - must be imported using curly braces {}
  - eg : import {addDoctor} from './fileName.js'

"export default adddoctor"   :-
  - used when a module has only one main export
  - imported without curly braces {} 
  - import addDoctor from "./fileName.js"

*/