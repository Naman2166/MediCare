//time :- 10 hr 17 min

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId : { type: String , required : true },
    docId : { type: String , required : true },
    slotDate : { type: String , required : true },
    slotTime : { type: String , required : true },
    userData : { type: Object , required : true },
    docData : { type: Object , required : true },
    amount : { type: Number , required : true },
    date : { type: Number , required : true },                  //date of appointment 
    cancelled : { type: Boolean , required : false},           //if appointment cancels => true , otherwise false
    payment : { type: Boolean , required : false },             //if payment done by user => true , otherwise false
    isCompleted : { type: Boolean , required : false },         // if appointment isCompleted => true , otherwise false
})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)                //if "appointment" model already exists we use it , otherwise we create new model "appointment"


export default appointmentModel