//time :- 8 hr 40 min 

import express from 'express'
import {appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, doctorProfile, getReview, loginDoctor, removeRating, submitReview, updateDoctorProfile, userReview } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'
import authUser from '../middlewares/authUser.js'



const doctorRouter = express.Router()           // it is a build-in express class used to create route handler (which organize/manage your routes)

doctorRouter.get('/list',doctorList)            // format :- router.get(path, handler)      //if we get GET request on '/api/doctor/list' path then doctorList function will execute(defined in doctorController.js)
doctorRouter.post('/login',loginDoctor)                                             // loginDoctor => defined in doctorController.js
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)                   // appointmentsDoctor => defined in doctorController.js
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)         // appointmentComplete => defined in doctorController.js
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)             // appointmentCancel => defined in doctorController.js
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)                         // doctorDashboard => defined in doctorController.js
doctorRouter.get('/profile', authDoctor, doctorProfile)                             // doctorProfile => defined in doctorController.js
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)               // updateDoctorProfile => defined in doctorController.js

doctorRouter.post('/:docId/reviews',authUser,submitReview)                         // defined in doctorController.js
doctorRouter.get('/:docId/reviews',authUser,getReview)
doctorRouter.get('/:docId/user-review',authUser,userReview)
doctorRouter.delete('/:docId/remove-review',authUser,removeRating)

export default doctorRouter