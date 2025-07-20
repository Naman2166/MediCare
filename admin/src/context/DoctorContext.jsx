//time :- 13 hr 50 min
//here we will write logic for Doctor login and Doctor token

import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'


export const DoctorContext = createContext()


const DoctorContextProvider = (props) => {


    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken , setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')           //for storing doctor autentication token         //if we have 'dToken' in localStorage then initial value of this state variable is 'dToken' otherwise empthy string (ie whenever we reload the webpage, value of 'dToken' state variable will be taken from localStorage)
    const [appointments, setAppointments] = useState([])                           // for storing all appointments of a specific doctor
    const [dashData, setDashData] = useState(false)                                // for storing dashboard data of a specific doctor
    const [profileData, setProfileData] = useState(false)                          // for storing doctor profile data




   //Calling API for getting all Appointments of a specific doctor
   const getAppointments = async () => {
      try{
        
        const {data} = await axios.get(backendUrl + '/api/doctor/appointments', {headers:{dToken}})              //here 'dToken' is key and value both (ie {key:value} => {dToken:dToken})
        if(data.success){
            setAppointments(data.appointments)
            console.log(data.appointments)        
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


 
   //Calling API to mark the appointment completed (ie true) for doctor panel
   const completeAppointment = async (appointmentId) => {

    try{

        const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment', {appointmentId}, {headers:{dToken}})
        if(data.success){
            toast.success(data.message)
            getAppointments()
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


 


   //Calling API to Cancel the appointment from doctor panel
   const cancelAppointment = async (appointmentId) => {

    try{

        const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment', {appointmentId}, {headers:{dToken}})
        if(data.success){
            toast.success(data.message)
            getAppointments()
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





   //Calling API to get dashboard data for doctor panel
   const getDashData = async () => {
 
    try{

        const {data} = await axios.get(backendUrl + '/api/doctor/dashboard', {headers:{dToken}})
        if(data.success){
            setDashData(data.dashData)
            console.log(data.dashData)
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





   //Calling API to get doctor profile data (for doctor panel)
   const getProfileData = async () => {
 
    try{

        const {data} = await axios.get(backendUrl + '/api/doctor/profile', {headers:{dToken}})
        if(data.success){
            setProfileData(data.profileData)
            console.log(data.profileData)
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







    const value = {
       dToken,
       setDToken,
       backendUrl,
       appointments,
       setAppointments,
       getAppointments,
       completeAppointment,
       cancelAppointment,
       dashData,
       setDashData,
       getDashData,
       profileData,
       setProfileData,
       getProfileData,
    }

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider