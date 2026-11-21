
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>PlacementPro</h2>

        <Link to="/">Dashboard</Link>
        <Link to="/add-student">Add Student</Link>
        <Link to="/students">Student List</Link>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        <header>
          <h1>Placement Skill Monitoring</h1>
          <p>Student Placement Management Dashboard</p>
        </header>

        {/* Statistics */}
        <div className="stats-container">

          <div className="stat-card">
            <h3>Total Students</h3>
            <h1>0</h1>
          </div>

          <div className="stat-card">
            <h3>Placement Ready</h3>
            <h1>0</h1>
          </div>

          <div className="stat-card">
            <h3>Not Ready</h3>
            <h1>0</h1>
          </div>

          <div className="stat-card">
            <h3>Average Aptitude</h3>
            <h1>0%</h1>
          </div>

        </div>

        {/* Welcome Section */}
        <section className="welcome-card">

          <h2>Welcome to PlacementPro!</h2>

          <p>
            Monitor student technical skills, aptitude,
            communication and placement readiness.
          </p>

          <Link to="/add-student" className="add-button">
            + Add New Student
          </Link>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;
