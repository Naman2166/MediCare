//time :- 7 hr 11 min
//Current Time :- 7 hr 18 min

import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const AddDoctor = () => {

  //creating state variable for storing data dynamically
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')


  const {backendUrl, aToken} = useContext(AdminContext)
  const [loading,setLoading] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    setLoading(true)         //loading start(ie button disable)

     try{

      if(!docImg){
        setLoading(false)              //loading stops(ie button again appears)
        return toast.error('Image Not Selected')
      }
      
      //for sending form data to backend, we 1st create an special object
      const formData = new FormData()                  //It creates a special object(ie FormData object) that helps you send form data (like text or files) to a backend/server [using fetch() or axios]              //it basically stores a set of key-value pair representing form fields and their values

      formData.append('image', docImg)                 //image => key , docImg => value
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({line1:address1, line2:address2}))             //this converts address object into string format

      //Printing formData in console
      formData.forEach((key,value)=>{
        console.log(`${key} : ${value}`)
      })
      
      //calling API from backend to save doctor's data in database 
      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers:{aToken}})              // sending extra information along with request (ie sending "aToken" as header for authorization, ie telling the server who you are)             //while sending to backend, "aToken" gets converted into smaller case (ie "atoken")
      
      if(data.success){
        toast.success(data.message)

        //Reset input field after successfully adding doctor
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      }

      else{
        toast.error(data.message)
      }

     }
     catch(error){
       toast.error(error.message)
       console.log(error)
     }

     setLoading(false)     //loading stops(ie button again appears)
  }


  
  const [showPassword, setShowPassword] = useState(false)          //for showing / hidding password (inside password input field)
  

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>

      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-indigo-50  border-gray-500 px-8 py-8 border-2 rounded-xl w-full max-w-6xl max-h-[80vh] overflow-y-scroll'>
            
            {/* ------------ image field ------------ */}
          <div className=' flex items-center gap-4 mb-8 text-gray-500'>
            <label htmlFor='doc-img'>
               <img className='bg-gray-100 w-16 rounded-full border-2 border-gray-500 cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt=''/>              {/* URL.createObjectURL() :- it generates a temporary URL for a file(ie image,video,etc) so it can be previewed or used in the browser without uploading it to a server.*/}
            </label>
            <input onChange={(e)=>setDocImg(e.target.files[0])} type='file' id='doc-img' hidden/>            {/*  e.target.files[0] :- to access the first file out of all the files selected by the user(bacause here index = 0)     ,    this input field is linked to above image using Label tag(ie using htmlFor & id attribute), and we hide this input field bcoz now we can take input file/photo by clicking on above image also */}       
            <p className='font-medium'>Upload doctor <br /> picture</p>                                      
          </div>
  
  
         <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
             
            {/* ------------ left side ------------ */}
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
  
              <div className='flex-1 flex flex-col gap-1'>
                <p className='font-medium'>Doctor name</p>
                <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded-lg px-3 py-2 border-gray-500 bg-gray-50 font-medium' type='text' placeholder='Name' required />
              </div>
  
              <div className='flex-1 flex flex-col gap-1'>
                <p className='font-medium'>Doctor Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded-lg px-3 py-2 border-gray-500 bg-gray-50 font-medium' type='email' placeholder='Email' required />
              </div>
  
              <div className='flex-1 flex flex-col gap-1'>
                <p className='font-medium'>Doctor Password</p>
                <div className='relative w-full'>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full border rounded-lg px-3 py-2 border-gray-500 bg-gray-50 font-medium' type={showPassword ? 'text' : 'password'} placeholder='Password' required />
                <span onClick={() => setShowPassword(!showPassword)} className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 scale-125' >{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
  
              <div className='flex-1 flex flex-col gap-1'>
                <p className='font-medium'>Experience</p>
                <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border rounded-lg px-3 py-2 border-gray-500 bg-gray-50 font-medium' name='' id=''>
                   <option value='1 Year'>1 Year</option>
                   <option value='2 Year'>2 Year</option>
                   <option value='3 Year'>3 Year</option>
                   <option value='4 Year'>4 Year</option>
                   <option value='5 Year'>5 Year</option>
                   <option value='6 Year'>6 Year</option>
                   <option value='7 Year'>7 Year</option>
                   <option value='8 Year'>8 Year</option>
                   <option value='9 Year'>9 Year</option>
                   <option value='10 Year'>10 Year</option>
                </select>
              </div>
  
              <div className='flex-1 flex flex-col gap-1'>
                <p className='font-medium'>Fees</p>
                <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border rounded-lg px-3 py-2 border-gray-500 bg-gray-50 font-medium' type='number' placeholder='Fees' required />
              </div>
  
            </div>
            
            {/* ------------ Right side ------------ */}
            <div className='w-full lg:flex-1 flex flex-col gap-4'>

              <div className='flex-1 flex flex-col gap-1'>
                <p className='font-medium'>Speciality</p>
                <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border rounded-lg px-3 py-2 border-gray-500 bg-gray-50 font-medium' name='' id=''>
                  <option value="General Physician">General Physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroentrologist">Gastroentrologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                </select>
              </div>

              
              <div className='flex-1 flex flex-col gap-1'>
                <p className='font-medium'>Education</p>
                <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border rounded-lg px-3 py-2 border-gray-500 bg-gray-50 font-medium' type='text' placeholder='Education' required />
              </div>
              
              <div className='flex-1 flex flex-col gap-2'>
                <p className='font-medium'>Address</p>
                <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border rounded-lg px-3 py-2 border-gray-500 bg-gray-50 font-medium' type='text' placeholder='address 1' required />
                <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border rounded-lg px-3 py-2 border-gray-500 bg-gray-50 font-medium' type='text' placeholder='address 2' required />
              </div>

            </div>
         </div>
  
          {/* ------------ bottom ------------ */}
          <div>
              <p className='mt-4 mb-2 text-gray-600 font-medium'>About Doctor</p>
              <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded-lg border-gray-500 bg-gray-50 text-gray-600 font-medium' type='text' placeholder='write about doctor' rows={5} required />
          </div>

          <button type='submit' disabled={loading} className='bg-primary px-8 py-3 mt-4 text-white rounded-full hover:scale-[102%] hover:border hover:border-black disabled:opacity-50'>{loading ? "Adding Doctor..." : "Add doctor"}</button>

      </div>

    </form>
  )
}

export default AddDoctor;