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
    <div className="min-h-screen bg-gray-50 font-sans">
      <Topbar />
      <Sidebar/>

      {/* Main content area */}
      <main className={`pt-16 p-6 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 min-h-[calc(100vh-80px)]">
            <Outlet/>
          <p className='mt-6 text-sm text-gray-400 border-t pt-4'>
            Current Sidebar State: {sidebarOpen ? 'Open (w-64)' : 'Closed (w-20)'}
          </p>
        </div>
      </main>
    </div>
  );
}
