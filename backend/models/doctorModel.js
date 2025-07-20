//To store doctor data in our database
//For storing data in database :- 1)create Schema , 2)create Model[ie collection] , 3)Insert new data[ie document] in Model , 4)save the document [using save() function] in database


import mongoose from "mongoose";



const ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedback: { type: String, trim: true, maxlength: 500 },
    createdAt: { type: Date, default: Date.now }
  }, { _id: true });




//creating Schema
const doctorSchema = new mongoose.Schema({
    name : { type:String , required:true } ,           //object having key-value pair
    email : { type:String , required:true , unique:true } ,   
    password : { type:String , required:true } ,   
    image : { type:String , required:true } ,   
    speciality : { type:String , required:true } ,   
    degree : { type:String , required:true } ,   
    experience : { type:String , required:true } ,   
    about : { type:String , required:true } ,   
    available : { type:Boolean , default:true } ,   
    fees : { type:Number , required:true } ,   
    address : { type:Object , required:true } ,   
    date : { type:Number , required:true } ,   
    slot_booked : { type:Object , default:{} } ,        //default value => empty object (ie empty slot)      //it stores the list of slots which are already booked

    // New fields for rating system
    ratings: [ratingSchema], // Array of rating documents
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalRatings: { type: Number, default: 0 }
},
{
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    minimize:false   
    //By default, Mongoose removes empty objects ({}) from the document before saving.(ie if "slot_booked" is left empty, then mongoose automatically removes that 'slot_empty' option )
    // therefore to prevent this automatically removing of empty object , we use "minimize:false" 
} )


/* In Mongoose, when defining a schema, there are two main parts:
 - Schema Definition (Field Structure) → Defines the shape of the document (fields, types, constraints).
 - Schema Options → Provides additional settings for how Mongoose handles the schema.
*/




// Method to calculate average rating
doctorSchema.methods.calculateAverageRating = function() {
    if (this.ratings.length === 0) {
      this.averageRating = 0;
      this.totalRatings = 0;
      return;
    }
    
    const sum = this.ratings.reduce((total, rating) => total + rating.rating, 0);
    this.averageRating = (sum / this.ratings.length).toFixed(1);
    this.totalRatings = this.ratings.length;
  };
  
  // Pre-save hook to update average rating
  doctorSchema.pre('save', function(next) {
    this.calculateAverageRating();
    next();
  });





//creating Model (ie collection)
const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema )           // if "doctor" model is available then we use that, otherwise we create new "doctor" model    
                                          // moongose.model( <model-name> , <schema-name> )




export default doctorModel;              


                                                                                            