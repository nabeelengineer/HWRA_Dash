import { ChevronFirst, ChevronLast } from "lucide-react";
import { FaTachometerAlt, FaUser, FaTools, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { createContext, useContext } from "react";
import { NavLink } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ expanded, setExpanded }) {
    return (
        <aside className={`h-screen ${expanded ? "w-64" : "w-16"} fixed left-0 top-0 bg-gray-300 border-r shadow-sm transition-all duration-300 flex flex-col`}>

            {/* Header: Logo & Toggle Button */}
            <div className="flex items-center justify-between px-4 py-3">
                {/* HWRA Portal Text - Only visible when expanded */}
                {expanded && (
                    <div className="text-left">
                        <h1 className="text-white font-bold text-md leading-none">HWRA</h1>
                        <span className="text-black text-xs font-semibold">Portal</span>
                    </div>
                )}

                {/* Toggle Button (Top-Right) */}
                <button onClick={() => setExpanded(!expanded)} className="text-white" style={{padding:'2px'}}>
                    {expanded ? <ChevronFirst size={24} color="black"/> : <ChevronLast size={24} />}
                </button>
            </div>

            {/* Sidebar Items */}
            <SidebarContext.Provider value={{ expanded }}>
                <ul className="flex-1 flex flex-col mt-6 space-y-1">
                    <SidebarItem icon={<FaTachometerAlt size={20} />} text="Dashboard" to="/" />
                    <SidebarItem icon={<FaUser size={20} />} text="Profile" to="/profile" />
                    <SidebarItem icon={<FaTools size={20} />} text="Manage Device" to="/manage-device" />
                    <SidebarItem icon={<FaChartBar size={20} />} text="Reports" to="/reports" />
                    <SidebarItem icon={<FaSignOutAlt size={20} />} text="Logout" to="/logout" />
                </ul>
            </SidebarContext.Provider>
        </aside>
    );
}

export function SidebarItem({ icon, text, to }) {
    const { expanded } = useContext(SidebarContext);

    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `relative flex whitespace-nowrap items-center py-1 px-3 mx-3 rounded-md cursor-pointer transition-all duration-300 text-white text-md hover:bg-gray-600 
                    ${expanded ? "justify-start" : "justify-center"} 
                    ${isActive ? " bg-white-700 " : "text-black"}`
                }
            >
                <span className="text-white text-2xl flex items-center justify-center text-gray-900 w-10 h-10">{icon}</span>
                <span className={`ml-4 transition-all duration-300 text-gray-900 ${expanded ? "opacity-100 visible" : "opacity-0 invisible w-0"}`}>
                    {text}
                </span>
            </NavLink>
        </li>
    );
}
