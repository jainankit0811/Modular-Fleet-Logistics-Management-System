import { motion } from 'framer-motion';
import {
    Activity,
    Droplets,
    History,
    Plus,
    Wrench
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { fuelService, maintenanceService } from '../services/operationsService';
import { vehicleService } from '../services/vehicleService';

export default function FleetOperations() {
    const [activeTab, setActiveTab] = useState('maintenance');
    const [maintenanceLogs, setMaintenanceLogs] = useState([]);
    const [fuelLogs, setFuelLogs] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [mLogs, fLogs, vList] = await Promise.all([
                maintenanceService.getAll().catch(() => []),
                fuelService.getAll().catch(() => []),
                vehicleService.getAll().catch(() => [])
            ]);
            setMaintenanceLogs(mLogs);
            setFuelLogs(fLogs);
            setVehicles(vList);
        } catch (error) {
            console.error('Failed to fetch operations data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="h-full flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white tracking-tight">Fleet Operations</h1>
                <p className="text-slate-500 mt-1">Manage maintenance lifecycle and fuel expenses</p>
            </header>

            {/* Tabs */}
            <div className="flex space-x-1 bg-white/5 p-1 rounded-2xl w-fit">
                <button
                    onClick={() => setActiveTab('maintenance')}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center space-x-2 ${activeTab === 'maintenance' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Wrench size={16} />
                    <span>Maintenance</span>
                </button>
                <button
                    onClick={() => setActiveTab('fuel')}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center space-x-2 ${activeTab === 'fuel' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Droplets size={16} />
                    <span>Fuel Logs</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form/Log Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-3 bg-blue-600/10 rounded-2xl">
                                <Plus size={24} className="text-blue-500" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Log {activeTab === 'maintenance' ? 'Service' : 'Fuel'}</h2>
                        </div>

                        {activeTab === 'maintenance' ? (
                            <form className="space-y-4" onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                await maintenanceService.create(Object.fromEntries(formData));
                                fetchData();
                                e.target.reset();
                            }}>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle</label>
                                    <select name="vehicleId" className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-blue-500/50">
                                        {vehicles.map(v => <option key={v.id} value={v.id}>{v.licensePlate} ({v.model})</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
                                    <input name="description" placeholder="Oil change, brake check..." className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-blue-500/50" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cost ($)</label>
                                    <input name="cost" type="number" step="0.01" className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-blue-500/50" />
                                </div>
                                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
                                    Apply to Vehicle
                                </button>
                            </form>
                        ) : (
                            <form className="space-y-4" onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                await fuelService.create(Object.fromEntries(formData));
                                fetchData();
                                e.target.reset();
                            }}>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle</label>
                                    <select name="vehicleId" className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-blue-500/50">
                                        {vehicles.map(v => <option key={v.id} value={v.id}>{v.licensePlate} ({v.model})</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Liters</label>
                                    <input name="liters" type="number" step="0.1" className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-blue-500/50" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cost ($)</label>
                                    <input name="cost" type="number" step="0.01" className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-4 text-white outline-none focus:border-blue-500/50" />
                                </div>
                                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
                                    Save Log
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Right Column: List View */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 text-slate-400">
                            <History size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest pt-0.5">Recent Activity</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {activeTab === 'maintenance' ? (
                            maintenanceLogs.map(log => (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={log.id}
                                    className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2.5 bg-rose-500/10 rounded-xl">
                                            <Wrench size={18} className="text-rose-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white">{log.description}</h4>
                                            <p className="text-xs text-slate-500">{log.vehicle?.licensePlate} • {new Date(log.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-white">${log.cost}</p>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Expense</span>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            fuelLogs.map(log => (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={log.id}
                                    className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2.5 bg-blue-500/10 rounded-xl">
                                            <Droplets size={18} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white">Fuel Refill: {log.liters}L</h4>
                                            <p className="text-xs text-slate-500">{log.vehicle?.licensePlate} • {new Date(log.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-white">${log.cost}</p>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Expense</span>
                                    </div>
                                </motion.div>
                            ))
                        )}

                        {((activeTab === 'maintenance' && maintenanceLogs.length === 0) || (activeTab === 'fuel' && fuelLogs.length === 0)) && (
                            <div className="py-12 text-center bg-white/5 border border-dashed border-white/10 rounded-3xl">
                                <Activity size={32} className="mx-auto text-slate-700 mb-2" />
                                <p className="text-slate-500 text-sm">No recent logs found for this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
