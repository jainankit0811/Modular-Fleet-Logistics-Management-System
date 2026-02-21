import { motion } from 'framer-motion';
import { Activity, BarChart3, ChevronRight, Globe, MapPin, Shield, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    const features = [
        {
            icon: Truck,
            title: "Fleet Registry",
            desc: "Complete asset management with real-time status tracking and compliance monitoring."
        },
        {
            icon: MapPin,
            title: "Smart Dispatch",
            desc: "Intelligent trip planning with automated route optimization and cargo validation."
        },
        {
            icon: BarChart3,
            title: "Deep Analytics",
            desc: "Interactive dashboards providing ROI insights, fuel efficiency, and performance metrics."
        },
        {
            icon: Shield,
            title: "Safety First",
            desc: "Driver performance scoring and automated license compliance workflows."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 overflow-x-hidden">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] -translate-x-1/2 translate-y-1/2" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-6 py-6 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <Truck className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">FleetFlow</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="#features" className="hover:text-blue-400 transition-colors">Process</a>
                        <a href="#solutions" className="hover:text-blue-400 transition-colors">Solutions</a>
                        <a href="#safety" className="hover:text-blue-400 transition-colors">Safety</a>
                    </div>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all"
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8"
                    >
                        <Activity size={14} />
                        Next-Gen Logistics Engine
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8"
                    >
                        Automate Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Entire Fleet</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed mb-12"
                    >
                        The ultimate modular platform for commercial logistics.
                        Optimize routes, track compliance, and scale your operations
                        with real-time data precision.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] active:scale-95 flex items-center justify-center gap-2"
                        >
                            Get Started
                            <ChevronRight size={20} />
                        </button>
                        <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                            <Globe size={20} />
                            View Demo
                        </button>
                    </motion.div>
                </div>

                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-24 max-w-6xl mx-auto relative"
                >
                    <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10" />
                    <div className="bg-slate-900 border border-white/10 rounded-[40px] p-4 overflow-hidden shadow-2xl">
                        <div className="aspect-[16/10] bg-slate-950 rounded-[30px] overflow-hidden relative">
                            {/* Mock Dashboard Body */}
                            <div className="p-8 grid grid-cols-4 gap-4">
                                <div className="col-span-1 h-64 bg-white/5 rounded-2xl" />
                                <div className="col-span-3 h-64 bg-white/5 rounded-2xl" />
                                <div className="col-span-2 h-40 bg-white/5 rounded-2xl" />
                                <div className="col-span-1 h-40 bg-white/5 rounded-2xl" />
                                <div className="col-span-1 h-40 bg-white/5 rounded-2xl" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Features Section */}
            <section id="features" className="py-32 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 bg-white/5 border border-white/5 rounded-[32px] hover:border-blue-500/30 transition-all group"
                            >
                                <div className="w-14 h-14 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                    <f.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                            <Truck className="text-slate-400" size={18} />
                        </div>
                        <span className="text-sm font-bold text-white opacity-40">© 2024 FleetFlow Systems Inc.</span>
                    </div>
                    <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
