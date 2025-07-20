// useEffect :- It is a hook that runs code(written inside UseEffect) automatically when the component mounts(render/appears), updates(reRender), or unmounts(disappear).
// syntax :- UseEffect( function , dependecy array )      //if dependency array is empty then this effect runs only once


import React, { useContext, useEffect, useState } from 'react'
//import { doctors } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { DisplayStarRating } from '../components/DisplayStarRating'




const TopDoctors = () => {

  const navigate = useNavigate();
  const {doctors} = useContext(AppContext);               // useContext function is used to use the context(data) (ie accesing data of doctors, without need of importing it in this file)
  const [doctorList, setDoctorList] = useState([]);       // we create doctorList variable (ie state) for dynamically changing/rendering list of doctor when screen size changes

 useEffect( () => {                                      //useEffect hook automatically updates the list of doctors when the screen size changes
    const updateDoctors = () => {                        //It updates the state setDoctorList() with the correct number of doctors.
        if(window.innerWidth < 640){
            setDoctorList(doctors.slice(0,8));           // 8 doctors will be visible for screen size less than 'sm' (ie <640px) [eg mobile screen size]
        }
        else{
            setDoctorList(doctors.slice(0,10));          // 10 doctors will be visible for screen size greater than 'sm' (ie >640px)
        }
    };

    updateDoctors();                                        // calls updateDoctors() when component "TopDoctors" loads(ie appers/rendered on screen), to display list of doctors according to current screen size
    window.addEventListener("resize",updateDoctors);        //when user changes screen size, it calls "updateDoctor" again , to update list of doctors
    
  return () => window.removeEventListener("resize", updateDoctors);            //When the component unmounts/updates/Rerenders , React runs the cleanup function returned by 'useEffect' to remove the event listener,  to avoid memory leaks (it is a good parctice to use cleanup function in useeffect)
 } , [doctors] );                                                          //doctors is in dependency array  (ie  If the doctor list changes due to an API fetch ,new data, etc the UseEffect runs again and updates the UI.                       

//--------------------------  OR --------------------------------
//  useEffect( () => {
//     if (window.innerWidth < 640) {
//         setDoctorList(doctors.slice(0, 8));
//     } else {
//         setDoctorList(doctors.slice(0, 10));
//     }

//     window.addEventListener("resize", () => {
//         if (window.innerWidth < 640) {
//             setDoctorList(doctors.slice(0, 8));
//         } else {
//             setDoctorList(doctors.slice(0, 10));
//         }
//     });

//    return () => window.removeEventListener("resize", updateDoctors);
// }, [doctors]);



  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
    <h1 className='text-3xl font-medium' >Top Doctors to Book</h1>
    <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
     <div className='w-full grid grid-cols-auto xl:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 pt-5 gap-y-6 px-3 sm:px-5' >                              {/* grid-col-auto => here 'auto' is custom property */}
        {doctorList.map((item,index)=>(                               // doctorList.map() => on each doctor from doctorList array ,it applies a function  that creates a card for each doctor 
           
           <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity:1}}
            transition={{ delay: 0.3, duration: 0.5 }}
            onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0) }} 
            className=' border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-13px]  transition-all duration-500' key={index}>
                
                <img className='bg-blue-50' src={item.image} alt=''/>

                <div className='p-4' >
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `} >
                        <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'} `} ></p> <p>{item.available ? 'Available' : 'Not Available' }</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium' >{item.name}</p>
                    <p className='text-gray-600 text-sm' >{item.speciality}</p>

                    {/* Display-only star rating */}
                    <div className='mt-2 '>
                     <DisplayStarRating rating={item.averageRating} reviewCount={item.totalRatings || 0}  size={18} />
                    </div>

                </div>

            </motion.div>
        ))}
    </div>
     <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:scale-105 border border-gray-300' >more</button>
    </div>  
    )
}

export default TopDoctors