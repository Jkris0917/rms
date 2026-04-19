const testimonials = [
    {
        name: 'Maria Santos',
        role: 'Owner, Kapehan sa Sugbo',
        avatar: 'MS',
        avatarColor: 'from-orange-400 to-amber-500',
        rating: 5,
        quote: 'RestoHub completely transformed how we manage our three branches. The inventory tracking alone has saved us from running out of ingredients mid-service at least a dozen times.',
    },
    {
        name: 'Carlo Reyes',
        role: 'F&B Manager, Hotel Mactan',
        avatar: 'CR',
        avatarColor: 'from-blue-400 to-indigo-500',
        rating: 5,
        quote: 'The role-based access is brilliant. My kitchen staff only see the KDS, cashiers only see payments. Zero confusion, zero security issues. It just makes sense.',
    },
    {
        name: 'Jennie Lim',
        role: 'Operations Head, TaLuto Group',
        avatar: 'JL',
        avatarColor: 'from-rose-400 to-pink-500',
        rating: 5,
        quote: 'We went from spreadsheets to RestoHub in two weeks. The reservation-to-order flow cut our front-of-house errors by 80%. Our waiters actually love it.',
    },
    {
        name: 'Noel Corpuz',
        role: 'Chef/Owner, Lutong Pinoy Express',
        avatar: 'NC',
        avatarColor: 'from-emerald-400 to-teal-500',
        rating: 5,
        quote: 'Seeing live orders on the kitchen display instead of printed tickets changed everything. The recipe-based inventory deduction is a game changer.',
    },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-24 bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-800/40">
                        <span className="text-xs font-semibold text-orange-700 dark:text-orange-400 tracking-wide uppercase">What They're Saying</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
                        Loved by Restaurateurs<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                            Across the Philippines
                        </span>
                    </h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, j) => (
                                    <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 text-[15px]">
                                "{t.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-zinc-900 dark:text-white">{t.name}</div>
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
