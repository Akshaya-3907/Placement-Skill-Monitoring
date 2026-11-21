
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchStudents() {
      try {
        const response = await axios.get("/api/students");

        if (!ignore) {
          setStudents(response.data);
          setError("");
        }
      } catch (err) {
        console.error("Dashboard error:", err);

        if (!ignore) {
          setError("Unable to load dashboard data.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchStudents();

    return () => {
      ignore = true;
    };
  }, []);

  const total = students.length;

  const ready = students.filter(
    (s) => s.readiness === "Ready"
  ).length;

  const progress = students.filter(
    (s) => s.readiness === "In Progress"
  ).length;

  const notReady = students.filter(
    (s) => s.readiness === "Not Ready"
  ).length;

  const avgAptitude = total
    ? (students.reduce((sum, s) => sum + Number(s.aptitudeScore || 0), 0) / total).toFixed(1)
    : 0;

  const avgCommunication = total
    ? (students.reduce((sum, s) => sum + Number(s.communicationScore || 0), 0) / total).toFixed(1)
    : 0;

  const departments = [
    ...new Set(students.map((s) => s.department).filter(Boolean))
  ];

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <p className="dashboard-label">PLACEMENT MANAGEMENT</p>
          <h1>Dashboard Overview</h1>
          <p>Monitor student skills and placement readiness.</p>
        </div>
        <div className="dashboard-icon">📊</div>
      </div>

      {loading && <p>Loading dashboard...</p>}

      {error && <div className="dashboard-error">{error}</div>}

      {!loading && !error && (
        <>
          <div className="stats-grid">

            <div className="stat-card total-card">
              <div className="stat-icon">👥</div>
              <p>Total Students</p>
              <h2>{total}</h2>
              <span>Registered students</span>
            </div>

            <div className="stat-card ready-card">
              <div className="stat-icon">✓</div>
              <p>Ready Students</p>
              <h2>{ready}</h2>
              <span>Placement ready</span>
            </div>

            <div className="stat-card progress-card">
              <div className="stat-icon">◷</div>
              <p>In Progress</p>
              <h2>{progress}</h2>
              <span>Skills developing</span>
            </div>

            <div className="stat-card notready-card">
              <div className="stat-icon">!</div>
              <p>Not Ready</p>
              <h2>{notReady}</h2>
              <span>Needs improvement</span>
            </div>

          </div>

          <div className="performance-section">
            <h2>Performance Overview</h2>

            <div className="performance-grid">

              <div className="performance-card">
                <p>Average Aptitude Score</p>
                <h2>{avgAptitude}<small> / 100</small></h2>
                <div className="progress-track">
                  <div
                    className="progress-fill aptitude-fill"
                    style={{ width: `${avgAptitude}%` }}
                  />
                </div>
              </div>

              <div className="performance-card">
                <p>Average Communication Score</p>
                <h2>{avgCommunication}<small> / 100</small></h2>
                <div className="progress-track">
                  <div
                    className="progress-fill communication-fill"
                    style={{ width: `${avgCommunication}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="department-section">
            <h2>Department Overview</h2>

            <div className="department-card">
              {departments.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Student Count</th>
                    </tr>
                  </thead>

                  <tbody>
                    {departments.map((department) => (
                      <tr key={department}>
                        <td>{department}</td>
                        <td>
                          {students.filter(
                            (s) => s.department === department
                          ).length}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No department data available.</p>
              )}
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default Home;
