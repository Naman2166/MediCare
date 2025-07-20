//time : 8 hr 20 min

import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";



// API or function for changing the availablity of doctor (ie whether doctor will be available or not)
const changeAvailability = async (req,res) => {
     try{

       const {docId} = req.body

       const docData = await doctorModel.findById(docId)                                  //finding doctor by ID from database        //this line return all the data of particular doctor
       console.log(docData)
       await doctorModel.findByIdAndUpdate(docId, {available: !docData.available} )       //changing the availability (ie if doctor is available, this makes him unavailable or vice-versa)
       res.json({success:true, message:'Availability Changed'})

     }
     catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
     }
}




//API to get list(ie data) of all doctors for frontend
const doctorList = async (req,res) => {

    try{
         const doctors = await doctorModel.find({}).select(['-password','-email'])         // find({}) :- to get all doctors data  ,  select(['-password','-email']) :- this exclude password and email field from doctors data (ie we will get whole data of all doctors except their email and password)
         res.json({success:true , doctors})
    }
    catch(error){
      console.log(error);
      res.json({success:false, message:error.message})
    }

}





//API for doctor Login
const loginDoctor = async (req,res) => {
  
  try{

    const {email, password} = req.body
    const doctor = await doctorModel.findOne({email})

    if(!doctor){
       return res.json({success:false , message:"Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(password, doctor.password)          //doctor.password => password stored in database  ,   password => password received from frontend(ie user entered password)

    if(isMatch){

      const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
      res.json({success:true, token})
    }
    else{
      return res.json({success:false , message:"Invalid credentials"})
    }

  }
  catch(error){
    console.log(error);
    res.json({success:false, message:error.message})
  }
}





//API to get appointments of a specific doctor for doctor panel
const appointmentsDoctor = async (req,res) => {

  try{

    const {docId} = req.body
    const appointments = await appointmentModel.find({docId})            //this return all the appointments of the doctor (having this docId)
    
    res.json({success:true , appointments})

  }
  catch(error){
    console.log(error);
    res.json({success:false, message:error.message})
  }
}





//API to mark appointment completed for doctor panel
const appointmentComplete = async (req,res) => {

  try{

    const { docId , appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)          
    
    if(appointmentData && appointmentData.docId === docId){
       await appointmentModel.findByIdAndUpdate(appointmentId , {isCompleted : true})
       return res.json({success:true , message:'Appointment Completed'})
    }
    else{
      return res.json({success:false , message:'Mark Failed'})
    }


  }
  catch(error){
    console.log(error);
    res.json({success:false, message:error.message})
  }
}





//API to cancel appointment for doctor panel
const appointmentCancel = async (req,res) => {

  try{

    const { docId , appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)          
    
    //If appointment data is present and doctor jiski appointment thi wo aur doctor jisne cancel request send kari same h , then we will execute below block
    if(appointmentData && appointmentData.docId === docId){              
       await appointmentModel.findByIdAndUpdate(appointmentId , {isCompleted : true})
       return res.json({success:true , message:'Appointment Cancelled'})
    }
    else{
      return res.json({success:false , message:'Cancellation Failed'})
    }


  }
  catch(error){
    console.log(error);
    res.json({success:false, message:error.message})
  }
}






//API to get dashboard data for doctor panel
const doctorDashboard = async (req,res) => {

  try{
   
    const {docId} = req.body
    const appointments = await appointmentModel.find({docId})            //it returns all the appointments taken by a doctor (having id => docId)

    //Earning of the Doctor
    let earnings = 0                             //Total earning of the doctor

    appointments.map((item)=>{                   //here if a item (ie single appointment) is completed or payment is done(through online) , then we will add the amount of appointment in total earning of a doctor
      if(item.isCompleted || item.payment){
        earnings += item.amount
      }
    })

    //No. of Unique(ie alag-alag) patients
    let patients = []                            //to store the unique patients

    appointments.map((item)=>{                   //item means single appointment 
      if(!patients.includes(item.userId)){
         patients.push(item.userId)
      }
    })

    //Creating Dashbord data
    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0,5)          //to get the 5 latest appointments
    }

    res.json({success:true , dashData})

  }
  catch(error){
    console.log(error);
    res.json({success:false, message:error.message})
  }
}







//API to get doctor profile for Doctor Panel
const doctorProfile = async (req,res) => {

  try{

    const {docId} = req.body
    const profileData = await doctorModel.findById(docId).select('-password')                 //select('-password') => returns everything except password       //select('password') => returns password only
    
    res.json({success:true , profileData})
  }
  catch(error){
    console.log(error);
    res.json({success:false, message:error.message})
  }
}







//API to update/Edit doctor profile data from Doctor Panel
const updateDoctorProfile = async (req,res) => {

  try{

    const {docId, fees, address, available} = req.body
    await doctorModel.findByIdAndUpdate(docId, {fees, address, available})      
    
    res.json({success:true , message:'Profile Updated'})
  }
  catch(error){
    console.log(error);
    res.json({success:false, message:error.message})
  }
}






//1. Submit rating and feedback (POST /api/doctor/:doctorId/reviews)
export const submitReview = async (req,res) => {
  try{
    const {docId} = req.params
    console.log(req.body)
     const {userId} = req.body
    const { rating, feedback } = req.body;

    console.log("doctor :-",docId)
    console.log("user :-",userId)
    console.log("rating :-",rating)
    console.log("feedback :-",feedback)
     
    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Please provide a valid rating between 1 and 5' });
    }

    // Check if patient already rated this doctor
    const doctor = await doctorModel.findById(docId);
    const existingRating = doctor.ratings.find(r => r.userId.equals(userId));

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      if(feedback==""){
        existingRating.feedback = ""
      }
      else{
        existingRating.feedback = feedback || existingRating.feedback;
      }

    } else {
      // Add new rating
      doctor.ratings.push({
        userId,
        rating,
        feedback: feedback || ''
      });
    }
    
    //saving in database
    await doctor.save();

    res.json({
      success: true,
      averageRating: doctor.averageRating,
      totalRatings: doctor.totalRatings,
      docId,
      userId,
      message:"Rating receiving successful in Backend"
    });

  }
  catch(error){
    console.log(error);
    res.json({success:false, message:error.message})
  }
}




