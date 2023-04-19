import React, { useState, useEffect } from "react";
import "./mentor.css";

const students = [
  {
    id: 1,
    name: "John Doe",
    english: 75,
    math: 80,
    science: 85,
    isAssigned: false,
    isLocked: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    english: 85,
    math: 90,
    science: 95,
    isAssigned: false,
    isLocked: true,
  },
  {
    id: 3,
    name: "Bob Johnson",
    english: 70,
    math: 75,
    science: 80,
    isAssigned: false,
    isLocked: true,
  },
];

const Mentor = ({ data, coach }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [filterOption, setFilterOption] = useState("All");

  //Fetching All mentors
  const [mentors, setMentor] = useState([]);
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
  const getStudentData = (id) => {
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
      // (await response.json());
      let res = await response.json();
      return res.data;
    };

    let data = getData();
    return data;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  //Update Student
  const updateStudent = async (student) => {
    const updatedStudent = {
      Name: student.Name,
      Email: student.Email,
    };
    await fetch(`http://localhost:3001/api/v1/students/update/${student._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    });
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

  const MentorList = ({ data, coach }) => {
    const [studentData, setStudentData] = useState([]);
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
          console.log(res);
          return res.data;
        };

        let data = await getData();
        setStudentData(data);
      };

      getStudentData(coach);
    }, []);
    return (
      <div className="mentor">
        <h1 className="heading">Mentor - {coach}</h1>
        <hr />
        <p>List of all the Students that Mentor1 Assigned</p>
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
                    <button onClick={() => handleEditClick()}>Edit</button>
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
                </div>
              </form>
            </div>
          )}
          <button type="Submit">Evaluate</button>
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
          return <MentorList key={index} coach={mentor.MentorId} />;
        })}
      </div>
    </>
  );
};

export default Mentor;
