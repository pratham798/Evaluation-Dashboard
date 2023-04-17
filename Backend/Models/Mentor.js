import mongoose from "mongoose";

const mentor = mongoose.Schema({
  MentorName: { type: String, required: true },
  MentorId: { type: String, required: true },
  StudentCount: { type: Number, default: 0 },
});

const MentorSchema = mongoose.model("Mentors", mentor);
export default MentorSchema;
