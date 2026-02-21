import { Search } from 'lucide-react';

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
        </header>
    );
}
