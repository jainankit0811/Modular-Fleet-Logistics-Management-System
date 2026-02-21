import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DriverModal({ isOpen, onClose, onSave, driver = null }) {
    const [formData, setFormData] = useState({
        name: '',
        licenseNumber: '',
        phone: '',
        status: 'Available',
        licenseExpiry: '',
        rating: 5.0,
        experience: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (driver) {
            setFormData(driver);
        } else {
            setFormData({
                name: '',
                licenseNumber: '',
                phone: '',
                status: 'Available',
                licenseExpiry: '',
                rating: 5.0,
                experience: ''
            });
        }
    }, [driver, isOpen]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Full name is required';
        if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
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
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                            <h3 className="text-xl font-bold text-white">
                                {driver ? 'Edit Driver' : 'Register New Driver'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-400">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all`}
                                        placeholder="e.g. Rajesh Kumar"
                                    />
                                    {errors.name && <p className="text-xs text-red-400 flex items-center mt-1"><AlertCircle size={10} className="mr-1" /> {errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-400">License Number</label>
                                        <input
                                            type="text"
                                            value={formData.licenseNumber}
                                            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                                            className={`w-full bg-white/5 border ${errors.licenseNumber ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all`}
                                            placeholder="DL-14..."
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-400">Phone Number</label>
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all`}
                                            placeholder="+91..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-400">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all"
                                        >
                                            <option value="Available">Available</option>
                                            <option value="On Trip">On Trip</option>
                                            <option value="On Leave">On Leave</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-400">Experience</label>
                                        <input
                                            type="text"
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all"
                                            placeholder="e.g. 5 Years"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-400">License Expiry Date</label>
                                    <input
                                        type="date"
                                        value={formData.licenseExpiry}
                                        onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all"
                                    />
                                </div>
                            </div>

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
                                    <span>{driver ? 'Update Profile' : 'Register Driver'}</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
