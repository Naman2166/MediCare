//time :- 13 hr 2 min

import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, dashData, getDashData, cancelAppointment } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)




  useEffect(() => {
    if (aToken) {
      getDashData()            //fetch immediately but only 1 time

      const interval = setInterval(() => {
        getDashData();         // Fetch every 3 sec
      }, 3000);

      return () => clearInterval(interval);         // Cleanup on unmount

    }
  }, [aToken])







  return dashData && (                  //If we have dash data then only we will return this div
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-indigo-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.doctor_icon} alt='' className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>          {/* this gives Total no. of doctors */}
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-indigo-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.appointments_icon} alt='' className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>       {/* this gives Total no. of appointments (successful + cancelled) */}
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-indigo-50 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.patients_icon} alt='' className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>            {/* this gives Total no. of patients/users */}
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>

      </div>




      <div className='bg-white'>

        <div className='flex items-center gap-2.5 px-4 py-6 mt-10 rounded-t-lg bg-indigo-50 border-2 border-gray-300'>           {/* rounded-t => rounded top (both corners) */}
          <img src={assets.list_icon} alt='' />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className=' border border-2 border-gray-300 border-t-0'>
          {
            dashData.latestAppointments.map((item, index) => (                   //we can see the data inside 'dashData' by printing in console
              <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100 border-b border-gray-300'>
              
                <img src={item.docData.image} alt='' className='rounded-full w-10' />
            
                <div className='flex-1 text-sm '>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
            
                {/* Actions */}
                {
                  item.cancelled
                    ? <p className='text-red-700 tex-sm font-medium'>Cancelled</p>         //if appointment is already cancelled , we will display string 'cancelled' , otherwise we will provide 'cancel-Buton icon' to cancel the appointment
                    : item.isCompleted
                      ? <p className='text-green-500 tex-sm font-medium'>Completed</p>
                      : <p onClick={() => cancelAppointment(item._id)} className=' justify-center text-red-600 font-semibold bg-red-100  px-3 py-1.5 rounded-full  border border-red-200 cursor-pointer scale-90 hover:scale-95 hover:bg-red-200 hover:border hover:border-red-300'>X</p>
                }
              
              </div>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Dashboard