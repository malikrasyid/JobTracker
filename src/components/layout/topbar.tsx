import { useAuthStore, useUIStore } from "../../services/store";
import { LogOut, Bell, User, Menu} from "lucide-react";
import logo from "../../assets/jobtracker_logo.png";
import "./layout.css";

const TopBar= () => {
  const { user, logout } = useAuthStore();
  const {toggleSidebar}: any = useUIStore();

  return (
    <header className={`fixed top-0 left-0 w-full z-40 
      h-14 bg-gray-50
      flex items-center justify-between px-3`}      
      >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className={` topbar-btn flex items-center justify-center w-10 h-10 rounded-lg
            text-gray-700`} 
        >
          <Menu className="w-5 h-5" />
          </button>
        <div className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="JobTracker Logo" 
            className="w-6 h-6" 
          />
          <span className="text-gray-800 text-lg font-bold">JobTracker</span>
        </div>
      </div>

      {/* Right side: Notification, Profile, Logout */}
      <div className="flex items-center gap-3">
        <button className="topbar-btn flex items-center justify-center w-10 h-10 rounded-lg
                          text-gray-700" 
        aria-label="Notifications">
          <Bell className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-blue-100/50 rounded-full px-3 py-1.5">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-blue-700">{user?.name}</span>
        </div>
        <button 
          className="topbar-btn flex items-center gap-2 rounded-lg px-3 py-3 
                    text-sm font-medium text-red-600" 
          onClick={logout} 
          role="button" 
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
