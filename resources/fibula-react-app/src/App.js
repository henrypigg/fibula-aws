import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FemrInstallationGuide from "./components/FemrInstallationGuide";
import NewUserEnrollmentForm from "./components/NewUserEnrollmentForm";
import NewCoderEnrollmentForm from "./components/NewCoderEnrollmentForm";

function App() {
    return (
        <Router>
            <nav>
                <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/install/mac">Mac Installation Guide</Link>
                </li>
                <li>
                    <Link to="/enroll/user">User Enrollment Form</Link>
                </li>
                <li>
                    <Link to="/enroll/coder">Coder Enrollment Form</Link>
                </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<div>Fibula Home</div>} />
                <Route path="/install/mac" element={<FemrInstallationGuide />} />
                <Route path="/enroll/user" element={<NewUserEnrollmentForm />} />
                <Route path="/enroll/coder" element={<NewCoderEnrollmentForm />} />
            </Routes>
        </Router>
    );
}

export default App;
