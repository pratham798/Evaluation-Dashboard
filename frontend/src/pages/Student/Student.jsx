import React, { useEffect, useState } from "react";
import "./student.css";
const Student = ({ data }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [filterOption, setFilterOption] = useState("All");
  const [closeBox, setCloseBox] = useState(false);

  const [students, setStudent] = useState([]);
  const [filterStudentData, setFilterStudentData] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [addStudent, setAddStudent] = useState({
    Name: "",
    Email: "",
  });

  const [currentMentor, setCurrentMentor] = useState();
  const changeMentor = (e) => {
    const { value } = e.target;
    setCurrentMentor(value);
    console.log(value);
  };

  //Adding Students
  const changeValue = (e) => {
    const { name, value } = e.target;
    setAddStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const createStudent = async (student) => {
    const Student = {
      Name: student.Name,
      Email: student.Email,
    };
    await fetch("http://localhost:3001/api/v1/students/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Student),
    });
    setAddStudent({ Name: "", Email: "" });
  };

  //Fetching Students

  useEffect(() => {
    const fetchStudents = async () => {
      const allStudents = await fetch(
        "http://localhost:3001/api/v1/students/view"
      );
      const response = await allStudents.json();
      setStudent(response.data);
      setFilterStudentData(response.data);

      const allMentors = await fetch(
        "http://localhost:3001/api/v1/mentor/viewMentor"
      );
      const res = await allMentors.json();
      setMentor(res.data);
      setCurrentMentor(res.data[0].MentorId);
    };
    console.log(students);
    fetchStudents();
  }, [addStudent]);

  //Deleting Student
  const deleteStudent = async (id) => {
    await fetch(`http://localhost:3001/api/v1/students/delete/${id}`, {
      method: "POST",
    });
  };

  //Updating Student
  const updateStudent = async (student) => {
    const updatedStudent = {
      Design: student.Design,
      Implementation: student.Implementation,
      CodeQuality: student.CodeQuality,
      Explanation: student.Explanation,
      TotalMarks: student.TotalMarks,
    };
    await fetch(`http://localhost:3001/api/v1/students/update/${student._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    });
  };

  //Assigning Students By Mentor Name
  const AssignToMentor = async (student, mentorId) => {
    console.log(student._id + "yo " + mentorId);
    const studentId = student._id;
    await fetch(
      `http://localhost:3001/api/v1/students/assign?param1=${studentId}&param2=${mentorId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleFilter = (subject) => {
    const filtered = data.filter((student) => student[subject] >= 60);
    setFilteredData(filtered);
    setShowFilter(false);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
  };

  const handleDialogClose = () => {
    setSelectedStudent(null);
  };
  const handleIsAssignedClick = (event) => {
    setSelectedStudent({
      ...selectedStudent,
      isAssigned: event.target.checked,
    });
  };

  const handleIsLockedClick = (event) => {
    setSelectedStudent({
      ...selectedStudent,
      isLocked: event.target.checked,
    });
  };

  //Filter Students By Options
  const filterStudents = () => {
    if (filterOption === "All") {
      setFilterStudentData(students);
      //   return students;
    } else if (filterOption === "IsAssigned") {
      let arr = students.filter((student) => student.isAssigned);
      setFilterStudentData(arr);
      //   return students.filter((student) => student.isAssigned);
    } else if (filterOption === "IsEvaluated") {
      return students.filter((student) => student.isEvaluated);
    }
  };
  useEffect(() => {
    filterStudents();
  }, [filterOption]);
  return (
    <div className="student">
      <h1 className="heading">Student</h1>
      <hr />
      <p>List of all the Students</p>
      <hr />
      {/*  */}
      <div className="filter-container">
        <select value={currentMentor} onChange={changeMentor}>
          {mentor.map((mentors) => (
            <option value={mentors.MentorId}>{mentors.MentorName}</option>
          ))}
        </select>
        <button
          className="filter-button"
          onClick={() => setCloseBox(!closeBox)}
        >
          Add Students
        </button>
        <button className="filter-button">Filter</button>
        <div className="filter-dropdown">
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="IsAssigned">Is Assigned</option>
            <option value="IsEvaluated">Is Evaluated</option>
          </select>
        </div>
      </div>
      {/*  */}

      <div>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Design</th>
              <th>Implementation</th>
              <th>CodeQuality</th>
              <th>Explanation</th>
              <th>Total Marks</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterStudentData.map((student) => (
              <tr key={student.id}>
                <td>{student.Name}</td>
                <td>{student.Design}</td>
                <td>{student.Implementation}</td>
                <td>{student.CodeQuality}</td>
                <td>{student.Explanation}</td>
                <td>{student.TotalMarks == -1 ? 0 : student.TotalMarks}</td>
                <td>
                  <button onClick={() => handleEditClick(student)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => deleteStudent(student._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* MODIFY STUDENT */}
        {selectedStudent && (
          <div className="dialog">
            <h2>Edit Student Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateStudent(selectedStudent);
              }}
            >
              <label>
                Name:
                <input
                  type="text"
                  name="Name"
                  value={selectedStudent.Name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Design:
                <input
                  type="number"
                  name="Design"
                  value={selectedStudent.Design}
                  onChange={handleChange}
                />
              </label>
              <label>
                Implementation:
                <input
                  type="number"
                  name="Implementation"
                  value={selectedStudent.Implementation}
                  onChange={handleChange}
                />
              </label>
              <label>
                CodeQuality:
                <input
                  type="number"
                  name="CodeQuality"
                  value={selectedStudent.CodeQuality}
                  onChange={handleChange}
                />
              </label>
              <label>
                Explanation:
                <input
                  type="number"
                  name="Explanation"
                  value={selectedStudent.Explanation}
                  onChange={handleChange}
                />
              </label>
              <div className="dialog-buttons">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={handleDialogClose}>
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    !selectedStudent.isAssigned &&
                      AssignToMentor(selectedStudent, currentMentor);
                  }}
                >
                  {selectedStudent.isAssigned ? "Already assigned" : "Assign"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Adding Student */}

        {closeBox && (
          <div className="dialog">
            <h2>Add Student</h2>
            <form
              onSubmit={(e) => {
                createStudent(addStudent);
                e.preventDefault();
              }}
            >
              <label>
                Name:
                <input
                  type="text"
                  name="Name"
                  value={addStudent.Name}
                  onChange={changeValue}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="Email"
                  value={addStudent.Email}
                  onChange={changeValue}
                />
              </label>
              <div className="dialog-buttons">
                <button type="submit">Add Student</button>
                <button type="button" onClick={() => setCloseBox(!closeBox)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
