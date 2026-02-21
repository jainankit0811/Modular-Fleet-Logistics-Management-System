import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import {
    Activity,
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
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { userService } from '../../services/userService';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Truck, label: 'Vehicles', path: '/vehicles' },
    { icon: Users, label: 'Drivers', path: '/drivers' },
    { icon: MapPin, label: 'Logistics', path: '/logistics' },
    { icon: Activity, label: 'Operations', path: '/operations' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await userService.getMe();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                // If unauthorized, redirect to login
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

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
                    {/* Profile Section */}
                    {user && (
                        <div className={cn(
                            "flex items-center p-3 rounded-2xl bg-white/5 border border-white/5 mb-4 overflow-hidden shadow-xl",
                            !isOpen && "justify-center px-0"
                        )}>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-blue-600/20">
                                {user.name.charAt(0)}
                            </div>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="ml-3 min-w-0"
                                >
                                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{user.role}</p>
                                </motion.div>
                            )}
                        </div>
                    )}

                    <button
                        onClick={() => navigate('/settings')}
                        className={cn(
                            "w-full flex items-center px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all",
                            !isOpen && "justify-center"
                        )}
                    >
                        <Settings size={22} />
                        {isOpen && <span className="ml-3 font-medium">Settings</span>}
                    </button>
                    <button
                        onClick={handleLogout}
                        className={cn(
                            "w-full flex items-center px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all",
                            !isOpen && "justify-center"
                        )}
                    >
                        <LogOut size={22} />
                        {isOpen && <span className="ml-3 font-medium">Logout</span>}
                    </button>
                </div>
            </motion.aside>
        </>
    );
}
