import { ChevronFirst, ChevronLast } from "lucide-react";
import { FaTachometerAlt, FaUser, FaTools, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { createContext, useContext } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink

const SidebarContext = createContext();

export default function Sidebar({ expanded, setExpanded }) {
    return (
        <aside className={`h-screen ${expanded ? "w-64" : "w-16"} fixed left-0 top-0 bg-orange-500 border-r shadow-sm transition-all duration-300 flex flex-col`}>

            {/* Toggle Button */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="absolute top-4 right-3 p-2 rounded-lg bg-gray-50 hover:bg-orange-100 flex items-center justify-center shadow-md transition-all duration-300"
            >
                {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>

            {/* Header - Show only when expanded */}
            {expanded && (
                <div className="flex flex-col items-center justify-center mt-24">
                    <h1 className="text-white font-extrabold text-2xl leading-none">HWRA</h1>
                    <span className="text-black text-md font-semibold">Portal</span>
                </div>
            )}

            {/* Provide Sidebar Context */}
            <SidebarContext.Provider value={{ expanded }}>
                <ul className="flex-1 flex flex-col justify-center space-y-6">
                    <SidebarItem icon={<FaTachometerAlt size={24} />} text="Dashboard" to="/" />
                    <SidebarItem icon={<FaUser size={24} />} text="Profile" to="/profile" />
                    <SidebarItem icon={<FaTools size={24} />} text="Manage Device" to="/manage-device" />
                    <SidebarItem icon={<FaChartBar size={24} />} text="Reports" to="/reports" />
                    <SidebarItem icon={<FaSignOutAlt size={24} />} text="Logout" to="/logout" />
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
                    `relative flex items-center py-3 px-4 rounded-md cursor-pointer transition-all duration-300 text-white text-lg hover:bg-orange-600 
                    ${expanded ? "justify-start" : "justify-center"} 
                    ${isActive ? "bg-orange-700" : ""}`
                }
            >
                <span className="text-white text-2xl flex items-center justify-center w-10 h-10">{icon}</span>
                <span className={`ml-4 transition-all duration-300 ${expanded ? "opacity-100 visible" : "opacity-0 invisible w-0"}`}>
                    {text}
                </span>
            </NavLink>
        </li>
    );
}
