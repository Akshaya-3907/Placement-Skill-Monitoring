
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Students from Backend
  useEffect(() => {
    let ignore = false;

    async function loadStudents() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/students"
        );

        if (!ignore) {
          setStudents(response.data);
          setError("");
        }
      } catch {
        if (!ignore) {
          setError("Unable to load student records. Check backend.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadStudents();

    return () => {
      ignore = true;
    };
  }, []);

  // Delete Student
  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );

      setStudents((previous) =>
        previous.filter((student) => student._id !== id)
      );

      alert("Student Deleted Successfully");
    } catch {
      alert("Unable to delete student");
    }
  };

  return (
    <div className="page-container">
      <div className="form-header">
        <div>
          <h1>Student Skill List</h1>
          <p>View and manage student placement records</p>
        </div>

        <Link to="/" className="back-button">
          Back to Dashboard
        </Link>
      </div>

      <Link to="/add-student" className="add-button">
        + Add Student
      </Link>

      {loading && <p>Loading students...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && students.length === 0 && (
        <p className="empty-message">
          No student records found. Add your first student!
        </p>
      )}

      {!loading && students.length > 0 && (
        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Register Number</th>
                <th>Email</th>
                <th>Technical Skills</th>
                <th>Aptitude</th>
                <th>Communication</th>
                <th>Readiness</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.studentName}</td>
                  <td>{student.registerNumber}</td>
                  <td>{student.email}</td>
                  <td>{student.technicalSkills.join(", ")}</td>
                  <td>{student.aptitudeScore}%</td>
                  <td>{student.communicationSkills}</td>
                  <td>{student.placementReadiness}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;
