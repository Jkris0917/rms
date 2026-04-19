const stats = [
    { value: '500+', label: 'Restaurants Using RestoHub', sublabel: 'Across the Philippines' },
    { value: '2.4M+', label: 'Orders Processed', sublabel: 'Monthly average' },
    { value: '99.9%', label: 'System Uptime', sublabel: 'Enterprise reliability' },
    { value: '8', label: 'Staff Roles Supported', sublabel: 'From cashier to delivery' },
];

export default function StatsSection() {
    return (
        <section id="stats" className="relative py-20 bg-zinc-950 dark:bg-zinc-900 overflow-hidden">
            {/* Subtle top edge gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group">
                            <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2 transition-transform group-hover:scale-105 duration-300">
                                {stat.value}
                            </div>
                            <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
                            <div className="text-xs text-zinc-500">{stat.sublabel}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
