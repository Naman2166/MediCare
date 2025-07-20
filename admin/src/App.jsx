//time :- 6 hr 7 min

import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';            //react-toastify is a React library used to show toast notifications (ie small popup messages that appear temporarily on the screen, often used for feedback like “Form submitted”, “Error occurred”, etc.)
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import  Dashboard  from './pages/Admin/Dashboard'
import  AllAppointments  from './pages/Admin/AllAppointments'
import  AddDoctor  from './pages/Admin/AddDoctor'
import  DoctorsList  from './pages/Admin/DoctorsList'
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';



const App = () => {


  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)



  return aToken || dToken ?                  //ternary operator (if we have admin token or doctor token (which we get after successful login) then we will hide login page and displays rest of the pages for admin/doctor work)
  (
    <div className='fixed top-0 left-0 right-0 z-10'>
       
       <ToastContainer autoClose={2000} closeOnClick />             {/* whenever we call toast(...), it need some space on screen to show notification , therefore <ToastContainer /> occupies some "screen space" where all toast messages appear. */}
       <Navbar />

       <div className='flex items-start'>
         <Sidebar />

         <Routes>
            {/*------ Admin Route ------ */}
            <Route path='/' element={<></>} />                           on "/" route, we will not display anything (ie we render a fragment) 
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-appointments' element={<AllAppointments />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/doctor-list' element={<DoctorsList />} />
         
            {/*------ Doctor Route ------ */}
            <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
            <Route path='/doctor-appointments' element={<DoctorAppointments />} />
            <Route path='/doctor-profile' element={<DoctorProfile />} />
         </Routes>  

       </div>
       
    </div>
  ) 
  :
  (
    <>
      <Login />
      <ToastContainer autoClose={2000} closeOnClick/>
    </>
  )
}



export default App