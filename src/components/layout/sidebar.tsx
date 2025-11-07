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
  const sidebarOpen: any = useUIStore();
  const sidebarWidth = sidebarOpen ? 'w-64' : 'w-20';
  return (
    <aside 
    className={`h-screen fixed left-0 top-0 z-20 
      bg-gray-50 border-r border-gray-200 shadow-xl 
      flex flex-col transition-all duration-300 ease-in-out ${sidebarWidth}`}
    >
      
      <div className="flex items-center justify-start h-16 border-b border-gray-200 px-4">
        {sidebarOpen && (
          <h1 className="text-xl font-bold text-indigo-700 tracking-wider truncate">
            JobTracker
          </h1>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto flex flex-col gap-1 p-3">
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
                                // Expanded State
                                sidebarOpen 
                                    ? 'gap-3 px-4 py-2.5 text-base'
                                    // Collapsed State: PERFECT ALIGNMENT
                                    : 'justify-center py-2' // py-2 (8px) + h-6 icon (24px) = 40px total height (h-10)
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
