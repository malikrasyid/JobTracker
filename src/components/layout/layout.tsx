// src/components/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useUIStore } from "../../services/store";
import "./layout.css";

export default function Layout() {
  const sidebarOpen = useUIStore((state: any) => state.sidebarOpen); 
  const mainContentMargin = sidebarOpen ? 'ml-56' : 'ml-16';

  return (
    <div className="h-screen overflow-hidden bg-gray-50 font-sans">
      <Topbar />
      <Sidebar/>

      {/* Main content area */}
      <main className={`layout-main absolute top-14 bottom-0 left-0 right-0 overflow-y-auto transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <div className="p-0"> 
          <Outlet/>
        </div>
      </main>
    </div>
  );
}