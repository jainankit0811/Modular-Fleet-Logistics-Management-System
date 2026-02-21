import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Save, X } from 'lucide-react';
import { useState } from 'react';
import { tripService } from '../../services/tripService';

export default function DispatchModal({ isOpen, onClose, onSave, vehicles, drivers }) {
    const [formData, setFormData] = useState({
        vehicleId: '',
        driverId: '',
        cargoWeight: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await tripService.create({
                ...formData,
                vehicleId: parseInt(formData.vehicleId),
                driverId: parseInt(formData.driverId),
                cargoWeight: parseFloat(formData.cargoWeight)
            });
            onSave();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to dispatch trip');
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
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                            <h3 className="text-xl font-bold text-white">New Trip Dispatch</h3>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && (
                                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start space-x-3">
                                    <AlertCircle className="text-rose-500 shrink-0" size={18} />
                                    <p className="text-xs text-rose-200">{error}</p>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-400">Select Vehicle</label>
                                    <select
                                        required
                                        value={formData.vehicleId}
                                        onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all font-bold"
                                    >
                                        <option value="">Choose Available Vehicle...</option>
                                        {!vehicles || vehicles.length === 0 ? (
                                            <option disabled>No vehicles found. Create one first.</option>
                                        ) : (
                                            vehicles.filter(v => v.status?.toUpperCase() === 'AVAILABLE').length === 0 ? (
                                                <option disabled>No vehicles currently Available</option>
                                            ) : (
                                                vehicles.filter(v => v.status?.toUpperCase() === 'AVAILABLE').map(v => (
                                                    <option key={v.id} value={v.id}>{v.licensePlate} ({v.model}) - Max {v.maxCapacity}T</option>
                                                ))
                                            )
                                        )}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-400">Assign Driver</label>
                                    <select
                                        required
                                        value={formData.driverId}
                                        onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all font-bold"
                                    >
                                        <option value="">Choose On-Duty Driver...</option>
                                        {!drivers || drivers.length === 0 ? (
                                            <option disabled>No drivers found. Register one first.</option>
                                        ) : (
                                            drivers.filter(d => d.status?.toUpperCase() === 'ON_DUTY').length === 0 ? (
                                                <option disabled>No drivers currently On Duty</option>
                                            ) : (
                                                drivers.filter(d => d.status?.toUpperCase() === 'ON_DUTY').map(d => (
                                                    <option key={d.id} value={d.id}>{d.name} (Safety: {d.safetyScore || d.rating || 'N/A'})</option>
                                                ))
                                            )
                                        )}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-400">Cargo Weight (Tons)</label>
                                    <input
                                        required
                                        type="number"
                                        step="0.01"
                                        value={formData.cargoWeight}
                                        onChange={(e) => setFormData({ ...formData, cargoWeight: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white outline-none focus:border-blue-500/50 transition-all"
                                        placeholder="e.g. 12.5"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-6">
                                <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-all underline-offset-4 hover:underline">
                                    Cancel
                                </button>
                                <button type="submit" className="flex items-center space-x-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20">
                                    <Save size={18} />
                                    <span>Dispatch Trip</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
