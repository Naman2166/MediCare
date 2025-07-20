//time : 2 hr 57 min

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {             // speciality & docId is already passed as a props ,while rendering this page in Appointment.jsx

   const {doctors} = useContext(AppContext)
   const navigate = useNavigate()

   const [relDocs,setRelDocs] = useState([])                //stores information of related doctors(ie doctors having same speciality)
 
   useEffect(()=>{
      if(doctors.length > 0 && speciality){               // if doctors length > 0 and have speciality then inner block will execute
         const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId )       // filtering/selecting doctors with same speciality (but the one which is already displaying should not be dispalying again under related doctor section(ie doc._id !== docId))
         setRelDocs(doctorsData)                          
         }
   },[doctors,speciality,docId])
  

  return (
    <div className='flex flex-col items-center gap-4 my-16 mt-32 text-gray-900 md:mx-10'>
    <h1 className='text-3xl font-medium' >Related Doctors</h1>
    <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
     <div className='w-full grid grid-cols-auto xl:grid-cols-[1fr_1fr_1fr_1fr_1fr]  gap-4 py-5 gap-y-6 px-3 sm:px-5 ' >                              {/* grid-col-auto => here 'auto' is custom property */}
        {relDocs.slice(0,5).map((item,index)=>(                               // doctorList.map() => on each doctor from doctorList array ,it applies a function  that creates a card for each doctor 
            <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0) }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-13px]  transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.image} alt=''/>
                <div className='p-4' >
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `} >
                        <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'} `} ></p> <p>{item.available ? 'Available' : 'Not Available' }</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium' >{item.name}</p>
                    <p className='text-gray-600 text-sm' >{item.speciality}</p>
                </div>
            </div>
        ))}
    </div> 
     <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-sky-100 text-gray-700 hover:text-black hover:font-medium px-12 py-3 rounded-full mt-7' >more</button>
    </div>   
  )
}

export default RelatedDoctors