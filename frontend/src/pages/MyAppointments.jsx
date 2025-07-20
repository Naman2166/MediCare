//Time :- 4 hrs 5 min
//Dummy card No :- 4386 2894 0766 0153



import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'



const MyAppointments = () => {

 const { backendUrl , token , getDoctorsData } = useContext(AppContext)
 
 const [appointments, setAppointments] = useState([])        //for storing all the appointments of a particular user in form of array
 const navigate = useNavigate()
 
 const months = ["" , "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"] 
 
 //Changing Date Format (ie from 21_7_2003 to 21 Jul 2003) to show in UI
 const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')       //this will return array containing 3 elements in "String" form => day , month and year respectively (ie dateArray[0] => date (eg "21") , dateArray[1] => month (eg "7") , dateArray[2] => year (eg "2003") )
    return  dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]                    //Number() => used to convert string into a Number
  }

 




 //Calling API to get All appointments of a User 
 const getUserAppointments = async () => {
   
   try{
     const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}})
     
     if(data.success){
        
        setAppointments(data.appointments?.reverse() || []);       //we use reverse() method to get latest appointment on the top (bcoz by deafault new appointments will displayed in bottom)       //if data.appointments exists ➔ reverse it ,  If data.appointments is undefined or null ➔ fallback to empty array [].            
        // console.log(data.appointments)
      } 

    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
 }







//Calling API to cancel appointment 
 const cancelAppointment = async (appointmentId) => {

    try{

      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment' , {appointmentId} , {headers:{token}} )
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)      
    }
 }
 







//Creating function to call inside "appointmentRazorpay function" below  (used for creating 'options' object)
const initPay = (order) => {

  const options = {                                //we are creating these options according to razorpay integration docs (mentioned in docs in razorpay website)
    key : import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount : order.amount,
    currency : order.currency,
    name : 'Appointment Payment',                //Title on the popup
    description : 'Appointment Payment',
    order_id : order.id,                         //it is given by razorpay
    receipt : order.receipt,
    handler : async (response) => {            //whenever payment gets executed succesfully , this function runs (ie we get response in this function)
      //console.log(response)


       try{
        const {data} = await axios.post(backendUrl + '/api/user/verifyRazorpay', response , {headers:{token}} )
        console.log("helo")
         if(data.success){
           getUserAppointments()
           navigate('/my-appointments')
          }
       }
       catch(error){
          console.log(error)
          toast.error(error.message)
       }

    }
  }
   
    //initializing & opening the payment window in UI
    const rzp = new window.Razorpay(options)            //it prepares the payment popup using our 'options' object
    rzp.open()                                          //it opens actual payment window on user screen
}







 
//Calling API to make payment using razorpay
const appointmentRazorpay = async (appointmentId) => {

  try{
    
    const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay', {appointmentId} , {headers:{token}})
    console.log(data)       //working fine
    if(data.success){ 
      console.log(data.order)        //workingfine
      initPay(data.order)                   //Calling 'initPay()' function (defined above) for creating the 'options' using 'data.order'

    }
  }
  catch(error){
    console.log(error)
    toast.error(error.message)
  }
  
}






  useEffect(()=>{
    if(token){
      getUserAppointments()

      const interval = setInterval(() => {
        getUserAppointments();         // Fetch every 3 sec
      }, 3000);

      return () => clearInterval(interval);         // Cleanup on unmount
    }
  },[token])





  return (
    <div className='pl-5'>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>          {/* border-b :- border-bottom */}
      <div>
        {appointments.map( (item,index)=>(
          
          <div className='grid grid-cols-[1fr_2fr] gap-1 sm:flex sm:gap-6 py-3 border-b mb-1' key={index}>                           {/* 1fr :- 1 fraction , grid-cols-[1fr_2fr] :- starting 2 "div" will be in two seperate columns(of 1 fraction and 2 fraction), rest "div" will be as it is*/}
           
            <div>
            <img className='w-32 bg-indigo-50 min-w-[5px]' src={item.docData.image} alt=''/>                   {/* inside each appointment record/object =>  image,name,speciality,etc properties are inside the "docData" object */}
            </div>
           
            <div className='flex flex-col mr-18 text-sm text-zinc-700'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)}  |  {item.slotTime} </p> 
            </div>  
           
            <div></div>  

          
            <div className=' flex flex-col md:flex-row  gap-4 sm:justify-between self-end mr-3 '>                                        {/* self-end :- pushes the child div (of grid) to the bottom of its grid cell */}
             
              { !item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 font-medium text-sm border rounded border-black text-green-600'>Amount Paid</button>}                        {/*if appointment is not cancelled (ie !item.cancelled = true) and payment is done , then this button will visible , otherwise not visible*/}   
             
              {/* { !item.cancelled && !item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 font-medium text-sm border rounded border-black text-green-600'>Appointment Booked</button>}                 */}

              { item.cancelled && !item.isCompleted && <button className='text-sm text-center sm:min-w-48 py-2  border border-black  rounded  text-red-600 font-medium '>Appointment Cancelled</button> }
                
              { item.isCompleted && <button className='sm:min-w-48 py-2 font-medium text-sm border rounded border-black text-blue-600'>Appointment Completed</button>  }                    {/* doctor/admin marks complete from panel */}
             
              <div className='max-sm:flex-col flex gap-3'>
                { !item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=>appointmentRazorpay(item._id)} className='text-sm text-white font-medium text-center sm:min-w-48 py-2 border border-gray-500 rounded bg-green-500 hover:bg-green-600 hover:border-black hover:scale-105 transition-all duration-300'>Pay Online</button>}                
              
                { !item.cancelled && !item.payment && !item.isCompleted &&  <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-white font-medium text-center sm:min-w-48 py-2 border border-gray-500 rounded bg-red-500 hover:bg-red-600 hover:border-black hover:scale-105 transition-all duration-300'>Cancel Appointment</button> }
              </div>
            
            </div>

              
              

            </div>  


        ) )}
      </div>
    </div>
  )
}

export default MyAppointments