//time: 5 hr 19 min

import express from 'express'
import { addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()

//using above adminRouter , we can create multiple end points or routes (created below)
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)           //addDoctor is defined in adminController.js & authAdmin is in authAdmin.js            //we created endpoint/routes(ie API) , if any POST request comes on this API ie "http://localhost:4000/api/admin/add-doctor" then addDoctor gets executes
adminRouter.post('/login', loginAdmin)                                                  //loginAdmin is defined in adminController.js            //if any POST request comes on this API ie "http://localhost:4000/api/admin/login" then loginAdmin function gets executes
adminRouter.post('/all-doctors', authAdmin, allDoctors)                                 //authAdmin => middleware         //loginAdmin is defined in adminController.js            //if any POST request comes on this API ie "http://localhost:4000/api/admin/login" then loginAdmin function gets executes
adminRouter.post('/change-availability', authAdmin, changeAvailability)                 //changeAvailbility is defined in doctorController.js
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)                          //appointmentsAdmin => defined in adminController.js
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)                   //appointmentCancel => defined in adminController.js
adminRouter.get('/dashboard', authAdmin, adminDashboard )                               //adminDashboard => defined in adminController.js


/* 
   Explanation :-
   Above Line defines a POST route at "/add-doctor" with the following functionality :-
     - adminRouter.post() :- Defines a POST request handler.
     - '/add-doctor' :- The route path (URL endpoint).
     - upload.single('image') :- Middleware to handle file upload (Multer). It allows only one file with the field name "image".
     - addDoctor :-	it is a function that processes the request and adds the doctor to the database.
*/


export default adminRouter;