// 2. Get all ratings for a doctor (GET /api/doctor/:doctorId/reviews)
export const getReview = async (req,res) => {
  try{
    const {docId} = req.params
    const {userId} = req.body

    console.log("doctor :-",docId)
    console.log("user :-",userId)

    const doctor = await doctorModel.findById(docId)
    .select('ratings averageRating totalRatings')
    .populate('ratings.userId', 'name'); // Populate patient names              //changes :- patientId => userId , doctorId => docId

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json({
      averageRating: doctor.averageRating,
      totalRatings: doctor.totalRatings,
      ratings: doctor.ratings,
      docId,
      userId,
      message:"Rating sending succesful backend"
    });

  }
  catch(error){
    console.log(error);
    res.json({success:false, message:error.message})
  }
}




//3. Get a specific user's rating for a doctor (GET /api/doctors/:doctorId/user-rating)
export const userReview = async (req,res) => {

  try{
    const { docId } = req.params;
    const { userId }  = req.body;

    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const userRating = doctor.ratings.find(r => r.userId.equals(userId));
    
    res.json({
      rating: userRating || null
    });
  }
  catch(error){
    return res.json({success:false , message:error.message})
  }
}





//4. Removing Rating
export const removeRating = async (req, res) => {
  try {
    const { docId } = req.params;
    const { userId } = req.body;

    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Find and remove the rating
    const initialLength = doctor.ratings.length;
    doctor.ratings = doctor.ratings.filter(rating => !rating.userId.equals(userId));
    
    if (doctor.ratings.length === initialLength) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    await doctor.save();
    
    res.json({
      success: true,
      averageRating: doctor.averageRating,
      totalRatings: doctor.totalRatings
    });

  } catch (error) {
    console.error('Remove rating error:', error);
    res.json({success:false, message: 'Failed to remove rating' });
  }
};




export {changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile}                 // Named export