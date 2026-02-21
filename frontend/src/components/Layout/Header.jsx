import { Bell, Search, User } from 'lucide-react';

export default function Header() {
    return (
        <header className="h-20 border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
            {/* Search Bar */}
            <div className="relative max-w-md w-full group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input
                    type="text"
                    placeholder="Search for vehicles, drivers..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-slate-200 placeholder:text-slate-500 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
                <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950"></span>
                </button>

                <div className="h-8 w-[1px] bg-white/5"></div>

                <button className="flex items-center space-x-3 p-1 rounded-xl hover:bg-white/5 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
                        <User size={16} className="text-white" />
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className="text-xs font-semibold text-white">Ankit Jain</p>
                        <p className="text-[10px] text-slate-500">Fleet Manager</p>
                    </div>
                </button>
            </div>
        </header>
    );
}
