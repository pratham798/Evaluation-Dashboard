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
    const changeMarks = await Students.findOneAndUpdate(
      { _id: studentId },
      updateData
    );
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

export const finalize = async (req, res) => {
  return res.send("Lock Student");
};

export const deleteStudent = async (req, res) => {
  return res.send("Delete Student");
};
