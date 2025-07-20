// time :- 4 hrs 36 min
// Current time :- 4 hrs 45 min
// dependencies installed :- express, mongoose, multer, bcrypt(to encrypt the password), cloudinary(to store images on cloud), cors, dotenv ,jsonwebtoken(to create authentication system), nodemon(to restart server automatically when we make changes/save file),validator
// To start server :- npm start (or) node server.js  /  npm run server (or) nodemon server.js 

import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"

//app config
const app = express()
const port = process.env.PORT || 4000              // it sets the port variable to either the value of enovironment variable "PORT" , or to 4000 as a default port (if PORT not set/exist)
connectDB()                                        // calling connectDB function from 'mongodb.js' file
connectCloudinary()                                // calling connectClodinary function  from 'cloudinary.js' file

//middlewares (app.use will provide any function that works as middlewares)
app.use(express.json())                           //whenever client(ie frontend) sends any JSON request to server (ie sends JSON data to server) ,the  request will pass through this method on the server (ie server automatically parse incoming JSON request/data and puts parsed data in request.body)
app.use(cors())                                   //it allows the frontend to connect with the backend 

//API endpoints
app.use('/api/admin',adminRouter)         //eg :- localhost:4000/api/admin/add-doctor            //whenever we call this API , "addDoctor" function(defined in adminController.js) will be executed (ie 1st "adminRouter" function will execute , and it executes addDoctor function (inside adminController.js) )
app.use('/api/doctor',doctorRouter)       // doctorRouter defined in doctorRoute.js 
app.use('/api/user', userRouter)          // userRouter defined in userRoute.js

app.get('/',(req,res)=>{                         // if any GET request comes on "/" URL , "API WORKING" message/response will be sent
    res.send('API WORKING');
})

app.listen(port,()=>{                            //to start the express app / server
 console.log("server started",port)
})                                
