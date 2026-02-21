import { motion } from 'framer-motion';
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    Fuel,
    TrendingUp,
    Truck,
    Users
} from 'lucide-react';

const stats = [
    {
        label: 'Total Fleet',
        value: '42',
        trend: '+4.5%',
        trendUp: true,
        icon: Truck,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10'
    },
    {
        label: 'Active Drivers',
        value: '38',
        trend: '+1.2%',
        trendUp: true,
        icon: Users,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10'
    },
    {
        label: 'Fuel Efficiency',
        value: '8.4 km/l',
        trend: '-2.3%',
        trendUp: false,
        icon: Fuel,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10'
    },
    {
        label: 'Current Shipments',
        value: '12',
        trend: '+8%',
        trendUp: true,
        icon: Activity,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10'
    }
];

export default function Dashboard() {
    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <header>
                <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Monitor your fleet performance and logistics in real-time.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
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
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Placeholder for Map/Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="aspect-[16/9] bg-white/5 border border-white/5 rounded-3xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <TrendingUp size={32} className="text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Real-time Fleet Tracking</h3>
                            <p className="text-slate-500 mt-2 max-w-md">Live GPS integration will be displayed here as the system modules are added.</p>
                            <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all">
                                Configure GPS
                            </button>
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
