import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FemrInstallationGuide from "./components/FemrInstallationGuide";
import FemrWindowsInstallationGuide from "./components/FemrWindowsInstallationGuide";
import NewUserEnrollmentForm from "./components/NewUserEnrollmentForm";
import NewCoderEnrollmentForm from "./components/NewCoderEnrollmentForm";
import AdminEnrollmentManagement from "./components/AdminEnrollmentManagement";
import './App.css';

function App() {
    return (
        <Router>
            <nav>
                <ul class="myUL">
                    <li class="link active">
                        <Link to="/">Home</Link>
                    </li>
                    <li class="link">
                        <Link to="/install/mac">Mac Installation Guide</Link>
                    </li>
                    <li class="link">
                        <Link to="/install/windows">Windows Installation Guide</Link>
                    </li>
                    <li class="link">
                        <Link to="/enroll/user">User Enrollment Form</Link>
                    </li>
                </ul>
            </nav>
            
            <Routes>
                <Route path="/" element={<center><div>Fibula Home</div></center>} />
                <Route path="/install/mac" element={<FemrInstallationGuide />} />
                <Route path="/install/windows" element={<FemrWindowsInstallationGuide />} />
                <Route path="/enroll/user" element={<NewUserEnrollmentForm />} />
                <Route path="/admin/enrollment-requests" element={<AdminEnrollmentManagement />} />
            </Routes>
        </Router>
    );
}

export default App;
