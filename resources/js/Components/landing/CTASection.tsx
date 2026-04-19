import { Link } from '@inertiajs/react';

interface CTASectionProps {
    isLoggedIn: boolean;
    dashboardRoute: string;
}

export default function CTASection({ isLoggedIn, dashboardRoute }: CTASectionProps) {
    return (
        <section className="relative py-24 bg-white dark:bg-zinc-900 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-orange-100 to-transparent dark:from-orange-950/20 dark:to-transparent blur-3xl opacity-60" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 rounded-3xl p-12 lg:p-16 border border-zinc-700/50 shadow-2xl shadow-black/20 relative overflow-hidden">
                    {/* Inner glow */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.08),transparent_60%)] pointer-events-none" />

                    <div className="relative space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                            <span className="text-xs font-semibold text-orange-400 tracking-wide uppercase">Ready to Transform Your Restaurant?</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                            Start Managing<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                                Smarter Today
                            </span>
                        </h2>

                        <p className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
                            Join hundreds of Filipino restaurants already running on RestoHub. Setup takes less than 10 minutes.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            {isLoggedIn ? (
                                <Link
                                    href={dashboardRoute}
                                    className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
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
                                        className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
                                    >
                                        Create Free Account
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="px-8 py-4 rounded-2xl border border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-white font-semibold text-base transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                            {[
                                { icon: '✓', text: 'No credit card required' },
                                { icon: '✓', text: 'Free 30-day trial' },
                                { icon: '✓', text: 'Cancel anytime' },
                            ].map((item) => (
                                <div key={item.text} className="flex items-center gap-2 text-sm text-zinc-500">
                                    <span className="text-emerald-400 font-bold">{item.icon}</span>
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
