
import { useEffect, useState } from "react";
import axios from "axios";
import "./StudentList.css";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [readinessFilter, setReadinessFilter] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    department: "",
    technicalSkills: "",
    aptitudeScore: "",
    communicationScore: "",
    readiness: "Not Ready"
  });

  // Fetch students when page loads
  useEffect(() => {
    let ignore = false;

    async function loadStudents() {
      try {
        const response = await axios.get("/api/students");

        if (!ignore) {
          const data = Array.isArray(response.data)
            ? response.data
            : response.data.students || [];

          setStudents(data);
          setError("");
        }
      } catch (err) {
        console.error("Fetch error:", err);

        if (!ignore) {
          setError("Unable to load student details.");
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

  // Refresh student list
  const fetchStudents = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/api/students");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.students || [];

      setStudents(data);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to load student details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Start editing
  const handleEdit = (student) => {
    setEditingId(student._id);

    setEditForm({
      name: student.name || "",
      department: student.department || "",
      technicalSkills: student.technicalSkills || "",
      aptitudeScore: student.aptitudeScore ?? "",
      communicationScore: student.communicationScore ?? "",
      readiness: student.readiness || "Not Ready"
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);

    setEditForm({
      name: "",
      department: "",
      technicalSkills: "",
      aptitudeScore: "",
      communicationScore: "",
      readiness: "Not Ready"
    });
  };

  // Update student
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedStudent = {
        ...editForm,
        aptitudeScore: Number(editForm.aptitudeScore),
        communicationScore: Number(editForm.communicationScore)
      };

      await axios.put(
        `/api/students/${editingId}`,
        updatedStudent
      );

      alert("Student updated successfully!");

      setEditingId(null);
      fetchStudents();
    } catch (err) {
      console.error("Update error:", err);
      alert(
        err.response?.data?.message || "Unable to update student."
      );
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/students/${id}`);

      alert("Student deleted successfully!");

      setStudents((prev) =>
        prev.filter((student) => student._id !== id)
      );
    } catch (err) {
      console.error("Delete error:", err);
      alert(
        err.response?.data?.message || "Unable to delete student."
      );
    }
  };

  // Search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch = (student.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment = departmentFilter
      ? student.department === departmentFilter
      : true;

    const matchesReadiness = readinessFilter
      ? student.readiness === readinessFilter
      : true;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesReadiness
    );
  });

  return (
    <div className="student-list-page">
      <div className="student-list-header">
        <div>
          <h1>Student List</h1>
          <p>Manage and monitor student placement skills</p>
        </div>

        <button
          type="button"
          className="refresh-btn"
          onClick={fetchStudents}
        >
          Refresh
        </button>
      </div>

      {/* Search and Filters */}
      <div className="student-filters">
        <input
          type="text"
          placeholder="Search student by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={departmentFilter}
          onChange={(e) =>
            setDepartmentFilter(e.target.value)
          }
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="CS">CS</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
        </select>

        <select
          value={readinessFilter}
          onChange={(e) =>
            setReadinessFilter(e.target.value)
          }
        >
          <option value="">All Readiness</option>
          <option value="Ready">Ready</option>
          <option value="In Progress">In Progress</option>
          <option value="Not Ready">Not Ready</option>
        </select>

        <button
          type="button"
          className="clear-filter-btn"
          onClick={() => {
            setSearch("");
            setDepartmentFilter("");
            setReadinessFilter("");
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Loading and Error */}
      {loading && <p className="loading-message">Loading students...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <div className="student-count">
            Showing {filteredStudents.length} of {students.length} students
          </div>

          {/* Edit Form */}
          {editingId && (
            <div className="edit-student-form">
              <h2>Edit Student</h2>

              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="name"
                  placeholder="Student Name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  required
                />

                <select
                  name="department"
                  value={editForm.department}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="CS">CS</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                </select>

                <input
                  type="text"
                  name="technicalSkills"
                  placeholder="Technical Skills"
                  value={editForm.technicalSkills}
                  onChange={handleEditChange}
                  required
                />

                <input
                  type="number"
                  name="aptitudeScore"
                  placeholder="Aptitude Score"
                  min="0"
                  max="100"
                  value={editForm.aptitudeScore}
                  onChange={handleEditChange}
                  required
                />

                <input
                  type="number"
                  name="communicationScore"
                  placeholder="Communication Score"
                  min="0"
                  max="100"
                  value={editForm.communicationScore}
                  onChange={handleEditChange}
                  required
                />

                <select
                  name="readiness"
                  value={editForm.readiness}
                  onChange={handleEditChange}
                  required
                >
                  <option value="Ready">Ready</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Not Ready">Not Ready</option>
                </select>

                <div className="edit-actions">
                  <button type="submit" className="update-btn">
                    Update Student
                  </button>

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Student Table */}
          <div className="student-table-container">
            <table className="student-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Technical Skills</th>
                  <th>Aptitude</th>
                  <th>Communication</th>
                  <th>Readiness</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.department}</td>
                      <td>{student.technicalSkills}</td>
                      <td>{student.aptitudeScore}%</td>
                      <td>{student.communicationScore}%</td>

                      <td>
                        <span
                          className={`readiness-badge ${
                            (student.readiness || "Not Ready")
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                          }`}
                        >
                          {student.readiness || "Not Ready"}
                        </span>
                      </td>

                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="edit-btn"
                            onClick={() => handleEdit(student)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(student._id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default StudentList;
