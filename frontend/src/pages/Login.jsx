//Time :- 3 hrs 21 min
//when 'token' is false(inside Navbar component) , 'Create Account' button will appear in Navbar (which navigates us to login page) 
//when 'token' is true , profile icon will appear instead of 'Create Account' button 



import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

 
const Login = () => {

  const{backendUrl, token, setToken} = useContext(AppContext)            //Destructuring backendUrl, token, setToken from AppContext

  const [state,setState] = useState('Login')         //for storing the state of users (ie Sign Up or Login)
  
  //we create state variables, to store the values of input fields (in login form)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [showPassword,setShowPassword] = useState(false)       //for showing password
  const [name,setName] = useState('')
  const [loading,setLoading] = useState(false)                //for disabling login/signup button when request is in progess, to avoid multiple submission
  const navigate = useNavigate()

  
  //for handling 'form' behaviour on submitting.
  const onSubmitHandler = async (event) => {
    event.preventDefault()                    //whenever we submit form, it will not reload the webpage (ie it prevents the deafult behaviour of "form")
     
    setLoading(true);                 // when we click signin/login button , it Start loading(ie the request is in progress) and button will disable to avoid multiple submission
     
     //calling register or login API(ie function), based on state 
     try{
 
      if(state === 'Sign Up'){             //if state is "Sign Up", then we will call the "register" API 
        
        const {data} = await axios.post(backendUrl + '/api/user/register', {name,password,email} )            //route defined in "adminRoute.jsx in backend"        // in response we will receive 2 attributes (ie success : true/false and token(only when success is true) ) 
        console.log("Response Data:", data);
        
        if(data.success){                  //if "data.success" is true (ie we have received the token) ,then we will store the token in "localStorage" and "token" state for managing user session
          localStorage.setItem('token',data.token)             //token => key , data.token => value   (ie 'data.token" can be accesed using key(token) )
          setToken(data.token)                                 //after succesful signup or login , value of token state variable will be updated (and in Navbar.jsx ternary operator will work => if token is truty(ie contains true/non-empty string) then profile section will appear , and if token variable is falsy(ie contains false/empty-string) then create account button will appear 
          navigate('/')
          toast.success("Registration Successful")
        }
        else{
          toast.error(data.message)
        }

      }

      else{                     //here state is "Login" , we will call the "login" API
        
        const {data} = await axios.post(backendUrl + '/api/user/login', {password,email} )                    // in response we will receive 2 attributes (ie success : true/false and token(only when success is true) ) 
        if(data.success){                  //if "data.success" is true (ie we have received the token) ,then we will store the token in "localStorage" and "token" state for managing user session
          localStorage.setItem('token',data.token)             //token => key , data.token => value   (ie 'data.token" can be accesed using key(token) )
          setToken(data.token)
          navigate('/')
          toast.success("Login Successful")
        }
        else{
          toast.error(data.message)
        }
      }

      
     }
     catch(error){
      console.log(error)
       toast.error(data.message)    
     }
 
    setLoading(false);     // Stop loading (ie button will again appear)
  } 

  return (
  // <div className='min-h-screen flex items-center justify-center bg-[url("https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?ga=GA1.1.1938277686.1739460710&semt=ais_hybrid&w=740")] bg-cover bg-center bg-no-repeat'>  
  <div className='min-h-screen flex items-center justify-center bg-[url("https://img.freepik.com/free-photo/frame-medical-equipment-desk_23-2148519742.jpg?t=st=1745260733~exp=1745264333~hmac=b429fdd0a12c2cbfffc152724990008236d9d96410f8a87a9edbfa7ff03911ef&w=1380")] bg-cover bg-center bg-no-repeat'>  
    <form onSubmit={onSubmitHandler} className=' min-h-[80vh] flex items-center'>

      <div className='relative flex flex-col gap-5 bg-white m-auto items-start p-8 min-w-[390px] sm:m-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg shadow-gray-800 hover:shadow-xl hover:shadow-gray-900/60  scale-105 hover:scale-[108%] transition-all duration-300 ease-in-out '>
        
        {/* Cross Icon for closing form */}
        <img onClick={() => navigate('/')} src={assets.cross_icon} className="absolute top-7 right-9 max-w-10 cursor-pointer hover:scale-105 z-10" alt='' /> 
        
        {/* Form data */}
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>                                {/* if state is "Sign Up" (ie new user want to create account), "Create Account" text will appear on screen , for any other state "Login" will Appear on screen */}             
        <p>Please {state === 'Sign Up' ? "sign-up" : "login"} to book appointment</p>

        {
          state === "Sign Up" && <div className='w-full'>                 {/* when we are on a Sign-Up form (ie create account form) then 'fullName' option should be visible , otherwise (ie on login form) , 'fullName' option should not be visible (only email and password)*/}   
          <p className='font-medium'>Full Name</p>
          <input className='border border-zinc-400 rounded w-full p-2 mt-1' type='text' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name' required />
           {/* onChange={(e) => setName(e.target.value)} :- This is the event handler that runs whenever the input value changes (i.e., user types something) [setName :- updates the name state, e => event object , e.target.value => current text inside the input, value={name} :- value of input field (controlled by React state 'name'), required :- the form won’t submit unless this input has a value] */}
        </div>           
        }

        <div className='w-full'>
          <p className='font-medium'>Email</p>
          <input className='border border-zinc-400 rounded w-full p-2 mt-1' type='email' onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email' required />
        </div>

        <div className='w-full'>
          <p className='font-medium'>Password</p>
          <div className='relative w-full'>             {/* It allows any absolutely positioned child element (like your 👁️ icon) to be placed relative to this div */}        
          <input className='border border-zinc-400 rounded w-full p-2 mt-1' type={showPassword ? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' required />
          <span onClick={() => setShowPassword(!showPassword)} className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 scale-125' >{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
        </div>
        
        <button type='submit' disabled={loading} className='bg-primary text-white w-full py-2 rounded-md text-base disabled:opacity-50 hover:scale-[101%] hover:shadow-md hover:shadow-gray-400 transition-all duration-300 ease-in-out '>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up" 
          ? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer ml-1'>Login here</span></p>
          : <p>Create an new account? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer ml-1'> click here</span></p>
        }

      </div>

    </form>

  </div>  
  )
}

export default Login