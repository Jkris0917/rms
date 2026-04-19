import { Link } from '@inertiajs/react';

interface HeroSectionProps {
    isLoggedIn: boolean;
    dashboardRoute: string;
}

export default function HeroSection({ isLoggedIn, dashboardRoute }: HeroSectionProps) {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-zinc-950">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Radial gradient blob */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-orange-100 via-amber-50 to-transparent dark:from-orange-950/30 dark:via-amber-950/10 dark:to-transparent opacity-70 translate-x-1/3 -translate-y-1/4" />
                {/* Grid dots */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
                {/* Diagonal accent line */}
                <div className="absolute top-1/4 right-1/4 w-px h-64 bg-gradient-to-b from-transparent via-orange-300/50 to-transparent dark:via-orange-500/30 rotate-12" />
                <div className="absolute top-1/3 right-1/3 w-px h-32 bg-gradient-to-b from-transparent via-amber-300/30 to-transparent dark:via-amber-500/20 -rotate-12" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 lg:pt-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-950/50 border border-orange-200/60 dark:border-orange-800/40">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                            <span className="text-xs font-semibold text-orange-700 dark:text-orange-400 tracking-wide uppercase">Restaurant Management Platform</span>
                        </div>

                        {/* Heading */}
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-zinc-900 dark:text-white leading-[0.95]">
                                Run Your
                                <br />
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                                        Restaurant
                                    </span>
                                    <span className="absolute -bottom-1 left-0 right-0 h-3 bg-orange-100 dark:bg-orange-950/50 -z-0 skew-x-1" />
                                </span>
                                <br />
                                Smarter.
                            </h1>
                            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
                                Complete operations management — from tables and orders to inventory, staff, and delivery — all unified in one powerful platform.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {isLoggedIn ? (
                                <Link
                                    href={dashboardRoute}
                                    className="group px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
                                >
                                    Open Dashboard
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="group px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
                                    >
                                        Start Free Trial
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="px-6 py-3.5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-base hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-6 pt-2">
                            <div className="flex -space-x-2">
                                {['bg-orange-400', 'bg-amber-500', 'bg-rose-400', 'bg-emerald-400'].map((color, i) => (
                                    <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-white dark:border-zinc-950 flex items-center justify-center text-white text-xs font-bold`}>
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex items-center gap-0.5 mb-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Trusted by <strong className="text-zinc-700 dark:text-zinc-300">500+</strong> restaurants</p>
                            </div>
                        </div>
                    </div>

                    {/* Right — Dashboard Preview Card */}
                    <div className="relative">
                        {/* Floating card glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-400/10 dark:from-orange-600/10 dark:to-amber-600/5 rounded-3xl blur-3xl scale-110" />

                        <div className="relative bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 overflow-hidden">
                            {/* Fake window bar */}
                            <div className="flex items-center gap-2 px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200/60 dark:border-zinc-700/50">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                </div>
                                <div className="flex-1 mx-4 h-6 rounded-md bg-zinc-200 dark:bg-zinc-700 flex items-center px-3">
                                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500">restohub.app/dashboard</span>
                                </div>
                            </div>

                            {/* Dashboard preview content */}
                            <div className="p-5 space-y-4">
                                {/* Stats row */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { label: 'Active Orders', value: '24', color: 'from-orange-500 to-amber-500', icon: '🍽️' },
                                        { label: 'Revenue Today', value: '₱18.4k', color: 'from-emerald-500 to-teal-500', icon: '💰' },
                                        { label: 'Tables Open', value: '8/14', color: 'from-blue-500 to-indigo-500', icon: '🪑' },
                                    ].map((stat) => (
                                        <div key={stat.label} className="rounded-2xl bg-zinc-50 dark:bg-zinc-800 p-3 space-y-1">
                                            <div className={`text-lg font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                                            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium leading-tight">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Recent Orders */}
                                <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800 p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Live Orders</h3>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-semibold">Live</span>
                                    </div>
                                    <div className="space-y-2">
                                        {[
                                            { table: 'Table 4', item: 'Beef Sinigang, Rice ×2', status: 'Preparing', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' },
                                            { table: 'Table 7', item: 'Crispy Pata, San Mig', status: 'Ready', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' },
                                            { table: 'Delivery #12', item: 'Family Meal Set ×1', status: 'En Route', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
                                        ].map((order) => (
                                            <div key={order.table} className="flex items-center justify-between py-2 border-b border-zinc-200/60 dark:border-zinc-700/50 last:border-0">
                                                <div>
                                                    <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{order.table}</div>
                                                    <div className="text-[10px] text-zinc-500 dark:text-zinc-500 mt-0.5">{order.item}</div>
                                                </div>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${order.color}`}>{order.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Inventory alert */}
                                <div className="flex items-center gap-3 rounded-2xl border border-orange-200/60 dark:border-orange-800/30 bg-orange-50 dark:bg-orange-950/20 px-4 py-3">
                                    <div className="w-7 h-7 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-orange-800 dark:text-orange-300">Low Stock Alert</p>
                                        <p className="text-[10px] text-orange-600/80 dark:text-orange-400/70">Chicken breast — 2 kg remaining</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -bottom-4 -left-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-xl px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-zinc-900 dark:text-white">Order #1047 Paid</p>
                                <p className="text-[10px] text-zinc-400">₱1,280.00 via GCash</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
