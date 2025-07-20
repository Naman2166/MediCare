//Time :- 13 hr 55 min
//Here we will display  all the appointments by a specific doctor


import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

 
const DoctorAppointments = () => {

   const {dToken, appointments, getAppointments, completeAppointment, cancelAppointment} = useContext(DoctorContext)
   const {calculateAge, slotDateFormat, currency} = useContext(AppContext)



   useEffect(()=>{
    if(dToken){
      getAppointments()               //fetch immediately but only 1 time

      const interval = setInterval(() => {
        getAppointments();         // Fetch every 3 sec
      }, 3000);

      return () => clearInterval(interval);         // Cleanup on unmount

    }
   },[dToken])





  return (
    <div className='w-full max-w-6xl m-5'>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border border-gray-400 rounded-xl text-sm max-h-[78vh] min-h-[78vh] overflow-y-scroll'>
         
         <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b bg-gray-300 border-b-gray-300'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
         </div>
 
         {
          appointments.reverse().map((item,index)=>(                         //we use reverse method to display new appointment on the top 
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-gray-300  hover:bg-gray-100'>

              <p className='max-sm:hidden'>{index+1}</p>

              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='w-8 rounded-full' alt=''/>
                <p>{item.userData.name}</p>
              </div>

              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full'>
                  {item.payment ? 'Online' : 'CASH'}                {/* if payment is done ,we will print "online" ,and  if payment is not paid by user online, we will print 'CASH' */}
                </p>
              </div>

              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{currency} {item.amount}</p>
               
              {
                item.cancelled             //checking whether appointment is cancelled or not 
                ? <p className='text-red-500 text-s font-medium'>Cancelled</p>
                : item.isCompleted         //If appointment is not not cancelled , we will check whether appointment is completed or not
                  ? <p className='text-green-500 text-s font-medium'>Completed</p>
                  : <div className='flex gap-2'>               {/* if appointment is neither cancelled nor completed , then we will display these buttons */}
                      <p onClick={()=>cancelAppointment(item._id)} className='text-red-600 font-semibold bg-red-100 px-3 py-1.5 rounded-full  border border-red-200 cursor-pointer scale-95 hover:scale-105 hover:bg-red-200 hover:border hover:border-red-300'>X</p>  
                      <p onClick={()=>completeAppointment(item._id)} className='text-green-600 font-semibold bg-green-200 px-3 py-1.5 rounded-full  border border-green-400 cursor-pointer scale-95 hover:scale-105 hover:bg-green-300 hover:border hover:border-green-500'>✔</p>  
                    </div>
              } 
              
                      
            </div>
          ))
         }

      </div>
    
    </div>
  )
}

export default DoctorAppointments