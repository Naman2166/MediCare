//time :- 14 hr 45 min

import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'



const DoctorDashboard = () => {

  const {dToken ,dashData, setDashData, getDashData, completeAppointment, cancelAppointment} = useContext(DoctorContext)
  const {currency, slotDateFormat} = useContext(AppContext)




  useEffect(()=>{
    if(dToken){
      getDashData()            //fetch immediately but only 1 time

      const interval = setInterval(() => {
        getDashData();         // Fetch every 3 sec
      }, 3000);

      return () => clearInterval(interval);         // Cleanup on unmount

    }
  },[dToken])                 //whenever 'dToken' changes , this effect(ie function) runs       //if dependency array is empty array[] ,then effect runs only once         //if there is no dependency array, then effect runs always(ie on each render) 






  return dashData && (
    <div className='m-5'>



         <div className='flex flex-wrap gap-3'>

           <div className='flex items-center gap-2 bg-indigo-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img src={assets.earning_icon} alt='' className='w-14'/>
            <div>
              <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>          {/* this gives Total no. of doctors */}
              <p className='text-gray-400'>Earnings</p>
            </div>
           </div>

           <div className='flex items-center gap-2 bg-indigo-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img src={assets.appointments_icon} alt='' className='w-14'/>
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>       {/* this gives Total no. of appointments (successful + cancelled) */}
              <p className='text-gray-400'>Appointments</p>
            </div>
           </div>

           <div className='flex items-center gap-2 bg-indigo-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img src={assets.patients_icon} alt='' className='w-14'/>
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>            {/* this gives Total no. of patients/users */}
              <p className='text-gray-400'>Patients</p>
            </div>
           </div>
 
         </div>




         <div className='bg-white'>

            <div className='flex items-center gap-2.5 px-4 py-6 mt-10 rounded-t-lg bg-indigo-50 border-2 border-gray-300'>           {/* rounded-t => rounded top (both corners) */}
              <img src={assets.list_icon} alt=''/>
              <p className='font-semibold'>Latest Bookings</p>
            </div>

             <div className='border border-2 border-gray-300 border-t-0'>
              {
                dashData.latestAppointments.map((item,index) => (                   //we can see the data inside 'dashData' by printing in console
                  <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100 border-b border-gray-300'>

                    <img src={item.userData.image} alt='' className='rounded-full w-10'/>

                    <div className='flex-1 text-sm'>
                      <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                      <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                    </div>

                    {/* Actions */}
                    {
                     item.cancelled             //checking whether appointment is cancelled or not 
                     ? <p className='text-red-500 text-s font-medium'>Cancelled</p>
                     : item.isCompleted         //If appointment is not not cancelled , we will check whether appointment is completed or not
                        ? <p className='text-green-500 text-s font-medium'>Completed</p>
                        : <div className='flex gap-1'>               {/* if appointment is neither cancelled nor completed , then we will display these buttons */}
                           <p onClick={()=>cancelAppointment(item._id)} className='text-red-600 font-semibold bg-red-100 px-3 py-1.5 rounded-full  border border-red-200 cursor-pointer scale-95 hover:scale-105 hover:bg-red-200 hover:border hover:border-red-300'>X</p>  
                           <p onClick={()=>completeAppointment(item._id)} className='text-green-600 font-semibold bg-green-200 px-3 py-1.5 rounded-full  border border-green-400 cursor-pointer scale-95 hover:scale-105 hover:bg-green-300 hover:border hover:border-green-500'>✔</p>  
                          </div>
                    }  
       
                  </div>
                ))
              }
             </div>

         </div>




    </div>
  )
}

export default DoctorDashboard