import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../src/components/layout/layout";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import Dashboard from "../src/pages/Dashboard";
import Jobs from "../src/pages/Jobs";
import Pipelines from "../src/pages/Pipelines";
import Candidates from "../src/pages/Candidates";
import { useAuthStore } from "./services/store";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/* Protected routes (inside Layout) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace/>} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="jobs" element={<Jobs/>} />
          <Route path="pipelines" element={<Pipelines/>} />
          <Route path="candidates" element={<Candidates/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}