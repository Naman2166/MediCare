//time :- 15 hr 4 min

import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'



const DoctorProfile = () => {

  const { backendUrl, dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)               //to control the edit option




  //Calling API to update doctor Profile 
  const updateProfile = async () => {
 
    try{

        const updateData = {
          address: profileData.address,
          fees: profileData.fees,
          available: profileData.available
        }

        const {data} = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {headers:{dToken}})
        if(data.success){
          toast.success(data.message)
          setIsEdit(false)
          getProfileData()
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






  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])






  return profileData && (
    <div className='w-full max-h-[88vh] max-lg:overflow-y-scroll'>

      <div className=' flex flex-col gap-4 m-5'>

        <div>
          <img src={profileData.image} alt='' className='bg-primary/80 w-full sm:max-w-64 rounded-lg' />
        </div>


        <div className='flex-1 border border-stone-400 rounded-lg p-8 py-5 mr-2 bg-white'>

          {/* ---------Doc Info : name, degree, experience------- */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality} </p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          {/* -------------------- Doc About-------------------- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
          </div>


          <div className={`w-full lg:w-1/2 flex flex-col gap-2 lg:flex-row lg:justify-between mt-6 ${isEdit ? 'mb-0' : 'mb-2'} `}>

            <div>
              <p>Address :</p>
              <p className='text-sm text-gray-700'>
                {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} className='pl-1 mb-1 border border-gray-400' /> : profileData.address.line1}
                <br />
                {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} className='pl-1 border border-gray-400' /> : profileData.address.line2}
              </p>
            </div>

            <p>
              Appointment fee : <br /> <span className='text-gray-700'>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} className='pl-1 border border-gray-400 max-w-40 ' /> : profileData.fees}</span>              {/* here inside setProfileData()  => we are spreading(ie alg-alg krna) previous values of profileData and changing only fees property with user entered value */}
            </p>

            <div className=''>
              <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type='checkbox' name='' id='' />                   {/* checked={profileData.available} => if 'available' property from profileData is true then inputbox will be checked , and if false , inputbox will be unchecked */}
              <label htmlFor='' className='ml-0.5'>Available</label>
            </div>

          </div>



          {
            isEdit
              ? <button onClick={updateProfile} className='px-5 py-1 bg-gray-300 min-w-20  border border-gray-700 text-sm rounded-full mt-5 hover:scale-110 hover:bg-primary hover:text-white transition-all'>Save</button>
              : <button onClick={() => setIsEdit(true)} className='px-5 py-1 bg-gray-300  min-w-20  border border-gray-700 text-sm rounded-full mt-5 hover:scale-110 hover:bg-primary hover:text-white transition-all '>Edit</button>
          }

        </div>


      </div>

    </div>
  )
}

export default DoctorProfile