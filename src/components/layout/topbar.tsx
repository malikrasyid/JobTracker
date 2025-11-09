import { useAuthStore, useUIStore } from "../../services/store";
import { LogOut, Bell, User, Menu, X } from "lucide-react";
import logo from "../../assets/jobtracker_logo.png";
import "./layout.css";

const TopBar= () => {
  const { user, logout } = useAuthStore();
  const {toggleSidebar, sidebarOpen}: any = useUIStore();

  return (
    <header className={`fixed top-0 right-0 z-10 
      h-16 bg-white border-b border-gray-200 shadow-sm 
      flex items-center justify-between px-6 transition-all duration-300 ease-in-out
      ${sidebarOpen ? 'w-[calc(100%-16rem)]' : 'w-[calc(100%-5rem)]'} 
      `}>
      {/* Left side: Sidebar toggle + Logo + App Name */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 w-9 h-9 flex items-center justify-center transition-colors duration-150 shrink-0"        
        >
          {sidebarOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
        </button>
        <img 
          src={logo} 
          alt="JobTracker Logo" 
          className="topbar-logo w-5 h-5" 
        />
        <span className="topbar-brand text-gray-800" style={{ fontSize: '1.125rem', fontWeight: 700 }}>JobTracker</span>
      </div>

      {/* Right side: Notification, Profile, Logout */}
      <div className="flex items-center gap-3">
        <button className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors duration-150" aria-label="Notifications">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-blue-50 rounded-full pl-3 pr-4 py-1.5 border border-blue-200 cursor-default">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-blue-700">{user?.name}</span>
        </div>
        <button 
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-150"
          onClick={logout} 
          role="button" 
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
