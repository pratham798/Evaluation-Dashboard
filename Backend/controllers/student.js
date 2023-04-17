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
  return res.send("Update Student");
};

export const finalize = async (req, res) => {
  return res.send("Lock Student");
};

export const deleteStudent = async (req, res) => {
  return res.send("Delete Student");
};
