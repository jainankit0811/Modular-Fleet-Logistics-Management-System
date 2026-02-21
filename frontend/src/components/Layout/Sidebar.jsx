import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import {
    BarChart3,
    ChevronRight,
    LayoutDashboard,
    LogOut,
    MapPin,
    Menu,
    Settings,
    Truck,
    Users,
    X
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Truck, label: 'Vehicles', path: '/vehicles' },
    { icon: Users, label: 'Drivers', path: '/drivers' },
    { icon: MapPin, label: 'Logistics', path: '/logistics' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 bg-slate-900 rounded-lg lg:hidden"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar Container */}
            <motion.aside
                initial={false}
                animate={{
                    width: isOpen ? (typeof window !== 'undefined' && window.innerWidth < 1024 ? '100%' : 260) : (typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 80),
                    x: isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 0 : -260
                }}
                className={cn(
                    "fixed left-0 top-0 h-screen bg-slate-950/95 lg:bg-slate-950/80 backdrop-blur-xl border-r border-white/5 z-40 flex flex-col overflow-hidden",
                    !isOpen && "hidden lg:flex lg:items-center"
                )}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                        <Truck className="text-white" size={24} />
                    </div>
                    {isOpen && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="ml-3 font-bold text-xl tracking-tight text-white"
                        >
                            FleetFlow
                        </motion.span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center px-4 py-3 rounded-xl transition-all group relative",
                                isActive
                                    ? "bg-blue-600/10 text-blue-400"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon size={22} className="shrink-0" />
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="ml-3 font-medium whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                            {isOpen && (
                                <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-40 transition-opacity" />
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-white/5 space-y-2">
                    <button className={cn(
                        "w-full flex items-center px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all",
                        !isOpen && "justify-center"
                    )}>
                        <Settings size={22} />
                        {isOpen && <span className="ml-3 font-medium">Settings</span>}
                    </button>
                    <button className={cn(
                        "w-full flex items-center px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all",
                        !isOpen && "justify-center"
                    )}>
                        <LogOut size={22} />
                        {isOpen && <span className="ml-3 font-medium">Logout</span>}
                    </button>
                </div>
            </motion.aside>
        </>
    );
}
