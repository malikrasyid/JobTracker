import type { FC } from "react";
import { useAuthStore, useUIStore } from "../../services/store";
import { LogOut, Bell, User, Menu } from "lucide-react";
import logo from "../../assets/jobtracker_logo.png";
import "./layout.css";

const TopBar: FC = () => {
  const { user, logout } = useAuthStore();
  const toggleSidebar = useUIStore((s: any) => s.toggleSidebar);

  return (
    <header className="topbar" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '64px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', padding: '0 1.5rem', width: '100%' }}>
      {/* Left side: Sidebar toggle + Logo + App Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="rounded-md border border-gray-200 hover:bg-gray-100 w-9 h-9 flex items-center justify-center"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        <img 
          src={logo} 
          alt="JobTracker Logo" 
          className="topbar-logo w-5 h-5" 
        />
        <span className="topbar-brand text-gray-800" style={{ fontSize: '1.125rem', fontWeight: 700 }}>JobTracker</span>
      </div>

      {/* Right side: Notification, Profile, Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div className="topbar-profile flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-200" aria-label="Notifications">
          <Bell className="w-5 h-5 text-gray-600" />
        </div>
        <div className="topbar-profile flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-200">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">{user?.name || "Guest"}</span>
        </div>
        <div className="topbar-profile flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-200 cursor-pointer" onClick={logout} role="button" aria-label="Logout">
          <LogOut className="w-4 h-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">Logout</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
