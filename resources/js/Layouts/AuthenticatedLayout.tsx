import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';
import Breadcrumbs from '@/Components/Breadcrumbs';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface AuthUser {
    name?: string;
    email?: string;
    roles?: string[];
    dashboard?: { route: string; label: string };
    profile?: {
        full_name?: string;
        avatar?: string;
        position?: string;
    };
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function Authenticated({
    header,
    breadcrumbs,
    children,
}: PropsWithChildren<{ header?: ReactNode; breadcrumbs?: BreadcrumbItem[] }>) {
    const { auth } = usePage().props as any;
    const user: AuthUser | null = auth?.user ?? null;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    // Initialize theme (applies class to <html>)
    useTheme();

    // Close mobile menu when viewport becomes desktop-sized
    useEffect(() => {
        const handler = () => {
            if (window.innerWidth >= 1024) setMobileOpen(false);
        };
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return (
        <div
            className="flex h-screen overflow-hidden"
            style={{ backgroundColor: 'var(--bg-app)' }}
        >
            <Sidebar
                user={user}
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                onToggleCollapse={() => setCollapsed((c) => !c)}
            />

            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <Header
                    user={user}
                    onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
                />

                <main className="flex-1 overflow-y-auto">
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <div
                            className="px-6 py-3"
                            style={{
                                backgroundColor: 'var(--bg-app)',
                                borderBottom: '1px solid var(--bg-border)',
                            }}
                        >
                            <div className="mx-auto max-w-7xl">
                                <Breadcrumbs items={breadcrumbs} />
                            </div>
                        </div>
                    )}
                    {header && (
                        <div
                            className="px-6 py-4"
                            style={{
                                backgroundColor: 'var(--bg-surface)',
                                borderBottom: '1px solid var(--bg-border)',
                            }}
                        >
                            <div className="mx-auto max-w-7xl">{header}</div>
                        </div>
                    )}
                    <div className="px-4 py-6 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-7xl">{children}</div>
                    </div>
                </main>
            </div>
        </div>
    );
}
