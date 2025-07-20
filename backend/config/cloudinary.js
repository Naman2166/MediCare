//Cloudinary is a cloud-based service used for storing, optimizing, and managing media (images, videos, etc.) on internet, rather than on user's local machine.

import {v2 as cloudinary} from 'cloudinary'                      //This imports Cloudinary v2 and renames it to cloudinary


const connectCloudinary = async () => {
     
    // function to configure cloudinary using credentials stored in '.env' file (environment variable file)
     cloudinary.config({
        cloud_name : process.env.CLOUDINARY_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret : process.env.CLOUDINARY_SECRET_KEY
     })

}

export default connectCloudinary;