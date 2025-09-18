import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import WellnessModule from './components/WellnessModule';
import MoodTracker from './components/MoodTracker';
import Journal from './components/Journal';
import Chatbot from './components/Chatbot';
import TherapyModule from './components/TherapyModule';
import Consultation from './components/Consultation';
import DoctorLogin from './components/DoctorLogin';
import DoctorPanel from './components/DoctorPanel';
import StudentPortal from './components/StudentPortal';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wellness" element={<WellnessModule />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/therapy" element={<TherapyModule />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/doctor-panel" element={<DoctorPanel />} />
          <Route path="/student-portal" element={<StudentPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;