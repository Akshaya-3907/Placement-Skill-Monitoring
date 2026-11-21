
import { useState } from "react";
import axios from "axios";
import "./AddStudent.css";

function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    department: "",
    technicalSkills: "",
    aptitudeScore: "",
    communicationScore: "",
    readiness: "Not Ready"
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/students", {
        ...student,
        aptitudeScore: Number(student.aptitudeScore),
        communicationScore: Number(student.communicationScore)
      });

      setMessage("Student added successfully!");

      setStudent({
        name: "",
        department: "",
        technicalSkills: "",
        aptitudeScore: "",
        communicationScore: "",
        readiness: "Not Ready"
      });

      console.log("Student saved:", response.data);

    } catch (err) {
      console.error("Add student error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to add student. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student-page">

      <div className="add-student-heading">
        <p className="add-student-label">
          PLACEMENT MANAGEMENT
        </p>

        <h2>Add New Student</h2>

        <p>
          Enter student details to monitor placement skills.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className="form-group">
          <label>Student Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter student name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Department</label>

          <select
            name="department"
            value={student.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Computer Science">
              Computer Science
            </option>
            <option value="Electronics and Communication">
              Electronics and Communication
            </option>
            <option value="Electrical and Electronics">
              Electrical and Electronics
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Civil Engineering">
              Civil Engineering
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Technical Skills</label>

          <input
            type="text"
            name="technicalSkills"
            placeholder="Example: Java, Python, React"
            value={student.technicalSkills}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Aptitude Score (0 - 100)</label>

          <input
            type="number"
            name="aptitudeScore"
            placeholder="Enter aptitude score"
            min="0"
            max="100"
            value={student.aptitudeScore}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Communication Score (0 - 100)</label>

          <input
            type="number"
            name="communicationScore"
            placeholder="Enter communication score"
            min="0"
            max="100"
            value={student.communicationScore}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Placement Readiness</label>

          <select
            name="readiness"
            value={student.readiness}
            onChange={handleChange}
            required
          >
            <option value="Ready">Ready</option>
            <option value="In Progress">In Progress</option>
            <option value="Not Ready">Not Ready</option>
          </select>
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Student"}
          </button>

          <button
            type="button"
            className="reset-btn"
            onClick={() => {
              setStudent({
                name: "",
                department: "",
                technicalSkills: "",
                aptitudeScore: "",
                communicationScore: "",
                readiness: "Not Ready"
              });
              setMessage("");
              setError("");
            }}
          >
            Reset
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddStudent;
