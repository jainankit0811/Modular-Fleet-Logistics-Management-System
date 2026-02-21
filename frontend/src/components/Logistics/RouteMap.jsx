import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Navigation, Truck } from 'lucide-react';

export default function RouteMap({ activeRoute = null }) {
    // This is a high-fidelity visual placeholder for a real map
    // It uses a grid and abstract shapes to represent topography and routes

    return (
        <div className="relative w-full h-full bg-slate-900 overflow-hidden rounded-3xl border border-white/5">
            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Abstract Topography */}
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
                <path d="M-100,200 C100,50 300,350 500,150 S800,400 1100,200" fill="none" stroke="white" strokeWidth="2" />
                <path d="M-100,400 C150,250 400,550 650,300 S900,100 1200,400" fill="none" stroke="white" strokeWidth="1" />
            </svg>

            {/* Route Visualization */}
            <AnimatePresence>
                {activeRoute && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        {/* Animated Path */}
                        <svg className="absolute inset-0 w-full h-full">
                            <motion.path
                                d="M150,450 L400,250 L750,350"
                                fill="none"
                                stroke="rgba(59, 130, 246, 0.5)"
                                strokeWidth="4"
                                strokeDasharray="10, 10"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            {/* Pulsing Start Point */}
                            <circle cx="150" cy="450" r="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                            {/* Pulsing End Point */}
                            <circle cx="750" cy="350" r="6" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                        </svg>

                        {/* Vehicle Indicator */}
                        <motion.div
                            initial={{ left: '150px', top: '450px' }}
                            animate={{
                                left: `${150 + (750 - 150) * (activeRoute.progress / 100)}px`,
                                top: `${450 + (350 - 450) * (activeRoute.progress / 100)}px`
                            }}
                            transition={{ duration: 1.5, ease: "linear" }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500 animate-ping rounded-xl opacity-20"></div>
                                <div className="relative bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/40 border border-blue-400/30 group-hover:scale-110 transition-transform">
                                    <Truck size={20} className="text-white" />
                                </div>
                            </div>
                            <div className="mt-2 px-3 py-1 bg-slate-950/90 backdrop-blur-md rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-[10px] font-bold text-white whitespace-nowrap">{activeRoute.vehicleId}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Map Controls Overlay */}
            <div className="absolute top-6 right-6 flex flex-col space-y-2">
                <button className="p-3 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/10 text-slate-400 hover:text-white transition-all">
                    <Navigation size={18} />
                </button>
                <button className="p-3 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/10 text-slate-400 hover:text-white transition-all">
                    <MapPin size={18} />
                </button>
            </div>

            {/* Status Overlay */}
            {!activeRoute && (
                <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                    <div className="max-w-xs">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                            <Navigation className="text-slate-600" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-300">Global Fleet View</h3>
                        <p className="text-sm text-slate-500 mt-2">Select a route from the list to focus the tracking system.</p>
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-6 left-6 p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-white/10 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">In Transit</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Delayed</span>
                </div>
            </div>
        </div>
    );
}


