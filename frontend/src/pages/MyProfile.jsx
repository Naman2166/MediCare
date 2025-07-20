//Time :- 3 hrs 21 min
//current Time : 10 hr 14 min

import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyProfile = () => {
 
  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)

  const [isEdit,setIsEdit] = useState(false)             // used for opening and closing editing section (ie after clicking edit button) , true => edit section will open , false => edit section close
  const [image, setImage] = useState(false)              // for storing image



  //this function will execute after editing profile section data (ie onClicking Save Information button)
  const updateUserProfileData = async () => {
     
    try{

      const formData = new FormData()             //created FormData object to store and send whole data as one unit(in form of object)

      formData.append("name", userData.name)
      formData.append("phone", userData.phone)
      formData.append("address", JSON.stringify(userData.address))        // JSON.stringy() => string to json  , JSON.parse() => json to string
      formData.append("gender", userData.gender)
      formData.append("dob", userData.dob)
 
      image && formData.append('image', image)        //if we have image then we will apppend image also
    
      //calling API to update profile data
      const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers:{token}} )
      
      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }
      else{
        toast.error(data.message)
      }

    }
    catch(error){
       console.log(error)
       toast.error(error.message)
    }
  }
 

  //function for showing "dob"(date of birth) in dd-mm-yyyy format instead of default format yyyy-mm-dd
  const formatDate = (dateString) => {
    if (!dateString || dateString === 'Not Selected') return 'Not Selected';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };



  return userData && (                                  //if we have userData then only UI will visible
    //<div className='min-h-full flex items-center justify-center -mt-4 py-6 bg-[url("https://img.freepik.com/free-photo/medicine-blue-background-flat-lay_23-2149341573.jpg?ga=GA1.1.1938277686.1739460710&semt=ais_hybrid&w=740")] bg-cover bg-center bg-no-repeat'>  
    <div className='min-h-full flex items-center justify-center -mt-5 py-6 bg-[url("https://img.freepik.com/free-photo/health-still-life-with-copy-space_23-2148854031.jpg?semt=ais_hybrid&w=740")] bg-cover bg-center bg-no-repeat'>  

    <div className='flex w-full justify-center lg:w-1/2 lg:justify-end '>
    <div className='flex bg-blue-100 flex-col gap-2 text-sm px-20 py-3 items-center border-2 border-black rounded-3xl max-w-md my-4'>
      

      {
        isEdit
        ? <label htmlFor='image'>           {/*both <img> tags are linked with input field (ie if i click on <img> tag , input field will work ie i can select the new image by clicking on <img> tag)*/} 
            <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt=''/>          {/* after clicking on edit button =>  when "image" state varibale is empty (ie image not selected yet by user) ,then 1st <img> tag shows user image (which was already displaying) and 2nd <img> tag shows upload icon [note :- humne dono image ko ek k upr ek position kiya h with difference in opacity] */} 
               {!image && (
               <img className='w-10 absolute bottom-12 right-12' src={assets.upload_icon} alt='Upload Icon'/>
               )}
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>         {/* once "image" state variable contains some value(ie after image been selected by user), then 1st <img> tag displays the newly selected image and 2nd <img> tag displays nothing [ie only new image will be visible] ,    [note :- input field is hidden] */}  
          </label>
        : <img className='w-36 rounded-2xl' src={userData.image} alt=''/>
      }
      
    

      {
        isEdit                                              //if "isEdit" is true :- we can edit the name , otherwise current name will be displayed
        ? <input className='bg-gray-100 text-3xl font-medium max-w-60 mt-4 border border-black rounded pl-1' type='text' value={userData.name} onChange={ (e) => setUserData({...userData, name:e.target.value}) }  />          // userData m 'name' key ki value change ho jayegi with the text entered by user   // ...userData :- It copies all the properties from the current userData object   //setUserData({...userData, name:e.target.value}) :-  It keeps all other fields the same and only updates name inside setData object.
        : <p className='font-medium text-3xl text-neutral-800  max-w-60 mt-4 pl-1'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[2px] border-none' />

      <div className='flex flex-col items-center'>
        <p className='text-neutral-800 underline mt-2'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-4 text-neutral-800'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-600'>{userData.email}</p>


          <p className='font-medium'>Phone:</p>
          {
            isEdit 
            ? <input className='bg-gray-100 max-w-52 border border-black rounded pl-1' type='text' value={userData.phone} onChange={ (e) => setUserData({...userData, phone:e.target.value}) }  />          // userData m 'name' key ki value change ho jayegi with the text entered by user   // ...userData :- It copies all the properties from the current userData object   //setUserData({...userData, name:e.target.value}) :-  It keeps all other fields the same and only updates name inside setData object.
            : <p className='text-blue-600 max-w-52 pl-1'>{userData.phone}</p>                                                                                                                                                        
          }


          <p className='font-medium pt-1'>Address:</p>
          {
            isEdit 
            ? <p>
               <input className='bg-gray-100 w-52 max-w-52 border border-black rounded pl-1' type='text' value={userData.address.line1}  onChange={ (e) => setUserData(prev => ({...prev,address:{...prev.address,line1:e.target.value}}) ) } />
               <br />
               <input className='bg-gray-100 w-52 max-w-52 border border-black rounded mt-[1px] pl-1' type='text' value={userData.address.line2}  onChange={ (e) => setUserData(prev => ({...prev,address:{...prev.address,line2:e.target.value}}) ) } />
              </p>
            : <p className='text-gray-700 max-w-52 w-52 pl-1 '>
               {userData.address.line1}
               <br />
               {userData.address.line2}
              </p>
          }
        </div> 
      </div>
 

      <div className='flex flex-col items-center'>
        <p className='text-neutral-800 underline mt-5'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_4fr] gap-y-2.5 mt-3 text-neutral-800 items-start'>


          <p className='font-medium'>Gender:</p>
          {
            isEdit 
            ? <select className='max-w-20 bg-gray-100 border border-black rounded ml-4' value={userData.gender} onChange={(e) => setUserData(prev => ({...prev,gender:e.target.value}))} >
                <option value="Not Selected">Select</option>
                <option value="Male" >Male</option>
                <option value="Female" >Female</option>
              </select>          
            : <p className='text-gray-700 pl-5'>{userData.gender}</p>
           }


          <p className='font-medium mt-1'>Birthday:</p>
          {
            isEdit
            ? <input className='max-w-28 bg-gray-100 border border-black rounded pl-1 ml-4' type='date' value={userData.dob}  onChange={ (e) => setUserData(prev => ({...prev, dob:e.target.value}) ) } />
            : <p className='text-gray-700 max-w-28 pl-5 mt-1'>{formatDate(userData.dob)}</p>
          }

        </div>
      </div>
   

      <div className='mt-7'>
       {
         isEdit
         ? <button className='border border-black bg-blue-200 px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateUserProfileData} >Save information</button>
         : <button className='border border-black bg-blue-200 px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(true)} >Edit</button>                     // when we click on edit button , "isEdit" becomes true, therefore we can do changes now   
       }
      </div>


    </div>
    </div>
  </div>
  )
}

export default MyProfile