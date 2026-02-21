import { motion } from 'framer-motion';
import {
    BarChart3,
    Compass,
    Download,
    FileText,
    TrendingUp,
    Truck
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { analyticsService } from '../services/analyticsService';

export default function Reports() {
    const [roiData, setRoiData] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [roiResponse, statsResponse] = await Promise.all([
                analyticsService.getROI(),
                analyticsService.getStats()
            ]);
            setRoiData(roiResponse.roi);
            setStats(statsResponse);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = (type) => {
        alert(`Exporting as ${type}... (Simulation)`);
        // In a real app, this would trigger a download from the backend
    };

    if (loading) return (
        <div className="h-full flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Operational Analytics</h1>
                    <p className="text-slate-500 mt-1">ROI, Fuel Efficiency, and Financial Performance Reports.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => handleExport('CSV')}
                        className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all font-semibold"
                    >
                        <FileText size={18} />
                        <span>Export CSV</span>
                    </button>
                    <button
                        onClick={() => handleExport('PDF')}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all font-semibold"
                    >
                        <Download size={18} />
                        <span>Export PDF</span>
                    </button>
                </div>
            </header>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-600/10 rounded-2xl">
                            <Compass size={24} className="text-blue-500" />
                        </div>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">+12.4%</span>
                    </div>
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Average Fuel Efficiency</h3>
                    <p className="text-3xl font-bold text-white mt-2">{stats.fuelEfficiency}</p>
                </div>

                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-600/10 rounded-2xl">
                            <TrendingUp size={24} className="text-emerald-500" />
                        </div>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">+8.2%</span>
                    </div>
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Fleet Utilization</h3>
                    <p className="text-3xl font-bold text-white mt-2">{stats.utilizationRate}</p>
                </div>

                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-amber-600/10 rounded-2xl">
                            <BarChart3 size={24} className="text-amber-500" />
                        </div>
                        <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded-lg">-1.5%</span>
                    </div>
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Operational Cost Trend</h3>
                    <p className="text-3xl font-bold text-white mt-2">$2,450 / Mo</p>
                </div>
            </div>

            {/* ROI Table */}
            <div className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <h2 className="text-xl font-bold text-white">Vehicle ROI Analysis</h2>
                    <span className="text-xs text-slate-500">Live ROI Calculation: (Revenue - Costs) / Acquisition</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/2">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Vehicle</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Total Revenue</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Total Cost</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Calculated ROI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {roiData.map((item, idx) => (
                                <motion.tr
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    key={item.vehicleId}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-slate-800 rounded-lg">
                                                <Truck size={16} className="text-slate-400" />
                                            </div>
                                            <span className="font-bold text-white">{item.licensePlate}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-emerald-400 font-bold">${item.revenue}</td>
                                    <td className="px-6 py-4 text-rose-400 font-bold">${item.totalCost}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`px-3 py-1 rounded-lg font-bold text-sm ${parseFloat(item.roi) > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-400'}`}>
                                            {item.roi}x
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
