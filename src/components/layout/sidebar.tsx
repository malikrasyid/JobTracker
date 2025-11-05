import type { FC } from "react";
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

const SideBar: FC = () => {
  const sidebarOpen = useUIStore((s: any) => s.sidebarOpen);
  return (
    <aside className="sidebar h-full bg-white border-r border-gray-200 shadow-sm flex flex-col">
      <nav className={`flex-1 overflow-y-auto ${sidebarOpen ? 'px-3 py-6 flex flex-col gap-1' : 'px-2 py-3 flex flex-col gap-1'}`}>
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }: { isActive: boolean }) =>
              sidebarOpen
                ? `sidebar-nav-link flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 text-sm ${isActive ? 'active' : ''}`
                : `sidebar-nav-link flex items-center justify-center py-3 rounded-lg text-gray-700 ${isActive ? 'active' : ''}`
            }
          >
            <Icon className={`sidebar-nav-icon ${sidebarOpen ? 'w-5 h-5 shrink-0' : 'w-6 h-6'}`} />
            {sidebarOpen && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
