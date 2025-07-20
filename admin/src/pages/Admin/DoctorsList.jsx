//time :- 8 hr 4 min

import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if(aToken){
      getAllDoctors()              // calling getAllDoctors function 
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[83vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap  xl:grid grid-cols-5 gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index)=>(                // "doctors" state contains information of all doctors (ie within array of objects[ 1 object represents  1 doctor data ]) defined in AdminContext.jsx
            <div key={index} className='border border-indigo-200 rounded-xl max-w-40 md:max-w-48 lg:max-w-56 overflow-hidden cursor-pointer group'>
               <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt=''/>     
               <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm '>
                  <input onChange={()=>changeAvailability(item._id)} type='checkbox' checked={item.available} />                {/* item.available => it contains boolean value (ie true/false) which tells whether doctor is available or not by making checkbox checked (tick) or unchecked*/}      {/* we can see all these properties of particular doctor(ie item) such as name , speciality , image by printing doctors data in console(ie console.log(data.doctors) ) which we get in AdminContext.jsx by calling API */} 
                  <p>Available</p>
                </div>
               </div>   
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList