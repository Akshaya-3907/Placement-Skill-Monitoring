
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";
import "./index.css";

// Connect frontend to deployed Render backend
axios.defaults.baseURL =
  "https://placement-skill-monitoring-q435.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
