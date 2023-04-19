import mongoose, { Schema } from "mongoose";

const student = mongoose.Schema({
  Name: { type: String, required: true },
  isAssigned: { type: Boolean, default: false },
  isEvaluated: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false },
  Email: { type: String, required: true },
  Design: { type: Number, max: 10, default: -1 },
  Implementation: { type: Number, max: 10, default: -1 },
  CodeQuality: { type: Number, max: 10, default: -1 },
  Explanation: { type: Number, max: 10, default: -1 },
  TotalMarks: { type: Number, max: 40, default: -1 },
  mentorId: {
    type: String,
  },
});

const StudentSchema = mongoose.model("Students", student);
export default StudentSchema;
