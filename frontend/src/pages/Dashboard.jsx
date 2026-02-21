import { motion } from 'framer-motion';
import {
    Activity,
    AlertCircle,
    ArrowDownRight,
    ArrowUpRight,
    Truck,
    Users
} from 'lucide-react';

import { useEffect, useState } from 'react';
import { analyticsService } from '../services/analyticsService';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await analyticsService.getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const dashboardStats = [
        {
            label: 'Active Fleet',
            value: stats?.activeFleet || '0',
            trend: stats?.fleetTrend || '+0%',
            trendUp: true,
            icon: Truck,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            description: "Vehicles currently on trip"
        },
        {
            label: 'Active Drivers',
            value: stats?.activeDrivers || '0',
            trend: stats?.driverTrend || '+0%',
            trendUp: true,
            icon: Users,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            description: "Drivers currently on duty"
        },
        {
            label: 'Maintenance Alerts',
            value: stats?.inShop || '0',
            trend: '-2',
            trendUp: false,
            icon: AlertCircle,
            color: 'text-rose-500',
            bg: 'bg-rose-500/10',
            description: "Vehicles marked In Shop"
        },
        {
            label: 'Utilization Rate',
            value: stats?.utilizationRate || '0%',
            trend: stats?.shipmentTrend || '+0%',
            trendUp: true,
            icon: Activity,
            color: 'text-indigo-500',
            bg: 'bg-indigo-500/10',
            description: "Fleet assigned vs idle"
        }
    ];

    if (loading) return (
        <div className="h-full flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Monitor your fleet performance and logistics in real-time.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 transition-colors group"
                    >
                        <div className="flex items-start justify-between">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-colors`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center space-x-1 text-sm font-medium ${stat.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                                <span>{stat.trend}</span>
                                {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-white mt-1 group-hover:scale-105 transition-transform origin-left">
                                {stat.value}
                            </h3>
                            <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-tight">{stat.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="aspect-[16/9] bg-white/5 border border-white/5 rounded-3xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <Truck size={48} className="text-blue-500/20 mb-4" />
                            <h3 className="text-xl font-bold text-white/40">Fleet Map Visualization</h3>
                            <p className="text-slate-600 max-w-sm mt-2">Map engine initializing with real-time GPS coordinates...</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 border border-white/5 rounded-3xl p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="flex space-x-4"
                            >
                                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                <div>
                                    <p className="text-sm text-slate-200">Vehicle <span className="text-blue-400 font-mono">#TR-429</span> arrived at Port Blair.</p>
                                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">12 minutes ago</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 text-sm text-slate-400 font-medium hover:text-white border border-white/5 rounded-xl transition-all">
                        View All Journals
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
