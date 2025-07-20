// time :- 1 hr 33 min
// tailwind property conversion :- example :- py-1 (vertical padding) => 4px or 0.25rem (is 1/4 = 0.25rem) , py-2 => 8px or 0.5rem (ie 2/4 =0.5)

import React from 'react'
import { assets } from '../assets/assets'
import { Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

const Banner = () => {

   const navigate = useNavigate();

  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10' >

        {/* ------------- Left Side --------------- */}
          <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity:1 , x: 0}}
          transition={{ delay: 0.1, duration: 0.5 }} 
          className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 '>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>              {/* flex-1 => child elements will acts as a flex and uses whole available width , py-8 => vertical padding of 8 (ie 8*4 = 32px or 8/4 = 2rem)(from both top and bottom) , pl => left padding*/}
                <p>Book Appointment</p>                                                                                    
                <p className='mt-4'>With 100+ Trusted Doctors</p>                                               {/* mt => margin top */}                              
            </div> 
            <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-gray-600 text-sm sm:text-base px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create account</button>
          </motion.div>
        

        {/* ------------- Right Side --------------- */}
         <motion.div 
         initial={{ opacity: 0, x: 50 }} 
         whileInView={{ opacity:1 , x: 0}} 
         transition={{ delay: 0.3, duration: 0.5 }} 
         className='w-[45%] sm:w-1/2 max-w-xs sm:max-w-sm relative' >                                                    {/* hidden => same as "display:none" , ie it removes the element from the screen (for all screen size), md:block => same as "display:block" ie element will display as block element(for medium or greater screen sizes [ie we override "hidden property" for medium or larger screen]) , relative => position:relative */}
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt='' />                 {/* w-full => width:100% (ie element takes 100% of its parent's width ) , max-w-md => maxium width of element is "medium"(ie 28rem or 448px) */}
         </motion.div>

    </div>
  )
}

export default Banner