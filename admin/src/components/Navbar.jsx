//time :- 6 hr 50 min

import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'


const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext)   
    const {dToken, setDToken} = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
      navigate('/')
      
      aToken && setAToken('')                           //if we have "aToken" then we call setAToken() and set it to empty string
      aToken && localStorage.removeItem('aToken')       //if we have "aToken" then we will remove "aToken" from localStorage
      
      dToken && setDToken('')
      dToken && localStorage.removeItem('dToken')
    }
 


  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-400 bg-white'>
        <div className='flex items-center gap-2 text-sm'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt=''/>
            <p className='border border-gray-700 text-gray-900 font-medium px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 cursor-default'>{aToken ? 'Admin' : 'Doctor'}</p>           {/* if aToken is available then "Admin" text will be printed otherwise "Doctor" */}
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm font-medium px-10 py-2 rounded-full hover:scale-105 hover:shadow-md hover:shadow-gray-700 transition-all duration-200 ease-in-out'>Logout</button>                               {/* when i click on "Logout" button, "Logout" function will execute (ie "atoken" will be empty and hence logout page will appear(as defined in app.jsx) ) */}               
    </div>
  )
}

export default Navbar