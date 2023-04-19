import React, { useState, useEffect } from "react";
import "./mentor.css";
import { toast } from "react-toastify";

const Mentor = ({ data, coach }) => {
  //Removing Students
  const removeStudent = async (student, mentorId) => {
    console.log(student._id + "yo " + mentorId);
    const studentId = student._id;
    await fetch(
      `http://localhost:3001/api/v1/students/unassign?param1=${studentId}&param2=${mentorId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await fetch(`http://localhost:3001/api/v1/mentor/decrease/${mentorId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //Fetching All mentors
  const [mentors, setMentor] = useState([]);

  //Update Student
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

    toast.info("Student Updated");
  };

  useEffect(() => {
    const fetchMentors = async () => {
      const allMentors = await fetch(
        "http://localhost:3001/api/v1/mentor/viewMentor"
      );
      const res = await allMentors.json();
      setMentor(res.data);
    };
    fetchMentors();
  }, []);

  //Fetching Students by mentorId
  const MentorList = ({ coach }) => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentData, setStudentData] = useState([]);
    //Evaluation Students
    const evaluateStudent = async (studentData) => {
      console.log(studentData);
      {
        studentData.map(
          async (studentId) =>
            await fetch(
              `http://localhost:3001/api/v1/students/evaluate/${studentId._id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
        );
      }
      studentData.map((student) => {
        student.isEvaluated = false;
      });
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setSelectedStudent((prevStudent) => ({
        ...prevStudent,
        [name]: Number(value),
      }));
    };

    const handleEditClick = (student) => {
      if (student.isEvaluated) {
        toast.warn("Student Already Evaluated");
        return;
      }
      setSelectedStudent(student);
    };

    const handleDialogClose = () => {
      setSelectedStudent(null);
    };
    useEffect(() => {
      const getStudentData = async (id) => {
        const getData = async () => {
          const response = await fetch(
            `http://localhost:3001/api/v1/students/studentbyMentor/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          let res = await response.json();
          // console.log(res);
          return res.data;
        };

        let data = await getData();
        setStudentData(data);
      };

      getStudentData(coach.MentorId);
    }, []);
    return (
      <div className="mentor">
        <h1 className="heading">Mentor - {coach.MentorName}</h1>
        <hr />
        <p>List of all the Students that {coach.MentorName} Assigned</p>
        <hr />

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
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {studentData?.map((data) => (
                <tr key={data?._id}>
                  <td>{data?.Name}</td>
                  <td>{data?.Design}</td>
                  <td>{data?.Implementation}</td>
                  <td>{data?.CodeQuality}</td>
                  <td>{data?.Explanation}</td>
                  <td>{data?.TotalMarks}</td>
                  <td>
                    <button onClick={() => handleEditClick(data)}>
                      {!data.isEvaluated ? "Edit" : "Evaluated"}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => removeStudent(data, coach.MentorId)}>
                      Unassign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedStudent && (
            <div className="dialog">
              <h2>Edit Student Details</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateStudent(selectedStudent);
                  handleDialogClose();
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
                    min={0}
                    max={10}
                    name="Design"
                    value={selectedStudent.Design}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Implementation:
                  <input
                    type="number"
                    min={0}
                    max={10}
                    name="Implementation"
                    value={selectedStudent.Implementation}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  CodeQuality:
                  <input
                    type="number"
                    min={0}
                    max={10}
                    name="CodeQuality"
                    value={selectedStudent.CodeQuality}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Explanation:
                  <input
                    type="number"
                    min={0}
                    max={10}
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
                </div>
              </form>
            </div>
          )}
          {coach.StudentCount >= 3 && (
            <button type="Submit" onClick={() => evaluateStudent(studentData)}>
              Evaluate
            </button>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="main">
        <h2 className="heading1">Mentor List</h2>
        <p>List of all the Mentor of this Organisations</p>
        {mentors.map((mentor, index) => {
          return <MentorList key={index} coach={mentor} />;
        })}
      </div>
    </>
  );
};

export default Mentor;
