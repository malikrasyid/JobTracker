import { NavLink } from "react-router-dom";
import { useUIStore } from "../../services/store";
import { LayoutDashboard, Workflow, Briefcase, Users } from "lucide-react";
import "./layout.css";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/pipelines", label: "Pipelines", icon: Workflow },
  { path: "/jobs", label: "Jobs", icon: Briefcase },
  { path: "/candidates", label: "Candidates", icon: Users },
];

const SideBar = () => {
  const { sidebarOpen }: any = useUIStore();
  
  const sidebarWidth = sidebarOpen ? 'w-60' : 'w-16';

  return (
    <aside 
    className={`fixed left-0 top-16 bottom-0 z-30
      bg-gray-50
      flex flex-col transition-all duration-300 ease-in-out
      ${sidebarWidth}`}
    >
       
      <nav className="flex-1 overflow-y-auto flex flex-col gap-1 p-3">
                {navItems.map(({ path, label, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }: any) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg 
                            text-gray-700 no-underline 
                            hover:bg-gray-200 hover:text-gray-900 
                            focus:outline-none focus:ring-0 
                            active:text-gray-900 
                            visited:text-gray-700
                            ${isActive ? 'bg-gray-200 text-gray-900 font-semibold' : ''} 
                            ${
                                sidebarOpen 
                                    ? 'gap-3 px-1 py-2 text-base'
                                    : 'justify-center py-2' 
                            }`
                        }
                    >
                        {/* Icon Size is now unified: w-6 h-6 */}
                        <Icon className="sidebar-nav-icon w-6 h-6 shrink-0 text-gray-600"/>
                        
                        {sidebarOpen && <span className="truncate text-gray-600 px-3">{label}</span>}
                    </NavLink>
                ))}
            </nav>
    </aside>
  );
};

export default SideBar;