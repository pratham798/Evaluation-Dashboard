import Students from "../Models/Student.js";

export const addStudent = async (req, res) => {
  try {
    const { Name, Email } = req.body;
    const newStudent = await Students.create({ Name, Email });
    res.status(200).json({ success: "true", data: newStudent });
  } catch (err) {
    res.status(500).json({ success: "false", message: err });
  }
};

export const updateMarks = async (req, res) => {
  try {
    const { Design, Implementation, CodeQuality, Explanation } = req.body;
    const studentId = req.params.studentId;

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

    if (
      Design != -1 &&
      Implementation != -1 &&
      CodeQuality != -1 &&
      Explanation != -1
    ) {
      TotalMarks = Design + Implementation + CodeQuality + Explanation;
    } else {
      TotalMarks = -1;
    }

    changeMarks.TotalMarks = TotalMarks;
    await changeMarks.save();
    console.log("User Data", changeMarks);

    res.status(200).json({ success: "true", data: changeMarks });
  } catch (err) {
    res.status(500).json({ success: "false", message: err });
  }
};

export const viewStudents = async (req, res) => {
  try {
    const students = await Students.find({});
    res.status(200).json({ success: "true", data: students });
  } catch (err) {
    res.status(500).json({ success: "false", message: err });
  }
};

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
