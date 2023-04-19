import mongoose, { isObjectIdOrHexString } from "mongoose";
import Students from "../Models/Student.js";

//Adding new Student
export const addStudent = async (req, res) => {
  try {
    const { Name, Email } = req.body;
    const newStudent = await Students.create({ Name, Email });
    res.status(200).json({ success: "true", data: newStudent });
  } catch (err) {
    res.status(500).json({ success: "false", message: err });
  }
};

//Updating Student Marks
export const updateMarks = async (req, res) => {
  try {
    const { Design, Implementation, CodeQuality, Explanation } = req.body;
    const studentId = req.params.studentId;
    console.log(studentId);
    console.log(req.body);

    const updateData = {
      Design,
      Implementation,
      CodeQuality,
      Explanation,
    };
    const changeMarks = await Students.findOne({ _id: studentId });
    if (changeMarks.isLocked) {
      return res.status(200).json({
        error: "Student already Evaluated",
      });
    }

    changeMarks.Design = Design;
    changeMarks.Implementation = Implementation;
    changeMarks.CodeQuality = CodeQuality;
    changeMarks.Explanation = Explanation;

    let TotalMarks = 0;
    TotalMarks = Design + Implementation + CodeQuality + Explanation;

    changeMarks.TotalMarks = TotalMarks;
    await changeMarks.save();
    console.log("User Data", changeMarks);

    res.status(200).json({ success: "true", data: changeMarks });
  } catch (err) {
    res.status(500).json({ success: "false", message: err });
  }
};

//Fetching all Students
export const viewStudents = async (req, res) => {
  try {
    const students = await Students.find({});
    res.status(200).json({ success: "true", data: students });
  } catch (err) {
    res.status(500).json({ success: "false", message: err });
  }
};

//Deleting Student
export const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const delStudent = await Students.findByIdAndDelete({ _id: studentId });
    res
      .status(200)
      .json({ success: "true", message: "Student sucessfully deleted" });
  } catch (error) {
    res.status(500).json({ success: "false", message: err });
  }
};

//Filter Student by Specific  Terms
export const filterStudent = async (req, res) => {
  try {
    console.log(req.query);
    const val = req.query.value;
    const filter = await Students.find({ val });
    res.status(200).json({ success: "true", data: filter });
  } catch (error) {
    res.status(500).json({ success: "false", message: err });
  }
};

//Assigning Mentor to Students

export const assignMentor = async (req, res) => {
  try {
    const { param1, param2 } = req.query;

    console.log(param1, param2);
    const assign = await Students.findOne({ _id: param1 });
    assign.mentorId = param2;
    assign.isAssigned = true;
    await assign.save();
    res.status(200).json({ success: "true", message: "Mentor Assigned" });
  } catch (error) {
    res.status(500).json({ success: "false", message: error });
  }
};

// Unassigning Mentor from Students

export const unassignMentor = async (req, res) => {
  try {
    const { param1, param2 } = req.query;

    console.log(param1, param2);
    const assign = await Students.findOne({ _id: param1 });
    assign.mentorId = "";
    assign.isAssigned = false;
    await assign.save();
    res.status(200).json({ success: "true", message: "Student UnAssigned" });
  } catch (error) {
    res.status(500).json({ success: "false", message: error });
  }
};

export const getStudentsByMentor = async (req, res) => {
  try {
    const mentorId = req.params.mentor;

    const students = await Students.find({ mentorId: mentorId });

    res.status(200).json({ success: "true", data: students });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: "false", message: err });
  }
};

export const evaluateStudent = async (req, res) => {
  try {
    const student = req.params.studentId;

    const studentData = await Students.findOne({ _id: student });
    studentData.isEvaluated = true;
    await studentData.save();

    res.status(200).json({ success: "true", message: "Student Evaluated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: "false", message: err });
  }
};
