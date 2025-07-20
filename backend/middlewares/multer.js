//time : 5 hr 17 min
//Multer :- a middleware used in Node.js for handling file uploads.

import multer from "multer";

//creating configuration for the disk storage 
const storage = multer.diskStorage({                       //multer.diskStorage() :- Configures how and where files should be stored.
    filename: function(req,file,callback){                 //Defines the file naming strategy
        callback(null,file.originalname);                   //file.originalname :- Uses the original file name when saving the file.
    }
})

//creating instance of this multer using disk storage
const upload = multer({storage})

export default upload;