import { useAuthStore, useUIStore } from "../../services/store";
import { LogOut, Bell, User, Menu, ChevronDown, ChevronUp} from "lucide-react";
import logo from "../../assets/jobtracker_logo.png";
import "./layout.css";
import { useState } from "react";

const TopBar= () => {
  const { user, logout } = useAuthStore();
  const {toggleSidebar}: any = useUIStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const ChevronIcon = isDropdownOpen ? ChevronUp : ChevronDown;

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
      <div className="flex items-center gap-1">
        <button className="topbar-btn flex items-center justify-center w-10 h-10 rounded-lg
                          text-gray-700" 
        aria-label="Notifications">
          <Bell className="w-5 h-5" />
        </button>
        <div className="relative">
            <button 
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-blue-100/50 rounded-2xl px-3 py-1.5 
                           text-sm font-medium text-blue-700 cursor-pointer hover:bg-blue-200/70 transition-colors"
                aria-expanded={isDropdownOpen}
            >
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block font-semibold text-blue-700">{user?.name}</span>
                <ChevronIcon className="w-4 h-4 text-blue-700 ml-1" />
            </button>

            {/* Dropdown Menu Content */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100">
                    
                    {/* User Info (Optional, but good context) */}
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        Signed in as <span className="font-semibold">{user?.email}</span>
                    </div>

                    {/* Logout Menu Item */}
                    <button 
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50" 
                        onClick={() => {
                            logout();
                            setIsDropdownOpen(false); // Close dropdown on action
                        }} 
                        role="menuitem"
                    >
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </button>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
