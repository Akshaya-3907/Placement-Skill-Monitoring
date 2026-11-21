import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h2>Placement Skill Monitoring</h2>

        <Link to="/">Home</Link>
        <Link to="/add">Add Student</Link>
        <Link to="/students">Student List</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/students" element={<StudentList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;