
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/add-student" element={<AddStudent />} />

        <Route path="/students" element={<StudentList />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
