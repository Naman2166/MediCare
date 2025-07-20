import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home'
import Doctor from './pages/Doctor'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Portfolio from './pages/Portfolio'
import { ToastContainer, toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {

  const location = useLocation()       //to get current route (here we are using for hidding footer in login page)

  return (
    <div className='mx-0 sm:mx-[0%]'>               {/* mx => horizontal margin */}
    
    <ToastContainer autoClose={2000}  toastStyle={{ backgroundColor: 'black', color: 'white' }} closeOnClick />                              {/* this occupies some space for showing toast Notification */}
    {/* <Navbar />                                      rendering Navbar component (it will be visible in all the pages) */}
    {location.pathname !== '/login' && <Navbar />  }              {/* footer will be shown when route is not equal to "/login" (ie on login page footer will not visible) */}   
    
    <Routes>
       <Route path='/' element={<Home />} />                                   {/* when we are on "/" route or URL , Home component will appear/render */}       
       <Route path='/doctors' element={<Doctor />} />  
       <Route path='/doctors/:speciality' element={<Doctor />} /> 
       <Route path='/login' element={<Login />} />
       <Route path='/about' element={<About />} />
       <Route path='/contact' element={<Contact />} />
       <Route path='/my-profile' element={<MyProfile />} />
       <Route path='/my-appointments' element={<MyAppointments />} />
       <Route path='/appointment/:docId' element={<Appointment />} />
       <Route path='/portfolio' element={<Portfolio />} />
    </Routes>

     {location.pathname !== '/login' && location.pathname !== '/my-profile' &&<Footer />  }              {/* footer will be shown when route is not equal to "/login" (ie on login page footer will not visible) */}   
     {/* <Footer /> */}
     
    </div>
  )
}

export default App