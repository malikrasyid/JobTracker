import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Pipelines from "./pages/Pipelines";
import Candidates from "./pages/Candidates";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/pipelines" element={<Pipelines />} />
          <Route path="/candidates" element={<Candidates />} />
        </Routes>
      </Layout>
    </Router>
  );
}
