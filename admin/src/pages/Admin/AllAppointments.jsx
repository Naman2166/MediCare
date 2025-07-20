import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {


  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)




  useEffect(() => {
    if (aToken) {
      getAllAppointments()            //fetch immediately but only 1 time
 
      const interval = setInterval(() => {
        getAllAppointments();         // Fetch every 3 sec
      }, 3000);

      return () => clearInterval(interval);         // Cleanup on unmount

    }
  }, [aToken])





  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border border-gray-400 rounded text-sm max-h-[80vh] min-h-[80vh] overflow-y-scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (              //index of 1st element of 'appointments' array is 0 , then that of 2nd element is 1 ,and so on..
          <div key={index} className='flex flex-col justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-100 '>               {/* max-sm:gap2 => maximum width is small (ie apply gap-2 property jabtak screen size 'sm' h*/}

            {/* Serial Number */}
            <p className='max-sm:hidden'>{index + 1}</p>             {/* max-sm:hidden => this <p> tag is hidden for small screen (ie hidden when screen size is 'sm' or less )*/}

            {/* Patient name/photo */}
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} alt='' className='w-8 rounded-full' />
              <p>{item.userData.name}</p>
            </div>

            {/* Patient age / date-time */}
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Doctor name/photo */}
            <div className='flex items-center gap-2'>
              <img src={item.docData.image} alt='' className='bg-indigo-100 w-8 rounded-full' />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p>{currency}{item.amount}</p>

            {/* Actions */}
            {
              item.cancelled
                ? <p className='text-red-700 tex-sm font-medium'>Cancelled</p>         //if appointment is already cancelled , we will display string 'cancelled' , otherwise we will provide 'cancel-Buton icon' to cancel the appointment
                : item.isCompleted
                  ? <p className='text-green-500 tex-sm font-medium'>Completed</p>
                  : <p onClick={() => cancelAppointment(item._id)} className='w-1/2 justify-center text-red-600 font-semibold bg-red-100  pl-3.5 py-2.5 rounded-full  border border-red-200 cursor-pointer scale-90 hover:scale-95 hover:bg-red-200 hover:border hover:border-red-300'>X</p>
            }

          </div>
        ))}

      </div>

    </div>
  )
}

export default AllAppointments