const features = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
        title: 'Order Management',
        description: 'Real-time order tracking from table to kitchen. Support for dine-in, takeout, and delivery with live status updates and modifier handling.',
        accent: 'from-orange-500 to-amber-500',
        shadow: 'group-hover:shadow-orange-500/20',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
        ),
        title: 'Payment Processing',
        description: 'Multi-payment support with cashier-managed transactions, split billing, discount codes, and full payment history per order.',
        accent: 'from-emerald-500 to-teal-500',
        shadow: 'group-hover:shadow-emerald-500/20',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
        title: 'Inventory Control',
        description: 'Automated stock tracking with supplier purchase orders, recipe-based deductions, low-stock alerts, and full transaction history.',
        accent: 'from-blue-500 to-indigo-500',
        shadow: 'group-hover:shadow-blue-500/20',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Reservations',
        description: 'Table booking system with time-slot management, customer linking, and automatic order creation on guest arrival.',
        accent: 'from-violet-500 to-purple-500',
        shadow: 'group-hover:shadow-violet-500/20',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: 'Delivery Tracking',
        description: 'Assign delivery drivers to orders, track delivery status in real-time, and manage your entire delivery fleet from one view.',
        accent: 'from-rose-500 to-pink-500',
        shadow: 'group-hover:shadow-rose-500/20',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: 'Staff & Shifts',
        description: 'Role-based access control across 8 staff roles, shift scheduling, and individual performance visibility by branch.',
        accent: 'from-amber-500 to-yellow-500',
        shadow: 'group-hover:shadow-amber-500/20',
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-800/40">
                        <span className="text-xs font-semibold text-orange-700 dark:text-orange-400 tracking-wide uppercase">Everything You Need</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
                        Built for the Real<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                            Restaurant Floor
                        </span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-lg">
                        Every feature designed around how restaurants actually operate — not how software companies imagine they do.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className={`group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl ${feature.shadow}`}
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.accent} flex items-center justify-center text-white mb-5 shadow-lg`}>
                                {feature.icon}
                            </div>

                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{feature.description}</p>

                            {/* Hover accent line */}
                            <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${feature.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
