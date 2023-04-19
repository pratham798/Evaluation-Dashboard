import { v4 as uuidv4 } from "uuid";
import mentors from "../Models/Mentor.js";
import Students from "../Models/Student.js";

//Adding mentors
export const addMentor = async (req, res) => {
  try {
    const { MentorName } = req.body;
    //uuidv4 is an nmp package which gives a unique string which consist of letters and numbers this is serving as a unique id given to mentor
    const MentorId = uuidv4();
    const newMentor = await mentors.create({
      MentorName,
      MentorId,
    });
    res.status(200).json({ success: "true", data: newMentor });
  } catch (err) {
    res.status(500).json({ success: "false", message: err });
  }
};

//Showing all the mentors
export const showMentor = async (req, res) => {
  try {
    const getMentor = await mentors.find({});
    res.status(200).json({ success: "true", data: getMentor });
  } catch (err) {
    res.status(500).json({ success: "false", message: err });
  }
};

//increase student count
export const incCount = async (req, res) => {
  const mentor = req.params.mentorId;
  try {
    const Mentor = await mentors.findOne({ MentorId: mentor });
    Mentor.StudentCount = Mentor.StudentCount + 1;
    await Mentor.save();
    res.status(200).json({ success: "true", message: "count increased" });
  } catch (error) {
    res.status(500).json({ success: "false", message: error });
  }
};

//decrease student count
export const decCount = async (req, res) => {
  const mentor = req.params.mentorId;
  try {
    const Mentor = await mentors.findOne({ MentorId: mentor });
    Mentor.StudentCount = Mentor.StudentCount - 1;
    await Mentor.save();
    res.status(200).json({ success: "true", message: "count decreased" });
  } catch (error) {
    res.status(500).json({ success: "false", message: error });
  }
};

//
export const submitMarks = async (req, res) => {
  try {
    const { student } = req.body;
    for (let i = 0; i < student.length; i++) {
      await Students.findByIdAndUpdate(
        { _id: student[i] },
        { isLocked: "true" }
      );
    }
    res.status(200).json({ success: "true", message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: "false", message: error });
  }
};
