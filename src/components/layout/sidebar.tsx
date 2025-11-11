import { NavLink } from "react-router-dom";
import { useUIStore } from "../../services/store";
import { LayoutDashboard, Workflow, Briefcase, Users, Menu, X, Bell } from "lucide-react";
import "./layout.css";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/pipelines", label: "Pipelines", icon: Workflow },
  { path: "/jobs", label: "Jobs", icon: Briefcase },
  { path: "/candidates", label: "Candidates", icon: Users },
];

const SideBar = () => {
  const { sidebarOpen }: any = useUIStore();
  
  // Use explicit conditional widths with lg: for desktop behavior
  const desktopWidth = sidebarOpen ? 'lg:w-64' : 'lg:w-20';
  
  // Mobile visibility: slide out by default, slide in when opened. Always show on desktop.
  const mobileToggle = sidebarOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <aside 
    className={`fixed left-0 top-16 bottom-0 z-30 w-64
      bg-gray-50
      flex flex-col transition-all duration-300 ease-in-out
      ${desktopWidth} ${mobileToggle} lg:translate-x-0`}
    >
       
      <nav className="flex-1 overflow-y-auto flex flex-col gap-1 px-3 py-1">
                {navItems.map(({ path, label, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }: any) =>
                            `sidebar-nav-link flex items-center 
                            rounded-xl text-gray-600 hover:bg-gray-100 
                            font-medium transition-colors duration-150 
                            ${isActive ? 'active' : ''} 
                            ${
                                sidebarOpen 
                                    ? 'gap-3 px-4 py-2.5 text-base'
                                    : 'justify-center py-2' 
                            }`
                        }
                    >
                        {/* Icon Size is now unified: w-6 h-6 */}
                        <Icon className="sidebar-nav-icon w-6 h-6 shrink-0" />
                        
                        {sidebarOpen && <span className="truncate">{label}</span>}
                    </NavLink>
                ))}
            </nav>
    </aside>
  );
};

export default SideBar;