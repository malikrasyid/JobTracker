// src/components/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useUIStore } from "../../services/store";
import "./layout.css";

export default function Layout() {
  const sidebarOpen = useUIStore((state: any) => state.sidebarOpen); 

  return (
    <div className="layout-container" style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
      {/* Top bar */}
      <Topbar />

      {/* Sidebar (fixed) */}
      <div
        className={`sidebar-fixed ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
      >
        <Sidebar/>
      </div>

      {/* Main content area */}
      <div
        className="app-main"
        style={{ marginLeft: sidebarOpen ? 256 : 72 }}
      >
        <main className="main-content" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
          <div className="max-w-7xl mx-auto w-full">
            <Outlet /> 
            {/* 👆 This will render the current route's page */}
          </div>
        </main>
      </div>
    </div>
  );
}
