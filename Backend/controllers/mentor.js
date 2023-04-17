import { v4 as uuidv4 } from "uuid";
import mentors from "../Models/Mentor.js";
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
