import mongoose from "mongoose";

const mentor = mongoose.Schema({
  MentorName: { type: String, required: true },
  MentorId: { type: String, required: true },
  //Limit is assigned as the mentor could only assign minimum of 3 and maximum of 4 students
  StudentCount: { type: Number, max: 4, default: 0 },
});

const MentorSchema = mongoose.model("Mentors", mentor);
export default MentorSchema;
