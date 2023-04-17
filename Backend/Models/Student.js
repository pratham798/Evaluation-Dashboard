import mongoose, { Schema } from "mongoose";

const student = mongoose.Schema({
  Name: { type: String, required: true },
  isAssigned: { type: Boolean, default: false },
  isEvaluated: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false },
  Email: { type: String, required: true },
  Design: { type: Number, default: -1 },
  Implementation: { type: Number, default: -1 },
  CodeQuality: { type: Number, default: -1 },
  Explanation: { type: Number, default: -1 },
  TotalMarks: { type: Number, default: -1 },
  mentorId: {
    type: Schema.Types.ObjectId,
    ref: "Mentors",
  },
});

const StudentSchema = mongoose.model("Students", student);
export default StudentSchema;
