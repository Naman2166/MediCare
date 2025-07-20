import mongoose from "mongoose";
import { diskStorage } from "multer";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))                         //it listens for 'connected' event, when database connection is succesfully established. and after succesful connection callback function executes (ie prints database connected) 
    
    await mongoose.connect(`${process.env.MONGODB_URI}/medicare`)               // MONGODB_URI is defined in ".env" file

   /* Explanation :- 
       mongoose.connect(uri) :- establishes a connection to the MongoDB database.
       process.env.MONGODB_URI :- retrieves the database URI from environment variables
       /medicare :- The database name 'medicare' is appended to the URI, meaning this code is specifically connecting to the medicare database.
   */
}

export default connectDB;