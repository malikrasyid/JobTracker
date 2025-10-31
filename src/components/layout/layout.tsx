// src/components/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useUIStore } from "../../services/store";

export default function Layout() {
  const sidebarOpen = useUIStore((state: any) => state.sidebarOpen); 

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {sidebarOpen && <Sidebar/>}

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <Topbar />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> 
          {/* 👆 This will render the current route’s page */}
        </main>
      </div>
    </div>
  );
}
