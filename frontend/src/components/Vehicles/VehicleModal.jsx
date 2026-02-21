import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VehicleModal({ isOpen, onClose, onSave, vehicle = null }) {
    const [formData, setFormData] = useState({
        name: '',
        plateNumber: '',
        type: 'Truck',
        status: 'Active',
        capacity: '',
        lastService: '',
        mileage: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (vehicle) {
            setFormData(vehicle);
        } else {
            setFormData({
                name: '',
                plateNumber: '',
                type: 'Truck',
                status: 'Active',
                capacity: '',
                lastService: '',
                mileage: ''
            });
        }
    }, [vehicle, isOpen]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Vehicle name is required';
        if (!formData.plateNumber) newErrors.plateNumber = 'Plate number is required';
        if (!formData.capacity) newErrors.capacity = 'Capacity is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                            <h3 className="text-xl font-bold text-white">
                                {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                {/* Vehicle Name */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-400">Vehicle Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all`}
                                        placeholder="e.g. Volvo FH16"
                                    />
                                    {errors.name && <p className="text-xs text-red-400 flex items-center mt-1"><AlertCircle size={10} className="mr-1" /> {errors.name}</p>}
                                </div>

                                {/* Plate Number */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-400">License Plate</label>
                                    <input
                                        type="text"
                                        value={formData.plateNumber}
                                        onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                                        className={`w-full bg-white/5 border ${errors.plateNumber ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all`}
                                        placeholder="GA-01-AX-1234"
                                    />
                                    {errors.plateNumber && <p className="text-xs text-red-400 flex items-center mt-1"><AlertCircle size={10} className="mr-1" /> {errors.plateNumber}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-400">Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all"
                                        >
                                            <option value="Truck">Truck</option>
                                            <option value="Van">Van</option>
                                            <option value="Car">Car</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-400">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full bg-slate-900 border border-white/10 rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50"
                                        >
                                            <option value="Available">Available</option>
                                            <option value="On Trip">On Trip</option>
                                            <option value="In Shop">In Shop</option>
                                            <option value="Retired">Retired</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-400">Capacity</label>
                                        <input
                                            type="text"
                                            value={formData.capacity}
                                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="e.g. 25 Tons"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-400">Mileage</label>
                                        <input
                                            type="text"
                                            value={formData.mileage}
                                            onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="e.g. 45,200 km"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end space-x-3 pt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-all underline-offset-4 hover:underline"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center space-x-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20"
                                >
                                    <Save size={18} />
                                    <span>{vehicle ? 'Update Vehicle' : 'Create Vehicle'}</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
