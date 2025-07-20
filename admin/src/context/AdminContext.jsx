//here we will write logic for admin login and admin token

import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

   const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')                  //for storing token of admin after login          //if token exist , its initial value/state will be  "token" stored in localStorage (stored using localStorage.setItem('aToken', data.token) in Login.jsx) , and if not exist its initial value will be empty string (basically when the admin refreshes the page, the token still stays in state(ie contains previous value) bacause its picked from localStorage, therefore admin don't have to login each time after refreshing the page )
   
   const backendUrl = import.meta.env.VITE_BACKEND_URL                 //import.meta.env :- its how you access environment variables in a Vite project.                // All Vite environment variables must start with VITE_ to be exposed to your frontend code.
   const [doctors, setDoctors] = useState([])                          //for storing all doctors details
   const [appointments, setAppointments] = useState([])               //for storing all appointments data 
   const [dashData , setDashData] = useState(false)                   //to store the 'dashBoard' data



   // calling API for getting all doctors Data
   const getAllDoctors = async () => {
      try{

        const {data} = await axios.post(backendUrl + '/api/admin/all-doctors' , {} , {headers:{aToken}})                   //defined in backend in AdminContext.jsx         // {} => empty bracket beacuse we are not sending any data with request
        if (data.success){
            setDoctors(data.doctors)                    //data(which came in response) contains 2 fields :- success : true  ,  doctors array (ie array containing information of all doctors) , therefore we set value of doctors(ie data.doctors) in doctors state 
            console.log(data.doctors)
        }
        else{
            toast.error(error.message)
        }

      }
      catch(error){
           toast.error(error.message)
      }
   }




     //calling API/function to change Availability of doctor    
     const changeAvailability = async (docId) => {
         try{
           
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers:{aToken}} )                    //defined in backend in doctorContext.jsx
            if(data.success){
                toast.success(data.message)
                getAllDoctors()                        //after changing availability of doctor we again call 'getAllDoctors' function to get updated list of all doctors
            } 
            else{
                toast.error(data.message)
            }
        }
         catch(error){
           toast.error(error.message)
         }
     }





     //Calling API to get all appointments
     const getAllAppointments = async () => {

        try{

            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}})
            if(data.success){
                setAppointments(data.appointments)
                //console.log(data.appointments)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
           toast.error(error.message)
        }
     }




     
     //Calling API to cancel the appointment (from admin panel)
     const cancelAppointment = async(appointmentId) => {

        try{

            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
           toast.error(error.message)
        }
     }







     //Calling API to get Dashboard data
     const getDashData = async () => {

        try{
 
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData)
            }
            else{
               toast.error(data.message)
            }

        }
        catch(error){
           toast.error(error.message)
        }
     }







    const value = {
        aToken,                     // aToken => admin token
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData,
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider