
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddStudent() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    registerNumber: "",
    email: "",
    technicalSkills: "",
    aptitudeScore: "",
    communicationSkills: "",
    placementReadiness: "Not Ready"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentData = {
        ...formData,
        technicalSkills: formData.technicalSkills
          .split(",")
          .map(skill => skill.trim())
          .filter(Boolean),
        aptitudeScore: Number(formData.aptitudeScore)
      };

      await axios.post(
        "http://localhost:5000/api/students",
        studentData
      );

      alert("Student Added Successfully!");

      navigate("/students");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to add student. Check backend connection."
      );
    }
  };

  return (
    <div className="form-page">

      <div className="form-header">
        <div>
          <h1>Add Student Skills</h1>
          <p>Enter student details and placement skills</p>
        </div>

        <Link to="/" className="back-button">
          Back to Dashboard
        </Link>
      </div>

      <form className="student-form" onSubmit={handleSubmit}>

        <h2>Student Information</h2>

        <label>Student Name</label>
        <input
          type="text"
          name="studentName"
          placeholder="Enter student name"
          value={formData.studentName}
          onChange={handleChange}
          required
        />

        <label>Register Number</label>
        <input
          type="text"
          name="registerNumber"
          placeholder="Enter register number"
          value={formData.registerNumber}
          onChange={handleChange}
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Technical Skills</label>
        <input
          type="text"
          name="technicalSkills"
          placeholder="Java, Python, React, SQL"
          value={formData.technicalSkills}
          onChange={handleChange}
          required
        />

        <label>Aptitude Score (0 - 100)</label>
        <input
          type="number"
          name="aptitudeScore"
          placeholder="Enter aptitude score"
          min="0"
          max="100"
          value={formData.aptitudeScore}
          onChange={handleChange}
          required
        />

        <label>Communication Skills</label>
        <select
          name="communicationSkills"
          value={formData.communicationSkills}
          onChange={handleChange}
          required
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label>Placement Readiness</label>
        <select
          name="placementReadiness"
          value={formData.placementReadiness}
          onChange={handleChange}
        >
          <option value="Ready">Ready</option>
          <option value="Not Ready">Not Ready</option>
        </select>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Add Student
          </button>

          <button
            type="reset"
            className="reset-button"
            onClick={() => setFormData({
              studentName: "",
              registerNumber: "",
              email: "",
              technicalSkills: "",
              aptitudeScore: "",
              communicationSkills: "",
              placementReadiness: "Not Ready"
            })}
          >
            Reset
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddStudent;
