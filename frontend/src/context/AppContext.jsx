// time :- 1 hr 25 min 44 sec

import { createContext, useEffect, useState, useRef } from "react";
//import { doctors } from "../assets/assets";         // previously we are accessing doctors data from assets folder, but now we are storing/accesing doctor data from doctors state (created below in program)
import axios from 'axios'
import { toast } from 'react-toastify'


export const AppContext = createContext();      // inbuilt function from react package , used to create a new context ,which allows data to be shared among each component without passing props manually at each level

const AppContextProvider = (props) => {           // this component provide context to "AppContext" context , ie it takes props as argument , which wraps other component and provide data to them  

  const currencySymbol = '₹'
  const backendUrl = import.meta.env.VITE_BACKEND_URL         //importing the backend URL from ".env" file

  const [doctors, setDoctors] = useState([])                  //for storing doctors data 
  const [token, setToken] = useState(localStorage.getItem('token'))                       //for storing user token for authentication       // if we are logged in (ie having token), and if we do page refresh then also we still be logged in (because we set value of "token state variable" from local storage [as when we login, "token" will be added in local storage and when we logout, "token" gets removed ]) 
  const [userData, setUserData] = useState(false)            //to store user data for profile section
  const [loading, setLoading] = useState(true);             //loading during backend issue 
  const retryCount = useRef(0);          //retry loading count


  //calling API(ie function) from backend to get the doctor's details
  const getDoctorsData = async () => {

    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + '/api/doctor/list')         //this API(function) returns 2 attributes (ie sucess : true/false and doctors array : (containing list of all doctors with their data)      //route defined in doctorRoute.js (backend)      //function (API) defined in doctorController.js (backend)
      if (data.success) {                        //if data.success is true then this block executes
        setDoctors(data.doctors)               //storing data of all doctors in doctors state  
        //console.log(data)
        setLoading(false); // ✅ Stop loader only after success
        retryCount.current = 0; // ✅ Reset retry count on success
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error)

      if (retryCount.current >= 1) {
        toast.info("Retrying, please wait...");
      }
      retryCount.current += 1;


      setTimeout(() => {
        getDoctorsData();  // retry request after every 10 seconds
      }, 8000);
    }

  }




  //calling API to get user data for profile section
  const loadUserProfileData = async (req, res) => {

    try {

      const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })          //route defined in userRoute.js
      if (data.success) {
        setUserData(data.userData)       //storing data(ie userData) received from backend in "UserData" state variable 
        console.log(data)
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }





  const value = {              // object that holds doctors data  // "value" object will provided to all the component that consumes this context 
    getDoctorsData,
    loading,
    setLoading,
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  }


  //for calling getDoctorData() function
  useEffect(() => {
    getDoctorsData()

    // const interval = setInterval(() => {
    //   getDoctorsData()         // Fetch every 3 sec
    // }, 3000);

    // return () => clearInterval(interval);         // Cleanup on unmount

  }, [])                       // here empty dependency array ([]) means whenever we load the webpage , "getDoctorData" function will execute




  //for calling loadUserProfileData() function
  useEffect(() => {
    if (token) {
      loadUserProfileData()
    }
    else {
      setUserData(false)
    }
  }, [token])



  return (
    <AppContext.Provider value={value}>           {/* special component that provides the "value" object (ie doctor data) to all the childs of components that consumes the context  */}
      {props.children}
    </AppContext.Provider>
  )
}


export default AppContextProvider