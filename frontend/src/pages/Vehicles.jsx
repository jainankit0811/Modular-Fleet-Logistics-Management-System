import { AnimatePresence, motion } from 'framer-motion';
import {
    ChevronDown,
    Edit2,
    Plus,
    Search,
    Trash2,
    Truck
} from 'lucide-react';
import { useState } from 'react';
import VehicleModal from '../components/Vehicles/VehicleModal';
import { MOCK_VEHICLES } from '../utils/mockData';

export default function Vehicles() {
    const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);

    const filteredVehicles = vehicles.filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'All' || v.type === filterType;
        return matchesSearch && matchesType;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'In Service': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'Out of Order': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const handleSave = (vehicleData) => {
        if (editingVehicle) {
            setVehicles(prev => prev.map(v => v.id === editingVehicle.id ? { ...vehicleData, id: v.id } : v));
        } else {
            setVehicles(prev => [...prev, { ...vehicleData, id: Date.now().toString() }]);
        }
        setIsModalOpen(false);
        setEditingVehicle(null);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this vehicle?')) {
            setVehicles(prev => prev.filter(v => v.id !== id));
        }
    };

    const openEditModal = (vehicle) => {
        setEditingVehicle(vehicle);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* View Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Vehicle Management</h1>
                    <p className="text-slate-500 mt-1">Manage and monitor your entire fleet assets.</p>
                </div>
                <button
                    onClick={() => { setEditingVehicle(null); setIsModalOpen(true); }}
                    className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20"
                >
                    <Plus size={20} />
                    <span>Add Vehicle</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or plate..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 outline-none focus:border-blue-500/50 transition-all"
                    />
                </div>
                <div className="relative min-w-[160px]">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-slate-200 outline-none focus:border-blue-500/50 transition-all pr-10"
                    >
                        <option value="All">All Types</option>
                        <option value="Truck">Truck</option>
                        <option value="Van">Van</option>
                        <option value="Car">Car</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                </div>
            </div>

            {/* Vehicles Table/Grid */}
            <div className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5">
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Vehicle</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Type</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Plate Number</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence>
                                {filteredVehicles.map((vehicle, idx) => (
                                    <motion.tr
                                        key={vehicle.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                                                    <Truck size={20} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-white">{vehicle.name}</div>
                                                    <div className="text-xs text-slate-500">{vehicle.capacity} • {vehicle.mileage}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-400 bg-white/5 px-2 py-1 rounded-md">{vehicle.type}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-mono text-slate-300 tracking-wider font-medium">{vehicle.plateNumber}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(vehicle.status)}`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
                                                {vehicle.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => openEditModal(vehicle)}
                                                    className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(vehicle.id)}
                                                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {filteredVehicles.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <Search className="text-slate-500" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-white">No vehicles found</h3>
                        <p className="text-slate-500 mt-1 max-w-xs mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setFilterType('All'); }}
                            className="mt-6 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            <VehicleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                vehicle={editingVehicle}
            />
        </div>
    );
}
