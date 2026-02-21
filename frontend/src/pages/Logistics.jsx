import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    Clock,
    Navigation2,
    Plus,
    Search
} from 'lucide-react';
import { useEffect, useState } from 'react';
import DispatchModal from '../components/Logistics/DispatchModal';
import RouteMap from '../components/Logistics/RouteMap';
import { driverService } from '../services/driverService';
import { tripService } from '../services/tripService';
import { vehicleService } from '../services/vehicleService';

export default function Logistics() {
    const [routes, setRoutes] = useState([]);
    const [vehiclesRaw, setVehiclesRaw] = useState([]);
    const [driversRaw, setDriversRaw] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeRoute, setActiveRoute] = useState(null);
    const [isDispatchOpen, setIsDispatchOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [tripsData, vehiclesData, driversData] = await Promise.all([
                tripService.getAll().catch(() => []),
                vehicleService.getAll().catch(() => []),
                driverService.getAll().catch(() => [])
            ]);

            setVehiclesRaw(vehiclesData);
            setDriversRaw(driversData);

            const transformedRoutes = tripsData.map(t => {
                const vehicle = vehiclesData.find(v => v.id === t.vehicleId);
                const driver = driversData.find(d => d.id === t.driverId);
                return {
                    id: t.id,
                    vehicleId: vehicle ? vehicle.licensePlate : 'N/A',
                    driverName: driver ? driver.name : 'Unknown',
                    origin: 'Warehouse A', // Backend doesn't have origin/dest yet
                    destination: 'Warehouse B',
                    status: t.status === 'DISPATCHED' ? 'In Transit' : (t.status.charAt(0) + t.status.slice(1).toLowerCase()),
                    progress: t.status === 'COMPLETED' ? 100 : (t.status === 'DISPATCHED' ? 45 : 0),
                    eta: '2h 15m'
                };
            });

            setRoutes(transformedRoutes);
            if (transformedRoutes.length > 0) setActiveRoute(transformedRoutes[0]);
        } catch (error) {
            console.error('Failed to fetch logistics data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredRoutes = routes.filter(r =>
        r.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Transit':
            case 'Dispatched': return 'text-blue-400 bg-blue-400/10';
            case 'Near Destination': return 'text-emerald-400 bg-emerald-400/10';
            case 'Delayed': return 'text-rose-400 bg-rose-400/10';
            case 'Loading':
            case 'Draft': return 'text-amber-400 bg-amber-400/10';
            case 'Completed': return 'text-emerald-400 bg-emerald-400/10';
            default: return 'text-slate-400 bg-slate-400/10';
        }
    };

    if (loading) {
        return (
            <div className="h-[calc(100vh-140px)] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-medium">Loading Logistics Hub...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col gap-8">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Logistics Hub</h1>
                    <p className="text-slate-500 mt-1">Real-time route monitoring and fleet tracking.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsDispatchOpen(true)}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center space-x-2"
                    >
                        <Plus size={18} />
                        <span>Dispatch Trip</span>
                    </button>
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-blue-600/20 flex items-center justify-center text-[10px] font-bold text-blue-400">D{i}</div>
                            </div>
                        ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-400 ml-2">{routes.length} Active Routes</span>
                </div>
            </header>

            <DispatchModal
                isOpen={isDispatchOpen}
                onClose={() => setIsDispatchOpen(false)}
                onSave={fetchData}
                vehicles={vehiclesRaw}
                drivers={driversRaw}
            />

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
                                onClick={() => setActiveRoute(route)}
                                className={`p-4 rounded-2xl border transition-all cursor-pointer group ${activeRoute?.id === route.id
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
                        <RouteMap activeRoute={activeRoute} />

                        {/* Selected Route Info Overlay */}
                        <AnimatePresence mode="wait">
                            {activeRoute && (
                                <motion.div
                                    key={activeRoute.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="absolute bottom-6 right-6 left-6 lg:left-auto lg:w-96 p-6 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{activeRoute.driverName}</h4>
                                            <p className="text-xs text-blue-400 font-mono mt-0.5">{activeRoute.vehicleId}</p>
                                        </div>
                                        <div className="p-3 bg-blue-600/10 rounded-2xl">
                                            <Navigation2 size={24} className="text-blue-500" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6 py-4 border-y border-white/5">
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Start Time</p>
                                            <p className="text-sm font-bold text-white mt-1">{activeRoute.startTime || '08:30 AM'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total Distance</p>
                                            <p className="text-sm font-bold text-white mt-1">{activeRoute.distance || '124 km'}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between gap-3">
                                        <button
                                            onClick={async () => {
                                                await tripService.updateStatus(activeRoute.id, 'COMPLETED');
                                                fetchData();
                                            }}
                                            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20"
                                        >
                                            Complete Trip
                                        </button>
                                        <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-bold border border-white/10 rounded-xl transition-all">
                                            Contact Driver
                                        </button>
                                        <button className="p-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all">
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
