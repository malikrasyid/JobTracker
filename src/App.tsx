import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../src/components/layout/layout";
import Dashboard from "../src/pages/Dashboard";
import Jobs from "../src/pages/Jobs";
import Pipelines from "../src/pages/Pipelines";
import Candidates from "../src/pages/Candidates";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wraps all main pages */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/pipelines" element={<Pipelines />} />
          <Route path="/candidates" element={<Candidates />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}