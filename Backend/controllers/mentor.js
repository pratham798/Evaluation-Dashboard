import { v4 as uuidv4 } from "uuid";
import mentors from "../Models/Mentor.js";
import Students from "../Models/Student.js";
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
