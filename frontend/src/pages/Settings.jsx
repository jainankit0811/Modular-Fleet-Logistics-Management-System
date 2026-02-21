import { Save, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { userService } from '../services/userService';

export default function Settings() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await userService.getMe();
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="h-[calc(100vh-140px)] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Account Settings</h1>
                <p className="text-slate-500 mt-1">Manage your profile and platform preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Sections */}
                <div className="space-y-2">
                    {[
                        { icon: User, label: 'Profile Info' },
                    ].map((section, idx) => (
                        <button
                            key={section.label}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${idx === 0 ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <section.icon size={20} />
                            <span className="font-medium">{section.label}</span>
                        </button>
                    ))}
                </div>

                {/* Right Column: Content */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                        <div className="flex items-center space-x-6 mb-8">
                            <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 text-3xl font-bold">
                                {user?.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white leading-tight">{user?.name}</h3>
                                <p className="text-slate-500 capitalize">{user?.role} Account</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-500 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue={user?.name}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3 px-4 text-white outline-none focus:border-blue-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-500 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue={user?.email}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3 px-4 text-white outline-none focus:border-blue-500/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="flex items-center space-x-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                                <Save size={18} />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-rose-500/5 border border-rose-500/10 rounded-3xl p-8 backdrop-blur-sm">
                        <h4 className="text-lg font-bold text-rose-400 mb-2">Danger Zone</h4>
                        <p className="text-slate-500 text-sm mb-6">Deactivating your account is permanent. All your fleet data will be archived.</p>
                        <button className="px-6 py-2.5 border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 rounded-xl font-bold transition-all text-sm">
                            Deactivate Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
