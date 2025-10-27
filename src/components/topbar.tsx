import type { FC } from "react";
import { useAuthStore } from "../../store/authStore";
import { LogOut, Bell, User } from "lucide-react";

const TopBar: FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="flex items-center justify-between h-14 bg-white border-b shadow-sm px-6">
      {/* Left side: Logo + App Name */}
      <div className="flex items-center gap-2">
        <img src="/logo192.png" alt="Logo" className="w-8 h-8" />
        <span className="font-semibold text-lg text-gray-800">TalentFlow</span>
      </div>

      {/* Right side: Notification, Profile, Logout */}
      <div className="flex items-center gap-4">
        <button className="hover:bg-gray-100 rounded-full p-2">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
          <User className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">{user?.name || "Guest"}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopBar;
