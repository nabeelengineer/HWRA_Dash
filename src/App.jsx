import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ManageDevice from "./pages/ManageDevice";
import Reports from "./pages/Reports";
import Login from "./pages/login";

function App() {
  const [expanded, setExpanded] = React.useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {user && <Sidebar expanded={expanded} setExpanded={setExpanded} />}
        <div style={{ flex: 1, padding: "20px", marginLeft: expanded ? "256px" : "64px", transition: "margin-left 0.3s" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manage-device" element={<ManageDevice />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const Logout = () => {
  React.useEffect(() => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }, []);

  return <h1>Logging out...</h1>;
};

export default App;
