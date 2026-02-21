import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    Clock,
    Navigation2,
    Search
} from 'lucide-react';
import { useState } from 'react';
import RouteMap from '../components/Logistics/RouteMap';
import { MOCK_ROUTES } from '../utils/mockData';

export default function Logistics() {
    const [routes] = useState(MOCK_ROUTES);
    const [selectedRouteId, setSelectedRouteId] = useState(MOCK_ROUTES[0].id);
    const [searchTerm, setSearchTerm] = useState('');

    const selectedRoute = routes.find(r => r.id === selectedRouteId);
    const filteredRoutes = routes.filter(r =>
        r.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Transit': return 'text-blue-400 bg-blue-400/10';
            case 'Near Destination': return 'text-emerald-400 bg-emerald-400/10';
            case 'Delayed': return 'text-rose-400 bg-rose-400/10';
            case 'Loading': return 'text-amber-400 bg-amber-400/10';
            default: return 'text-slate-400 bg-slate-400/10';
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col gap-8">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Logistics Hub</h1>
                    <p className="text-slate-500 mt-1">Real-time route monitoring and fleet tracking.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-blue-600/20 flex items-center justify-center text-[10px] font-bold text-blue-400">D{i}</div>
                            </div>
                        ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-400 ml-2">12 Active Drivers</span>
                </div>
            </header>

            {/* Main Container */}
            <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
                {/* Sidebar List */}
                <div className="w-full lg:w-96 flex flex-col gap-4 shrink-0 overflow-hidden">
                    <div className="relative group shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search active routes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-slate-200 outline-none focus:border-blue-500/50 transition-all"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
                        {filteredRoutes.map((route) => (
                            <motion.div
                                key={route.id}
                                layoutId={route.id}
                                onClick={() => setSelectedRouteId(route.id)}
                                className={`p-4 rounded-2xl border transition-all cursor-pointer group ${selectedRouteId === route.id
                                        ? 'bg-blue-600/10 border-blue-500/30'
                                        : 'bg-white/5 border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{route.vehicleId}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(route.status)}`}>
                                        {route.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-center gap-1 shrink-0">
                                        <div className="w-2 h-2 rounded-full border border-blue-500"></div>
                                        <div className="w-[1px] h-4 bg-slate-700"></div>
                                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-500 truncate">{route.origin}</p>
                                        <p className="text-sm font-bold text-white truncate mt-1">{route.destination}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center text-xs text-slate-500">
                                        <Clock size={12} className="mr-1.5" />
                                        <span>ETA {route.eta}</span>
                                    </div>
                                    <div className="text-xs font-bold text-slate-300">
                                        {route.progress}%
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${route.progress}%` }}
                                        className="h-full bg-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Map View Area */}
                <div className="flex-1 min-w-0 space-y-4">
                    <div className="h-full relative">
                        <RouteMap activeRoute={selectedRoute} />

                        {/* Selected Route Info Overlay */}
                        <AnimatePresence mode="wait">
                            {selectedRoute && (
                                <motion.div
                                    key={selectedRoute.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="absolute bottom-6 right-6 left-6 lg:left-auto lg:w-96 p-6 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{selectedRoute.driverName}</h4>
                                            <p className="text-xs text-blue-400 font-mono mt-0.5">{selectedRoute.vehicleId}</p>
                                        </div>
                                        <div className="p-3 bg-blue-600/10 rounded-2xl">
                                            <Navigation2 size={24} className="text-blue-500" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6 py-4 border-y border-white/5">
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Start Time</p>
                                            <p className="text-sm font-bold text-white mt-1">{selectedRoute.startTime}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total Distance</p>
                                            <p className="text-sm font-bold text-white mt-1">{selectedRoute.distance}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between">
                                        <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20">
                                            Contact Driver
                                        </button>
                                        <button className="ml-3 p-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all">
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
