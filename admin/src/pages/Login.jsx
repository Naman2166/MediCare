//time :- 6 hr 20 min

import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
import {useNavigate} from 'react-router-dom'




const Login = () => {

  const [state, setState] = useState('Admin')                 // for checking the state (ie current user) doctor or admin
  const [email, setEmail] = useState('')                      //for storing Email Id
  const [password, setPassword] = useState('')                //for storing Password

  const {setAToken, backendUrl} = useContext(AdminContext)              // Destructuring/Retrieving setAToken and backendUrl from AdminContext
  const {setDToken} = useContext(DoctorContext)

  const navigate = useNavigate()





  const onSubmitHandler = async (event) => {                       //when we submit the form, this function will get execute
       event.preventDefault()
 
       try{

           //------------------Admin-------------------
           if(state === 'Admin'){                                  //Admin login form will display, where he will enter his email and password
                const {data} = await axios.post(backendUrl + '/api/admin/login' , {email,password} )                //here we are calling API or we can say, we are Sending post request on Admin Login API(ie route) and it will perform its functionality(ie verfying admin, generating token) defined in adminLogin and adminController in backend              // backendUrl + '/api/admin/login' :- is the API endpoint(ie route) for admin login.            //{ email, password } :-  is the request body, which is sent as JSON to the backend with the admin's login credentials. ("basically we are sending post request(ie login request) on admin login API with admin's credentials so that it can be verified in the backend and generated token")            //const { data } :- is destructuring the response and extracting the data field from the response object.
               
                if(data.success){                                    //Once the response is received, this checks whether the backend returned "success: true" indicating a successful login.
                   localStorage.setItem('aToken',data.token)         //localStorage is a built-in web API provided by browsers to store key-value pairs in a web browser permanently (until manually cleared). [format :- locakStorage.setItem(key, value)]  here aToken => key , data.token => value (typically a token (like a JWT) received from a server after login.)               //Basically this line saves the authentication token (data.token) in the browser’s local storage under the key 'aToken'
                   setAToken(data.token)                             //If login is successful, it changes the value of "aToken" with the token received from the backend.
                   navigate('/admin-dashboard')
                   //console.log(data.token)                          //printing the token in console    
                }
                else{
                 toast.error(data.message)                //react-toastify is a React library used to show toast notifications (ie small popup messages that appear temporarily on the screen, often used for feedback like “Form submitted”, “Error occurred”, etc.)
                }
            }

            //------------------Doctor-------------------
            else{
               const {data} = await axios.post(backendUrl + '/api/doctor/login' , {email,password})

               if(data.success){
                localStorage.setItem('dToken',data.token)
                setDToken(data.token)
                navigate('/doctor-dashboard')
                //console.log(data.token)
               }
               else{
                toast.error(data.message)
               }
            }

       }
       catch(error){
          console.log(error)
          toast.error(error.message)
       }

  }





  return (
    <div className='min-h-screen flex items-center justify-center bg-[url("https://img.freepik.com/free-photo/frame-medical-equipment-desk_23-2148519742.jpg?t=st=1745260733~exp=1745264333~hmac=b429fdd0a12c2cbfffc152724990008236d9d96410f8a87a9edbfa7ff03911ef&w=1380")] bg-cover bg-center bg-no-repeat'>  

     <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>                                             {/* when we submit this form, onSubmitHandler function will execute */}
        <div className='flex flex-col  bg-white gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl  text-zinc-600 text-sm shadow-lg shadow-gray-800 hover:shadow-xl hover:shadow-gray-900/60  scale-105 hover:scale-[106%] transition-all duration-300 ease-in-out '>

            <p className='text-2xl font-semibold m-auto'>  <span className='text-primary'>{state}</span> Login</p>

            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-gray-400 rounded w-full p-2 mt-1' type='email' required/>
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-gray-400 rounded w-full p-2 mt-1' type='password' required/>
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base disabled:opacity-50 hover:scale-[101%] hover:shadow-md hover:shadow-gray-400 transition-all duration-300 ease-in-out'>Login</button>
            {
                state === 'Admin'
                ? <p>Doctor Login? <span className='text-primary underline cursor-pointer hover:text-blue-800' onClick={()=>setState('Doctor')}>Click here</span> </p>
                : <p>Admin Login? <span className='text-primary underline cursor-pointer hover:text-blue-800' onClick={()=>setState('Admin')}>Click here</span> </p>
            }

        </div>
    </form>

   </div> 
  )
}

export default Login