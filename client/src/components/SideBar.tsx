// src/components/DashboardSidebar.tsx
import { Home, PlusCircle, FileText, Trash2, User, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className={`${open ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 min-h-screen flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b">
        {open && <span className="font-bold text-xl">Blogit</span>}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          <Menu />
        </button>
      </div>

      <nav className="mt-4 space-y-2 flex-1">
        <SidebarItem icon={<Home />} text="Dashboard" to="/dashboard" open={open} />
        <SidebarItem icon={<PlusCircle />} text="Create Blog" to="/blogs/create" open={open} />
        <SidebarItem icon={<FileText />} text="My Blogs" to="/blogs/myblogs" open={open} />
        <SidebarItem icon={<Trash2 />} text="Trash" to="/profile/trash" open={open} />
        <SidebarItem icon={<User />} text="Profile" to="/profile" open={open} />
      </nav>

      <button onClick={logout} className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 w-full transition rounded-md mb-4">
        <LogOut />
        {open && "Logout"}
      </button>
    </aside>
  );
}

function SidebarItem({ icon, text, to, open }: { icon: React.ReactNode; text: string; to: string; open: boolean }) {
  return (
    <Link to={to} className="relative flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md transition-all duration-200 group">
      {icon}
      {open && <span className="font-medium">{text}</span>}
      {!open && (
        <span className="absolute left-full ml-2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
          {text}
        </span>
      )}
    </Link>
  );
}
