import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => { 
                                                            
    // Hooks(eg useState, useEffect, useNavigate) are special functions that let you use react features (eg State , Effect , navigate) inside functional components [ here useNaviagte => hook , navigate => feature/function ]
    const navigate = useNavigate();                          // useNavigate => it allows to navigate between pages  , it is a hook that returns a "navigate" function which is used to change routes dynamically
    const location = useLocation();

    const {token,setToken,userData} = useContext(AppContext)            
    const [showMenu , setShowMenu] = useState(false)           // for showing menu in mobile view , when its "true", menu will appear  and if "false" it will not appear
    
    //logout functionality
    const logout = () => {                  //(As defined in Login.jsx) => when we "login" we store value of token in localStorage and in state variable (ie token)      //Here when we "logout" we  remove value of token from localStorage and set state varibale(ie token) to false  => therefore login/sign up form will appear (bacuse of ternary opeartor defined below in program)
        setToken(false)                        
        localStorage.removeItem('token')
        // if(location.pathname === '/my-profile'){          //if do log-out from "/my-profile" route ,then i will redirect to "/" route 
        //     navigate('/')
        // }
        navigate('/')

    }
    
  

  return (
    <div className='flex items-center justify-between text-sm py-3 px-7 pr-10 mb-4 border-b border-b-gray-400'>
        <img onClick={()=>{navigate('/')}} className='w-40 cursor-pointer' src={assets.logo} alt=''/>
        <ul className='hidden md:flex items-start gap-5 lg:gap-11 font-medium'>
            <NavLink to='/' className="text-decoration-none">                                             {/* for navigating to "/" route or URL when we click on 'Home' */}
                <li className='py-1 hover:scale-105'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctors'>    
                <li className='py-1 hover:scale-105'>ALL DOCTORS</li>
                <hr className='border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/about' className="text-decoration-none">
                <li className='py-1 hover:scale-105'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact' className="text-decoration-none">
                <li className='py-1 hover:scale-105'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>


        <div className='flex items-center gap-4'>

          <div onClick={()=>{navigate('/chatbot')}} >
          <img src={assets.chatbot_image} alt='' className='cursor-pointer w-14  md:translate-x-2 lg:translate-x-0 hover:scale-105' />
          </div>

           
           {
            //(ternary operator) if token is truty (ie contains true or any value) => we are logged in ("create account" button won't be visible in UI) ,   if falsy (ie false or 0 or contains empty string) => we are not logged in (button will be visible)
            token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>                    {/* group => className (for identifying div), */}
                
                <img className='w-9 rounded-full' src={userData.image} alt=""/>    
                <img className='w-3' src={assets.dropdown_icon} alt=""/>
                <div className='absolute top-0 right-0 mt-2 pt-12 text-base font-bold text-gray-700 z-20 hidden group-hover:block'>           {/* hidden => initially 'div' will be hidden , group-hover:block => applying hover effect on "group" class and display elements as block element, pt => padding top , text-base => text size is set to base(16px), z-20 => z-index */}
                    <div className='min-w-48 bg-stone-200 rounded flex flex-col gap-4 p-4 '>                                               {/* min-w => minimum width , bg => background color, rounded => border radius slightly rounded , flex-col => arrange child elements in vertical column instead of horizontal rows , gap-4 => space between child elements , p-4 => padding */}
                        <p onClick={()=>navigate('/my-profile')} className='hover:text-black hover:font-extrabold cursor-pointer'>My Profile</p>
                        <p onClick={()=>navigate('/my-appointments')} className='hover:text-black hover:font-extrabold cursor-pointer'>My Appointment</p>
                        <p onClick={logout} className='hover:text-black hover:font-extrabold cursor-pointer'>Log Out</p>
                    </div>
                </div>
              </div>         
            : <button onClick={()=>navigate('/login')} className="bg-primary text-white font-medium px-8 py-2.5 rounded-full font-light hidden md:block hover:scale-105 shadow-md shadow-slate-800 hover:shadow-black  ">Login</button>
           }



           {/* menu (for mobile view) ie responsiveness */}

           <img onClick={()=>setShowMenu(true)} className='w-8 md:hidden cursor-pointer -mx-52' src={assets.menu_icon} alt=''/>             {/* when we click on this image , menu will appear */}  
           {/*------------- Mobile Menu ---------------- */}
           <div className={`${showMenu ? "fixed w-full h-full" : "h-0 w-0"} md:hidden right-0 top-0 z-20 overflow-hidden bg-white transition-all ease-in-out`}>                                      {/* we are using dynamic className (by using dollar("$") sign inside curly braces and back tik) */}        
            <div className='flex items-center justify-between py-6'>
                <img className='w-36 mx-3 cursor-pointer' src={assets.logo} alt=''/>
                <img className='w-7 mx-5 cursor-pointer' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt=''/>                                  {/* when we click on this cross-icon , menu will dis-appear */} 
            </div>
            <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium' >                                                        {/* Added @media css property in index.css, React Router automatically adds the "active" class to a <NavLink> if the route matches the current URL*/}          
                <NavLink  to='/' onClick={()=>setShowMenu(false)}> <p className='px-4 py-2 rounded inline-block'>HOME</p> </NavLink>                {/* for eg :-here navlink automatically have class:-active if i go on route "/" , then text and bg property will applied to <p> tag inside navlink*/}
                <NavLink  to='/doctors' onClick={()=>setShowMenu(false)}> <p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p> </NavLink>
                <NavLink  to='/about' onClick={()=>setShowMenu(false)}> <p className='px-4 py-2 rounded inline-block'>ABOUT</p> </NavLink>
                <NavLink  to='/contact' onClick={()=>setShowMenu(false)}> <p className='px-4 py-2 rounded inline-block'>CONTACT</p> </NavLink>
            </ul>
           </div>

        </div>

    </div>
  )
}

export default Navbar