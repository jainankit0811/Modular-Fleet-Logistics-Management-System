import { AnimatePresence, motion } from 'framer-motion';
import {
    Calendar,
    ChevronDown,
    CreditCard,
    Edit2,
    Phone,
    Plus,
    Search,
    Star,
    Trash2,
    User
} from 'lucide-react';
import { useEffect, useState } from 'react';
import DriverModal from '../components/Drivers/DriverModal';
import { driverService } from '../services/driverService';

export default function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDriver, setEditingDriver] = useState(null);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            setLoading(true);
            const data = await driverService.getAll();
            const transformedData = data.map(d => ({
                id: d.id,
                name: d.name,
                licenseNumber: d.licenseNumber,
                licenseExpiry: new Date(d.licenseExpiry).toISOString().split('T')[0],
                rating: d.safetyScore || 5.0,
                status: d.status === 'ON_DUTY' ? 'Available' : (d.status === 'OFF_DUTY' ? 'Off Duty' : 'On Leave'), // Map backend to frontend display
                phone: '+91 98765 43210', // Placeholder
                experience: '5 Yrs' // Placeholder
            }));
            setDrivers(transformedData);
        } catch (error) {
            console.error('Failed to fetch drivers:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'On Trip': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'On Leave': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const isExpiringSoon = (date) => {
        const expiryDate = new Date(date);
        const today = new Date();
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays < 30 && diffDays > 0;
    };

    const handleSave = async (driverData) => {
        try {
            const payload = {
                name: driverData.name,
                licenseNumber: driverData.licenseNumber,
                licenseExpiry: driverData.licenseExpiry,
                safetyScore: parseFloat(driverData.rating),
                status: driverData.status === 'Available' ? 'ON_DUTY' : 'OFF_DUTY'
            };

            if (editingDriver) {
                await driverService.update(editingDriver.id, payload);
            } else {
                await driverService.create(payload);
            }
            fetchDrivers();
            setIsModalOpen(false);
            setEditingDriver(null);
        } catch (error) {
            console.error('Failed to save driver:', error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to remove this driver profile?')) {
            try {
                await driverService.delete(id);
                fetchDrivers();
            } catch (error) {
                console.error('Failed to delete driver:', error);
            }
        }
    };

    const openEditModal = (driver) => {
        setEditingDriver(driver);
        setIsModalOpen(true);
    };

    if (loading) {
        return (
            <div className="h-[calc(100vh-140px)] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-medium">Loading Driver Profiles...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* View Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Driver Management</h1>
                    <p className="text-slate-500 mt-1">Monitor driver availability, ratings, and compliance.</p>
                </div>
                <button
                    onClick={() => { setEditingDriver(null); setIsModalOpen(true); }}
                    className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20"
                >
                    <Plus size={20} />
                    <span>Register Driver</span>
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or license..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 outline-none focus:border-blue-500/50 transition-all"
                    />
                </div>
                <div className="relative min-w-[160px]">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-slate-200 outline-none focus:border-blue-500/50 transition-all pr-10"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Available">Available</option>
                        <option value="On Trip">On Trip</option>
                        <option value="On Leave">On Leave</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                </div>
            </div>

            {/* Grid View for Drivers */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredDrivers.map((driver, idx) => (
                        <motion.div
                            key={driver.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white/5 border border-white/5 rounded-3xl p-6 group hover:border-white/10 transition-colors relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEditModal(driver)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                                    <Edit2 size={14} />
                                </button>
                                <button onClick={() => handleDelete(driver.id)} className="p-2 bg-white/5 hover:bg-rose-500/20 rounded-lg text-slate-400 hover:text-rose-400 transition-all">
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-slate-400">
                                    <User size={32} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white leading-tight">{driver.name}</h3>
                                    <div className="flex items-center mt-1 text-amber-400">
                                        <Star size={12} className="fill-current" />
                                        <span className="text-xs font-bold ml-1">{driver.rating}</span>
                                        <span className="text-slate-500 text-[10px] ml-2 font-medium uppercase tracking-wider">{driver.experience} EXP</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center text-sm text-slate-400">
                                    <Phone size={14} className="mr-3 shrink-0" />
                                    <span>{driver.phone}</span>
                                </div>
                                <div className="flex items-center text-sm text-slate-400">
                                    <CreditCard size={14} className="mr-3 shrink-0" />
                                    <span className="font-mono">{driver.licenseNumber}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Calendar size={14} className="mr-3 shrink-0 text-slate-500" />
                                    <span className={isExpiringSoon(driver.licenseExpiry) ? 'text-rose-400 font-semibold' : 'text-slate-400'}>
                                        Expires: {driver.licenseExpiry}
                                    </span>
                                    {isExpiringSoon(driver.licenseExpiry) && (
                                        <span className="ml-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(driver.status)}`}>
                                    {driver.status}
                                </span>
                                <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                                    View Schedule
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredDrivers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white/5 border border-white/5 border-dashed rounded-3xl">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                        <User className="text-slate-500" size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-white">No drivers match your criteria</h3>
                    <p className="text-slate-500 mt-1">Try changing your search keywords or status filter.</p>
                </div>
            )}

            <DriverModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                driver={editingDriver}
            />
        </div>
    );
}
