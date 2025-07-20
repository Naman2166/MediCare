//time :- 1 hr 50 min
//This component indicates 'All Doctors' section in website 

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import { DisplayStarRating } from '../components/DisplayStarRating'


const Doctor = () => {

  const { speciality } = useParams()                     // useParams() => hook that helps to get URL parametrs (eg from URL/route :- '/doctors/:speciality' , const {speciality} means we are extracting the speciality parameter from URL ) 
  const [filterDoc, setFilterDoc] = useState([])           // variable/array which changes dynamically (used for storing a list of doctors , according to filter(ie specialization) )       // setFilterDoc => updates the filterDoc variable/array
  const [showFilter, setShowFilter] = useState(false)       // for mobile view (for showing filters such as general physicians , neurologist,etc)      //when it is "true" , filter will visible , when it is "false" it will not visible 
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)               // extracts/access doctors data from AppContext



  // normal arrow function for filtering/ selecting a list of doctor according to filter (ie specialization)
  const applyFilter = () => {
    if (speciality) {                                     // if any speciality is available/selected , inner block will be executed
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))           // doctors.filter => for filtering/selecting doctors from doctors array) , (doc => doc.speciality === speciality) =>  'doc' parameter (accesses each element(doctor) in doctors array ) and  compare speciality of each doctor with user selected speciality (ie in 'filter' function => only those doctors will be selected which satisfies this function)
    }
    else {
      setFilterDoc(doctors)
    }
  }



  // useEffect() => this effect/function will be executed ,whenever there is a change in elements of dependency array (ie doctors(array) , specialization)
  useEffect(() => {
    applyFilter()                      // applyFilter() function is called
  }, [doctors, speciality])




  //return statement of Doctor Component
  return (
    <div className='px-7 pr-10'>

      <div className=' flex flex-col sm:flex-row items-start gap-5 mt-5'>              {/* flex-col => all items will be in a single column (ie vertically arrange) */}

        {/* Section for filters (ie left section) */}
        <button onClick={() => setShowFilter((prev) => !prev)} className={`py-1 px-3 border border-black rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ''}`}>Filters</button>          {/* "for mobile view" :  (prev => !prev) :- if previous value(ie current value) is true then this will make it false and vice versa*/}
        <div className={`flex flex-col gap-4 text-md text-gray-700 rounded p-2 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p className='text-gray-600 '>Choose through speciality.</p>
          <p onClick={() => { speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician') }} className={`bg-white w-[50vw] sm:w-auto pl-3 py-1.5 pr-10 border border-gray-400 rounded transitiona-all cursor-pointer hover:border-black hover:bg-blue-50 hover:text-black hover:scale-[103%]  ${speciality === "General physician" ? "bg-emerald-50 text-black border-2 border-black" : ""} `}>General physician</p>          {/* hover:scale-[103%] => on hover , it transform/increases its size, w-[50vw] => width = 50% of viewport-width(ie screen width) */}
          <p onClick={() => { speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist') }} className={` bg-white w-[50vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-400 rounded transitiona-all cursor-pointer hover:border-black hover:bg-blue-50 hover:text-black hover:scale-[103%] ${speciality === "Gynecologist" ? "bg-emerald-50 text-black border-2 border-black" : ""}`} >Gynecologist</p>                        {/* speciality => props(we get it from route '/doctors/${speciality}) dynamically ,eg. if we are on route '/doctors/gynecologist (ie speciality)' therefore onclicking this button we navigate to '/doctor' route (ie on all doctors screen) and if we are on route '/doctors' (ie on All Doctors screen) therefore on clicking this button , we will navigate to '/doctors/gynecologist' route */}
          <p onClick={() => { speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist') }} className={`  bg-white w-[50vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-400 rounded transitiona-all cursor-pointer hover:border-black hover:bg-blue-50 hover:text-black hover:scale-[103%] ${speciality === "Neurologist" ? "bg-emerald-50 text-black border-2 border-black" : ""}`} >Neurologist</p>
          <p onClick={() => { speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist') }} className={` bg-white w-[50vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-400 rounded transitiona-all cursor-pointer hover:border-black hover:bg-blue-50 hover:text-black hover:scale-[103%] ${speciality === "Dermatologist" ? "bg-emerald-50 text-black border-2 border-black" : ""}`} >Dermatologist</p>                     {/* className={`some expression`} => when we use curly braces ({}) with back-tik (`) for className ,value inside is treated as javaScript expression (ie we can insert javaScript logic also by using ${`some logic`} ), for dynamically modifying data */}
          <p onClick={() => { speciality === 'Cardiologist' ? navigate('/doctors') : navigate('/doctors/Cardiologist') }} className={` bg-white w-[50vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-400 rounded transitiona-all cursor-pointer hover:border-black hover:bg-blue-50 hover:text-black hover:scale-[103%] ${speciality === "Cardiologist" ? "bg-emerald-50 text-black border-2 border-black" : ""}`} >Cardiologist</p>
          <p onClick={() => { speciality === 'Gastroentrologist' ? navigate('/doctors') : navigate('/doctors/Gastroentrologist') }} className={` bg-white w-[50vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-400 rounded transitiona-all cursor-pointer hover:border-black hover:bg-blue-50 hover:text-black hover:scale-[103%] ${speciality === "Gastroentrologist" ? "bg-emerald-50 text-black border-2 border-black" : ""}`} >Gastroentrologist</p>
          <p onClick={() => { speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians') }} className={` bg-white w-[50vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-400 rounded transitiona-all cursor-pointer hover:border-black hover:bg-blue-50 hover:text-black hover:scale-[103%] ${speciality === "Pediatricians" ? "bg-emerald-50 text-black border-2 border-black" : ""}`} >Pediatricians</p>                      {/* eg :- className={` bg-blue text-sm ${`speciality === "xyz" ? styling-1 : styling-2`} `} => normally bg=blue , text=small but when speciality is equal to 'xyz' , then styling-1 will be applied (ie according to original code , when we click on button , we reach to '/doctor/Pediatricians' route , then styling-1 will be applied) */}
          <hr className='border border-gray-500 mt-2 w-full' />
        </div>
        {/* ----------------------------------------- */}




        {/* Section for All Doctors (ie right section) */}
        <div className='flex flex-col w-full'>

          <div className='mt-2 font-medium flex justify-center'>
            <p >All Doctors</p>
          </div>

          {/* card container */}
          <div className='max-h-[75vh] overflow-y-scroll py-4'>
            <div className=' grid grid-cols-auto gap-4 gap-y-4'>
              {filterDoc.map((item, index) => (                                         // filterDoc.map() => on each doctor from filterDoc array ,it applies a function  that creates a individual card for each doctor                           
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  onClick={() => navigate(`/appointment/${item._id}`)} 
                  className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-13px]  transition-all duration-500' key={index}>            {/* on clicking on this card , we will redirect to the '/appointment/docid' route ,where 'docid' is the id of doctor, which changes according to doctor( we get this id from id attribute of each element of doctors array)*/}
                  
                  <img className='bg-blue-50' src={item.image} alt='' />
                  
                  <div className='p-4' >
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `} >
                      <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'} `} ></p> <p>{item.available ? 'Available' : 'Not Available'}</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium' >{item.name}</p>
                    <p className='text-gray-600 text-sm' >{item.speciality}</p>

                    {/* Display-only star rating */}
                    <div className='mt-2'>
                      <DisplayStarRating rating={item.averageRating} reviewCount={item.totalRatings || 0} size={18}  showNumber={true} showReviews={false} />        
                    </div>

                  </div>

                </motion.div>
                
              ))}
            </div>
          </div>

        </div>
        {/* ------------------------------------------- */}

      </div>

    </div>
  )
}

export default Doctor