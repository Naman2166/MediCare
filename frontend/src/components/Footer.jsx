//time :- 1 hr 40 min 

import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
   
    const navigate = useNavigate();

  return (
    <div className='md:mx-10' >

        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>                 {/* grid-cols-[3fr_1fr_1fr] => it creates 3 columns,(1st column takes 3 parts of available space[ie one-third] , 2nd column takes 1 part , 3rd column takes 1 part) , gap-14 => it adds spacing of 14 units between grids/column*/}  

            {/* ----------------- Left Section --------------- */}
            <div className='relative lg:top-[-10%] sm:top-[-6%]'>
                <img className='mb-4 w-40' src={assets.logo} alt=''/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>MediCare is a convenient doctor appointment booking platform where users can easily find trusted doctors and schedule appointments. We aim to simplify healthcare access by connecting patients with the right medical professionals for seamless experience.</p>
            </div>                                      {/* leading-6 => line height*/}

            {/* ----------------- Center Section --------------- */}
            <div>
                <p className='text-xl font-medium mb-5 '>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>

            </div> 

            {/* ----------------- Right Section --------------- */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91-123-456-789</li>
                    <li>medicare@gmail.com</li>
                </ul>
            </div> 

        </div> 

        {/* ----------------- Copyright Text --------------- */}
          <hr />
          <div className="flex justify-between items-center w-full py-5 text-sm">   
               <div className="sm:w-1/3"></div>                                                                       {/* we have divided footer into 3 equal parts for adjustment of text of both 'p' tag */}
               <p className="w-1/2 sm:w-1/3 text-left sm:text-center ">© 2025 MediCare - All Rights Reserved.</p>
               <p className="w-1/2 sm:w-1/3 text-right sm:text-right ">
                  <span onClick={()=>{navigate('/portfolio'); scrollTo(0,0)}} className="inline-flex items-center gap-1 px-4 py-1 border-2 border-black rounded-md font-medium bg-blue-100 cursor-pointer hover:bg-gray-800 hover:text-white transform transition-transform hover:scale-105">
                   made with  <span className="text-red-500 text-lg"> ❤ </span>  Naman </span>
               </p>

          </div>


    </div>
  )
}

export default Footer