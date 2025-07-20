//time : 2 hr 10 min
//time2 : 10 hr 38 min

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion } from 'framer-motion';
import { StarRating } from '../components/StarRating'
import { jwtDecode } from 'jwt-decode';
import { DisplayStarRating } from '../components/DisplayStarRating'



const Appointment = () => {

  const { docId } = useParams()                         // from route/URL '/my-appointments/:docId' we use 'docId' params
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)            // now doctors(ie array) data can be used here        // we destructure 'doctors' , 'currencySymbol' , etc from AppContext
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  //for storing information for booking slots
  const [docInfo, setDocInfo] = useState(null)        //we use 'docInfo' state for accesing particular doctor data dynamically
  const [docSlots, setDocSlots] = useState([])         //for storing available time slots for each day
  const [slotIndex, setSlotIndex] = useState(0)        //for storing the index of user selected Date slot (index 0 represents 1st date (out of 7 dates shown in UI) , index 1 => 2nd date , and so on ) 
  const [slotTime, setSlotTime] = useState('')         //stores the time string (like "11:00 AM", "3:30 PM" etc.) of the slot the user selected.





  //--------------------------Doctor Rating / Feedback ----------------------------------------

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [doctorRatings, setDoctorRatings] = useState(null);
  const [userRating, setUserRating] = useState(null);



  const fetchRatings = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/doctor/${docId}/reviews`, { headers: { token } });           //API function 2 (get all the rating)
      setDoctorRatings(response.data);
      //console.log("testing 1 :-", response.data)       //checking   

      // Check if user already rated (you'll need to implement auth)
      if (token) {
        const userResponse = await axios.get(backendUrl + `/api/doctor/${docId}/user-review`, { headers: { token } });         //API function 3 (get specific user rating)
        if (userResponse.data.rating) {
          setUserRating(userResponse.data.rating);
          setRating(userResponse.data.rating.rating);
          setFeedback(userResponse.data.rating.feedback);
        }
      }
    } catch (error) {
      console.error('Failed to fetch ratings:', error);
    }
  };



  useEffect(() => {
    fetchRatings();

  }, [docId]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!token) {
        toast.warn('Please Login to Give Rating');
        return;
      }

      const response = await axios.post(backendUrl + `/api/doctor/${docId}/reviews`, { rating, feedback }, { headers: { token } })        //API function 1

      //console.log('testing 2 :-',response)      //checking

      // Update local state
      setUserRating({ rating, feedback });
      setDoctorRatings(prev => ({
        ...prev,
        averageRating: response.data.averageRating,
        totalRatings: response.data.totalRatings
      }));

      toast.success('Thank you for your feedback!');

      const updatedResponse = await axios.get(backendUrl + `/api/doctor/${docId}/reviews`, { headers: { token } });           //again call API function 2 (to get all the latest rating)
      setDoctorRatings(updatedResponse.data);


    } catch (error) {
      console.error('Failed to submit rating:', error);
      toast.error('Failed to submit rating. Please try again.');
    }
  };





  const handleRemoveRating = async () => {
    try {

      // if (!token) {
      //   toast.warn('Please login to remove rating');
      //   return;
      // }

      // Clear the UI state immediately
      setRating(0);          // Reset stars to 0 (empty)
      setFeedback('');       // Clear the text box
      setUserRating(null);   // Clear any stored user rating


      if (userRating) {

        // Get current user ID (decode from token or use from your auth context)
        const decodedToken = jwtDecode(token); // if using JWT
        const currentUserId = decodedToken?.id; // or use from your auth context/state

        const response = await axios.delete(backendUrl + `/api/doctor/${docId}/remove-review`, { headers: { token } });


        // Safely update the doctor's rating summary
        setDoctorRatings(prev => {
          // Ensure prev exists and has ratings array
          const currentRatings = prev?.ratings || [];

          return {
            ...prev,
            averageRating: response.data.averageRating || 0,
            totalRatings: response.data.totalRatings || 0,
            ratings: currentRatings.filter(r => {
              // Safely access userId._id with optional chaining
              return r?.userId?._id !== currentUserId // Use frontend's currentUserId
            })
          };
        });

        toast.success('Rating  removed successfully!');
      }

    } catch (error) {
      console.error('Failed to remove rating:', error);
      toast.error('Failed to remove rating. Please try again.');
    }
  };



  // const clearRating = () => {
  //     setRating(0);          // Reset stars to 0 (empty)
  //     setFeedback('');       // Clear the text box
  //     setUserRating(null);
  // }



  //----------------------------------------------------------------------------







  // //testing
  // const testing = async () => {


  //   const { data } = await axios.post(backendUrl + `/api/doctor/${docId}/reviews`, {}, { headers: { token } })
  //   try {
  //     if (data.success) {
  //       toast.success(data.message)
  //       console.log("doctor id :-", data.docId)
  //       console.log("userId :-", data.userId)
  //     }
  //     else {
  //       toast.error(data.message)
  //     }
  //   }
  //   catch (error) {
  //     console.log(error)
  //     toast.error(error.message)
  //   }
  // }







  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId)      //inside doctors array , we find the doctor based on its 'id' (by comparing 'doctor id' with current 'docId' params (form URL/route) )  //basically 'docInfo' array contains all information of particular doctor
    setDocInfo(docInfo)                                       //it updates the 'docInfo' with required/found doctor information
    //console.log(docInfo)   
  }



  const getAvailableSlots = () => {       //This function generates available booking slots for the next 7 days. Each day has time slots from 10:00 AM to 9:00 PM (21:00 hrs), with slots available every 30 minutes.

    if (!docInfo) return;   //  exit early if docInfo not loaded yet

    setDocSlots([])                     //Clears any previously stored slots before generating new ones.

    //getting current date
    let today = new Date()            //creating a "date" object representing 'current date and time' (ie aaj ki date generate krli)
    let slots = [];                   //'slots' array :- temporary collector for "all available time slots" (ie for all days), Then call setDocSlots(slots) once after the loop.

    for (let i = 0; i < 7; i++) {              // for generating slots for 7 days (ie generate date/time for 7 days) 
      // Setting currentDate for Each Day
      let currentDate = new Date(today)                   // iss line of code se :- aaj ki date generate hui , next line m :- aaj se leke agle 6 aur din ki date generate krli
      currentDate.setDate(today.getDate() + i)              //currentDate starts from today and moves forward by i days.   [basically from current/today's date it will generate date for next 7 days] ,ie currentdate can be any date out of 7 days including today's date


      //setting end time for each day
      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)                  //Defines the end time for booking on each day (9 PM / 21:00 hrs, 0 min , 0 sec, 0 mili sec)

      //Setting Start Time for Each Day
      ////start time (which will be visible in UI ) [ie let say 7 timeslot is visible for slot booking (ie 6pm , 6:30pm, 7pm ,etc) so here 6pm is start time and end time will be 9pm]  
      if (today.getDate() === currentDate.getDate()) {                          // if i want to select slot of present day(ie today)
        //for present day
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)       // If currentDate is today: The first available slot is at least 1 hour after the current time or 10 AM, whichever is later.
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);                          //If the current minute is greater than 30, the slot starts at 30 minutes past the hour; otherwise, it starts at 0 minutes.
      }
      else {
        //for future days
        currentDate.setHours(10)               //For future days, slots start from 10 AM. with 0 minutes
        currentDate.setMinutes(0)
      }



      let timeSlots = []                      //Creates an empty array to store "available time slots for the day" (ie for a single day).

      while (currentDate < endTime) {                //Loop Runs Until currentDate or currentTime Reaches endTime (9 PM).
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });                    //Converts currentDate to a formatted time string (hh:mm AM/PM).


        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = `${day}_${month}_${year}`;         //formatted or custom date
        const slotTime = formattedTime


        //checking if slot available or not 
        const isSlotAvailable = docInfo.slot_booked[slotDate] && docInfo.slot_booked[slotDate].includes(slotTime) ? false : true

        //If slot are available then only we will push them in timeSlots array (ie only available time slots will be displayed in UI)
        if (isSlotAvailable) {

          //Stores the datetime object and formatted time in timeSlots.
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }


        //increment time by 30 minutes
        currentDate = new Date(currentDate.getTime() + 30 * 60 * 1000);               //getTime() returns the timestamp (milliseconds) , 30(min) * 60(sec) * 1000(milisec) 
      }



      //Storing the Generated Slots
      if (timeSlots.length > 0) {
        slots.push(timeSlots);                        // only push if slots are available   // Add today's/future day's time slots
      }

    }

    setDocSlots(slots);  // after all 7 days , Set final slot list once

    // slots vs docSlots (both conatains same data) :-
    // slots [2d array] :- Temporary local variable, Used to "generate and collect all time slots" before storing in react state (ie useState)
    // docSlots [2d array] :- React state variable, Used to "store final slots" in React state (ie UseState) so they can be displayed in UI

  }

  //  Final Summary :- 
  // 1) Clears previous slots (setDocSlots([])).
  // 2) Loops for 7 days, generating slots from today to the next 6 days.
  // 3) For each day:
  //    - Defines the start time (either 10 AM or 1 hour after the current time).
  //    - Defines the end time (9 PM).
  //    - Creates slots every 30 minutes using a while loop.
  // 4) Stores the slots only if available for state management.
  //    - Only days with at least one valid time slot are pushed to slots
  //    - Finally sets docSlots with the collected data.






  //function to book Appoitnment 
  const bookAppointment = async (req, res) => {

    if (!token) {
      toast.warn('Login to Book Appointment')
      return navigate('/login')
    }

    try {


      const date = docSlots[slotIndex][0].datetime         //Meaning => let say if we selected the 1st date (ie slotIndex is 0) , therefore we will get the data of 1st date from docSlots (ie array of objects [different object contains different time slots on that date])        // [slotIndex][0].dateTime  :-  meaning => from that date (according to slotIndex), we will get the very 1st available "time slot" (and each timeSlot conatins 2 attributes => dateTime and time , here we have selected "dateTime")     //Inshort => [slotIndex] tells Date , [0] tells 1st available time  

      let day = date.getDate()
      let month = date.getMonth() + 1            //month index starts from 0 , therefore we have add 1 
      let year = date.getFullYear()

      const slotDate = `${day}_${month}_${year}`;

      //---------------------------------------------------------------------------------
      console.log('Booking appointment with:');
      console.log('Doctor ID:', docId);
      console.log('Slot Date:', slotDate);
      console.log('Slot Time:', slotTime);
      //---------------------------------------------------------------------------------

      //Calling API to book Appointment
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      console.log(data)

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
        scrollTo(0, 0)
      }
      else {
        toast.error(data.message)
      }

    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }






  useEffect(() => {
    fetchDocInfo()

    const interval = setInterval(() => {
      fetchDocInfo()         // Fetch every 3 sec
    }, 2000);

    return () => clearInterval(interval);         // Cleanup on unmount

  }, [doctors, docId])                      // whenever there is a change in elements of dependency array (ie doctors array or docid) , useEffect will execute    



  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])



  useEffect(() => {
    if (docSlots.length > 0) {               //Reset selected index to 0 if slot list changes,to avoid selecting a removed index (like today):
      setSlotIndex(0);
    }
    //  console.log(docSlots)
  }, [docSlots])





  return docInfo && (                        // if doctor information (ie docInfo ) is available ,then only it will display inner block
    <div className='px-5'>

      {/* --------------------- Doctor Details ------------------- */}
      <div className='flex flex-col md:flex-row gap-4'>

        <div>
          <img src={docInfo.image} alt='' className='bg-primary w-1/2 sm:w-full sm:max-w-72 rounded-lg' />
        </div>

        {/* --------------------- Doctor Info : name, degree , experience  ------------------- */}
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-0 sm:mt-0'>                                 {/* flex-1 => for occuping remaining/available space in a flex */}

          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img src={assets.verified_icon} alt='' className='w-5' />
          </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p> {docInfo.degree} - {docInfo.speciality} </p>
            <button className='py-0.5 px-2 border border-gray-300 text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/* Display-only star rating */}
          <div className='mt-2 '>
            <DisplayStarRating rating={docInfo.averageRating} reviewCount={docInfo.totalRatings || 0} size={18}  />
          </div>


          {/* ----------------- Doctor About --------------- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-4'> About <img src={assets.info_icon} alt='' /> </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>

          <p className='text-gray-600 font-medium mt-3'>
            Appointment fee : <span className='text-gray-700'>{currencySymbol}{docInfo.fees}</span>                 {/* currencySymbol => defined in AppContext */}
          </p>

        </div>

      </div>

      {/* -------------------------- Booking  slots----------------------- */}
      <div className=' md:ml-2 sm:pl-4 max-lg:mt-10 mt-10 font-medium text-gray-700'>
        <p className='font-semibold ml-2'>Booking slots</p>

        {/* ----------------- Date slots--------------- */}
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-3 p-1'>
          {
            docSlots.length && docSlots.map((item, index) => (                       //Ensures the map function runs only if 'docSlots' is not empty.(ie If docSlots.length is 0, it won't render anything.)   //Iterates over docSlots, where each 'item' represents a day's slots.
              <div onClick={() => { setSlotIndex(index); setSlotTime("") }} className={`text-center py-5 min-w-16 rounded-full cursor-pointer border-2 border-gray-300 hover:scale-105 hover:font-bold hover:border-gray-500 ${slotIndex == index ? 'bg-primary text-white' : 'bg-gray-50 border border-gray-300'} `} key={index}>                               {/* slotIndex == index :- checks whether this slot is currently selected or not . (slotIndex is a 'state' created above)*/}  {/* onclick => whenever we click on any slot/date, its index will be stored in 'slotIndex' state .    // setSlotTime("") =>  reset selected time slot whenever date slot changes*/}
                {/* Displays the day-name and date for the first available slot of each group */}
                <p>{item[0] && daysofWeek[item[0].datetime.getDay()]}</p>                         {/* if item[0] is available ,then only we will display the list ,     //daysOfWeek :- array of week names (created above) */}
                <p>{item[0] && item[0].datetime.getDate()}</p>                                                 {/* item :- array of available time slots for a single day , item[0] :- first available time slot of a particular day. */}
              </div>                                                                              // item[0].datetime.getDay() :-  Returns a number (0–6) representing the day of the week (ie 0 = sunday , 1 = monday ...).
            ))
          }
        </div>

        {/*   Explanation :- 
          const docSlots = [           //docSlots :- array of arrays
         [ // Day 1 (March 20)                                                                 //array of available time slot on day 1   (ie item)     
          { datetime: Sat Mar 22 2025 10:00:02 GMT+0530 (IST) , time: "10:00 AM" },           //item[0] 
          { datetime: Sat Mar 22 2025 10:30:02 GMT+0530 (IST), time: "10:30 AM" }             //item[1]
         ],
         [ // Day 2 (March 21)                                                                //array of available time slot on day 2    (ie item)
          { datetime: Sun Mar 23 2025 10:00:02 GMT+0530 (IST), time: "10:00 AM" },           //item[0]
          { datetime: Sun Mar 23 2025 10:30:02 GMT+0530 (IST), time: "10:30 AM" }            //item[1]
         ]
       ];  */}


        {/* ----------------- Time slots--------------- */}
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-5 p-1 ml-3'>

          <motion.div
            className="flex gap-3 items-center whitespace-nowrap"
            animate={{ x: ['0%', '-30%'] }}   // only -50% needed because we duplicated     //moves from 0% to -30%
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,    // little slower for smoothness
              ease: 'linear'
            }}
            whileHover={{
              x: (latest) => latest,  // On hover, stop the animation
            }}

          >
            {docSlots.length && docSlots[slotIndex].map((item, index) => (                    //on the slot which user have selected , map method will be applied
              <p onClick={() => setSlotTime(item.time)} className={`text-sm min-w-fit font-medium px-5 py-2 rounded-full border-slate-600 cursor-pointer hover:scale-105 hover:font-extrabold hover:border-2 hover:border-slate-500 ${item.time == slotTime ? 'bg-primary text-white' : 'bg-gray-50 text-gray-600 border border-gray-300'} `} key={index}>         {/* slotTime => state created above , whenever user click on any time slot , its bg-color changes to primary */}
                {item.time.toLowerCase()}                                                 {/* displaying all the available "time" of a particular day */}
              </p>
            ))}

          </motion.div>

        </div>




        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-medium px-14 py-3 rounded-full my-6 mt-7 hover:scale-105 cursor-pointer shadow-md shadow-black'>Book an Appointment</button>

      </div>




      {/*--------------------------------------- Doctor Rating / Feedback ----------------------------------------------- */}

      <div className='flex justify-center font-medium text-3xl mt-20'>
        <p>Rate this Doctor</p>
      </div>

      <div className='lg:flex  lg:justify-center mt-5 '>
        <div className="rating-container bg-orange-50 lg:w-full max-w-4xl flex flex-col border-2 border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-gray-900 shadow-gray-600 hover:scale-[102%] transition-all duration-200">
          {/* <h3 className='font-medium text-lg justify-center'>Rate this Doctor</h3> */}


          <form onSubmit={handleSubmit}>
            <StarRating rating={rating} onRatingChange={setRating} />

            {doctorRatings && (
              <div className="rating-summary">
                <div className="average-rating">
                  {doctorRatings.averageRating} ★ ({doctorRatings.totalRatings} reviews)
                </div>
              </div>
            )}

            <div className="form-group pt-3">
              <label>Your Feedback (optional):</label>
              <textarea
                className='text-gray-800 bg-gray-100 placeholder-gray-500'
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                maxLength="500"
                rows="4"
                placeholder={userRating ? '' : 'Share your experience...'}
              />
            </div>


            {/* Submit rating */}
            <button className='text-gray-600 bg-[#64c467] hover:bg-[#419e44]' type="submit" disabled={!rating}  >
              {userRating ? 'Update Rating' : 'Submit Rating'}
            </button>


            {/* remove rating */}
            {(
              <button
                type="button"
                className="bg-red-300 rounded-md px-5 py-2 ml-2 hover:bg-red-400"
                onClick={handleRemoveRating}
              >
                Remove Rating
              </button>
            )}


            {/* clear rating
          {(
            <button
              type="button"
              className=" bg-red-300 rounded-lg px-5 py-2 "
              onClick={clearRating}
            >
              Reset
            </button>
          )} */}


          </form>

          {doctorRatings?.ratings?.length > 0 && (
            <div className="ratings-list">
              <h4>Recent Reviews</h4>

              {console.log(doctorRatings.ratings)}

              {doctorRatings.ratings.map((review) => (
                <div key={review._id || '0'} className="review-item">
                  <div className="review-header">
                    <span className="patient-name">{review.userId.name}</span>
                    <span className="review-rating">{review.rating} ★</span>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {review.feedback && (
                    <p className="review-feedback">{review.feedback}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/*--------------------------------------------------------------------------------------------- */}




      {/* Listing Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />                      {/* rendering "RelatedDoctors" component and params */}

    </div>
  )
}

export default Appointment