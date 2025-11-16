// src/components/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useUIStore } from "../../services/store";
import "./layout.css";

export default function Layout() {
  const sidebarOpen = useUIStore((state: any) => state.sidebarOpen); 
  const mainContentMargin = sidebarOpen ? 'ml-64' : 'ml-20';

  return (
    <div className="min-h-max bg-gray-50 font-sans">
      <Topbar />
      <Sidebar/>

      {/* Main content area */}
      <main className={`layout-main pt-16 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <div className="p-0"> 
          <Outlet/>
        </div>
      </main>
    </div>
  );
}