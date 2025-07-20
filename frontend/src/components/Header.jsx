import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Header = () => { 

 const {token} = useContext(AppContext)

  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 mx-5'>                {/* px => horizontal padding(left & right), md,lg,sm => device size , rounded-lg => border radius-large */}

        {/* -------------- Left Side  -------------- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity:1 , x: 0}}
          transition={{ delay: 0.1, duration: 0.5 }}        
          className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[8vw] md:mb-[-30px] '>                        {/* m-auto => margin-auto , py-[10vw] => vertical padding of 10% of viewport width , mb => margin bottom */}
           <p className='mx-auto md:mx-0 text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight '>             {/* leading-tight => line height-tight(ie less space between each line)  ==> in CSS : line-height:1.25 , mx-auto => (works for all screen sizes) horzintal margin will be same from both side (ie it centers the element horizontally) */}
            Book Appointment <br/> With Trusted Doctors                                                                                                            {/* md:mx-0 => (works for medium screen sizes and greater (eg :- mobile screen size is less than 'sm'(ie < 640px) therefore this property wont apply there)) , here div will be left-aligned */}          
           </p>
           <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>                                          {/* font-light => font weight-light */}
             <img className='w-28' src={assets.group_profiles} alt='' />
             <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block'/> schedule your appointment hassle-free.</p>
           </div>
           

           {/* if we are logged in then, "Book Appointment" Button will redirect us to "/doctors" route , otherwise it will redirect us to "/login" route */}
           {token 
           ?  <a href='/doctors' className='flex  gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>  
                Book Appointment <img className='w-3' src={assets.arrow_icon} alt=''/>
              </a> 
           :  <a href='/login' className='flex  gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>  
                Book Appointment <img className='w-3' src={assets.arrow_icon} alt=''/>
              </a>
           }
        </motion.div>


        {/* -------------- Right Side  -------------- */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity:1 , x: 0}} 
          transition={{ delay: 0.1, duration: 0.5 }}        
        className='md:w-1/2 relative'>
           <img className='w-full xl:w-[83%] md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt=''/>
        </motion.div>

    </div>
  )
}

export default Header