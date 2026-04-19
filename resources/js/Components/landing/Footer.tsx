import { Link } from '@inertiajs/react';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-zinc-950 text-zinc-400">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-white">
                                Resto<span className="text-orange-500">Hub</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm">
                            The complete restaurant management platform built for Filipino restaurateurs. Streamline operations, delight customers, grow your business.
                        </p>
                        <div className="flex gap-3">
                            {/* Social links placeholder */}
                            {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors text-xs font-medium"
                                    title={social}
                                >
                                    {social[0]}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Product</h4>
                        <nav className="flex flex-col gap-3">
                            {[
                                { label: 'Features', href: '#features' },
                                { label: 'Pricing', href: '#' },
                                { label: 'Integrations', href: '#' },
                                { label: 'Changelog', href: '#' },
                                { label: 'Roadmap', href: '#' },
                            ].map((link) => (
                                <a key={link.label} href={link.href} className="text-sm hover:text-white transition-colors">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Company</h4>
                        <nav className="flex flex-col gap-3">
                            {[
                                { label: 'About Us', href: '#' },
                                { label: 'Contact', href: '#' },
                                { label: 'Privacy Policy', href: '#' },
                                { label: 'Terms of Service', href: '#' },
                                { label: 'Support', href: '#' },
                            ].map((link) => (
                                <a key={link.label} href={link.href} className="text-sm hover:text-white transition-colors">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-600">
                        © {year} RestoHub. All rights reserved. Made with ❤️ in the Philippines.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-zinc-500">All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
