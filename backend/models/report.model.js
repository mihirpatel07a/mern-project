import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  message : {
    type: String,
    required: true,
  },

  userRef : {
    type : String,
    required : true,
  }, 
   
  listingid : {
    type : String,
    required : true,
  },

  userId : {
    type : String,
    required : true,
  }


},{timestamps : true}
);

const report = mongoose.model('report' , ReportSchema);

export default report;