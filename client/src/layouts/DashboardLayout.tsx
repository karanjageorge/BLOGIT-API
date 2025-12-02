import {
  Home,
  PlusCircle,
  FileText,
  Trash2,
  User,
  LogOut,
  Menu
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <div className={`${open ? "w-64" : "w-16"} bg-white shadow-lg transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          <span className="font-bold text-xl hidden md:block">Blogit</span>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu />
          </button>
        </div>

        <nav className="mt-6 space-y-2">
          <SidebarItem icon={<Home />} text="Dashboard" to="/dashboard" open={open} />
          <SidebarItem icon={<PlusCircle />} text="Create Blog" to="/blogs/create" open={open} />
          <SidebarItem icon={<FileText />} text="My Blogs" to="/blogs" open={open} />
          <SidebarItem icon={<Trash2 />} text="Trash" to="/trash" open={open} />
          <SidebarItem icon={<User />} text="Profile" to="/profile" open={open} />

          <button
            onClick={logout}
            className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 w-full transition rounded-md"
          >
            <LogOut />
            {open && "Logout"}
          </button>
        </nav>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}

function SidebarItem({
  icon,
  text,
  to,
  open,
}: {
  icon: React.ReactNode;
  text: string;
  to: string;
  open: boolean;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md transition"
    >
      {icon}
      {open && <span>{text}</span>}
    </Link>
  );
}
