//time : 7 hr 2 min 

import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'



const Sidebar = () => {


   const {aToken} = useContext(AdminContext)
   const {dToken} = useContext(DoctorContext)


  return (
    <div className='min-h-screen bg-white border-r border-gray-400'>

        {aToken && 
           <ul className='text-[#515151] mt-5'>
              <NavLink to={'/admin-dashboard'} className={({isActive}) => ` flex items-center gap-3 py-3.5 px-3 min-w-44 sm:px-7 sm:min-w-60 lg:px-9 lg:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}` }>                      {/* When the link is Active , some CSS properties get applied (using ternary operator) ,      {isActive} :- a boolean that tells you if this link’s route matches the current URL.(ie link is active or not) */}                  
                 <img src={assets.home_icon} alt=''/>
                 <p>Dashboard</p>
              </NavLink>
              <NavLink to={'/all-appointments'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 sm:px-7 sm:min-w-60 lg:px-9 lg:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}` }>
                 <img src={assets.appointment_icon} alt=''/>
                 <p>Appointments</p>
              </NavLink>
              <NavLink to={'/add-doctor'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 sm:px-7 sm:min-w-60 lg:px-9 lg:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}` }>
                 <img src={assets.add_icon} alt=''/>
                 <p>Add Doctor</p>
              </NavLink>
              <NavLink to={'/doctor-list'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 sm:px-7 sm:min-w-60 lg:px-9 lg:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}` }>
                 <img src={assets.people_icon} alt=''/>
                 <p>Doctor List</p>
              </NavLink>
           </ul>
         }


        {dToken && 
           <ul className='text-[#515151] mt-5'>
              <NavLink to={'/doctor-dashboard'} className={({isActive}) => ` flex items-center gap-3 py-3.5 px-3 min-w-44 sm:px-7 sm:min-w-60 lg:px-9 lg:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}` }>                      {/* When the link is Active , some CSS properties get applied (using ternary operator) ,      {isActive} :- a boolean that tells you if this link’s route matches the current URL.(ie link is active or not) */}                  
                 <img src={assets.home_icon} alt=''/>
                 <p>Dashboard</p>
              </NavLink>
              <NavLink to={'/doctor-appointments'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 sm:px-7 sm:min-w-60 lg:px-9 lg:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}` }>
                 <img src={assets.appointment_icon} alt=''/>
                 <p>Appointments</p>
              </NavLink>
              <NavLink to={'/doctor-profile'} className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 sm:px-7 sm:min-w-60 lg:px-9 lg:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}` }>
                 <img src={assets.people_icon} alt=''/>
                 <p>Profile</p>
              </NavLink>
           </ul>
         }

    </div>
  )
}

export default Sidebar