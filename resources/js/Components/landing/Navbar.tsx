import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface NavbarProps {
    auth: {
        user?: {
            roles?: string[];
            name?: string;
        };
    };
}

const getDashboardRoute = (user: any): string => {
    if (!user || !user.roles) return '/dashboard';
    const roles = Array.isArray(user.roles) ? user.roles : [];
    if (roles.includes('super_admin')) return '/superadmin/dashboard';
    if (roles.includes('manager')) return '/manager/dashboard';
    if (roles.includes('cashier')) return '/cashier/dashboard';
    if (roles.includes('waiter')) return '/waiter/dashboard';
    if (roles.includes('chef')) return '/chef/dashboard';
    if (roles.includes('kitchen_staff')) return '/kitchen_staff/dashboard';
    if (roles.includes('delivery_driver')) return '/delivery_driver/dashboard';
    if (roles.includes('customer')) return '/customer/dashboard';
    return '/dashboard';
};

export default function Navbar({ auth }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/30'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                                <path d="M8.5 7.5C8.5 6.67 9.17 6 10 6h4c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-4C9.17 18 8.5 17.33 8.5 16.5v-9z" opacity="0"/>
                            </svg>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-display">
                            Resto<span className="text-orange-500">Hub</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {['Features', 'Roles', 'Stats', 'Testimonials'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {auth?.user ? (
                            <Link
                                href={getDashboardRoute(auth.user)}
                                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
                            >
                                Go to Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-700 dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold transition-all duration-200 shadow-lg"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden pb-4 border-t border-zinc-100 dark:border-zinc-800 mt-2">
                        <nav className="flex flex-col gap-1 pt-3">
                            {['Features', 'Roles', 'Stats', 'Testimonials'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    {item}
                                </a>
                            ))}
                            <div className="flex gap-2 mt-3 px-1">
                                {auth?.user ? (
                                    <Link
                                        href={getDashboardRoute(auth.user)}
                                        className="flex-1 text-center px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-semibold"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="flex-1 text-center px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300">Log in</Link>
                                        <Link href={route('register')} className="flex-1 text-center px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold">Get Started</Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
