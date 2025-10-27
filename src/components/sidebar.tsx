import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Workflow, Briefcase, Users } from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/pipelines", label: "Pipelines", icon: Workflow },
  { path: "/jobs", label: "Jobs", icon: Briefcase },
  { path: "/candidates", label: "Candidates", icon: Users },
];

const SideBar: FC = () => {
  return (
    <aside className="w-60 bg-white border-r h-[calc(100vh-56px)] flex flex-col py-4">
      <nav className="flex flex-col gap-1">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md mx-2 text-gray-700 hover:bg-gray-100 ${
                isActive ? "bg-gray-200 font-medium" : ""
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
