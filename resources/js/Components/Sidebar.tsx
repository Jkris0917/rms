import { Link, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import SidebarAvatar from './SidebarAvatar';
import SidebarNavLink from './SidebarNavLink';
import { SidebarProps } from '@/types/navtypes';
import { getNavSections } from '@/types/navconfig';
import { getRoleLabel } from '@/types/helper';

export default function Sidebar({
    user,
    collapsed,
    mobileOpen,
    onClose,
    onToggleCollapse,
}: SidebarProps) {
    const { url } = usePage();

    const roles = useMemo(
        () => (Array.isArray(user?.roles) ? user!.roles : []),
        [user],
    );
    const sections = useMemo(() => getNavSections(roles), [roles]);
    const displayName = user?.profile?.full_name ?? user?.name;

    const isActive = (href: string) => {
        const hrefPath = href.startsWith('http')
            ? new URL(href).pathname.replace(/\/$/, '')
            : href.replace(/\/$/, '');

        const currentPath = url?.split('?')[0].replace(/\/$/, '');

        return currentPath === hrefPath || currentPath?.startsWith(hrefPath + '/');
    };

    return (
        <>
            {/* Mobile backdrop */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}
                onClick={onClose}
            />

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 flex flex-col border-r shadow-sm
                    transition-all duration-300 ease-in-out
                    lg:static lg:shadow-none lg:z-auto
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    ${collapsed ? 'w-[60px]' : 'w-60'}
                `}
                style={{
                    backgroundColor: 'var(--sidebar-bg)',
                    borderColor: 'var(--sidebar-border)',
                }}
            >
                {/* Brand */}
                <div
                    className={`h-14 flex items-center border-b flex-shrink-0 relative ${collapsed ? 'justify-center px-2' : 'justify-between px-4'
                        }`}
                    style={{ borderColor: 'var(--sidebar-border)' }}
                >
                    {collapsed ? (
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-sm font-bold shadow-md">
                            R
                        </div>
                    ) : (
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-sm font-bold shadow-md flex-shrink-0">
                                R
                            </div>
                            <span
                                className="text-base font-bold tracking-tight"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                RMS
                            </span>
                        </Link>
                    )}

                    {/* Collapse toggle — desktop only */}
                    <button
                        onClick={onToggleCollapse}
                        className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 items-center justify-center w-6 h-6 border shadow-sm rounded-full transition-colors z-10"
                        style={{
                            backgroundColor: 'var(--sidebar-bg)',
                            borderColor: 'var(--sidebar-border)',
                            color: 'var(--sidebar-text-muted)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.color = 'var(--text-primary)';
                            e.currentTarget.style.backgroundColor = 'var(--sidebar-item-hover)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.color = 'var(--sidebar-text-muted)';
                            e.currentTarget.style.backgroundColor = 'var(--sidebar-bg)';
                        }}
                        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        <ChevronLeft
                            size={14}
                            strokeWidth={2.5}
                            className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {/* Mobile close */}
                    {!collapsed && (
                        <button
                            onClick={onClose}
                            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-md transition-colors"
                            style={{ color: 'var(--sidebar-text-muted)' }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = 'var(--sidebar-item-hover)';
                                e.currentTarget.style.color = 'var(--text-primary)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--sidebar-text-muted)';
                            }}
                            aria-label="Close sidebar"
                        >
                            <X size={18} strokeWidth={1.75} />
                        </button>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-4">
                    {sections.map((section, si) => (
                        <div key={si} className="space-y-0.5">
                            {section.title && !collapsed && (
                                <p
                                    className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--sidebar-section-label)' }}
                                >
                                    {section.title}
                                </p>
                            )}
                            {section.items.map((item, ii) => (
                                <SidebarNavLink
                                    key={`${si}-${ii}`}
                                    item={item}
                                    active={isActive(item.href)}
                                    collapsed={collapsed}
                                    onClick={onClose}
                                />
                            ))}
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                {!collapsed ? (
                    <div
                        className="p-3"
                        style={{ borderTop: '1px solid var(--sidebar-border)' }}
                    >
                        <div className="flex items-center gap-2.5 px-1">
                            <SidebarAvatar name={displayName} size="lg" />
                            <div className="min-w-0 flex-1">
                                <p
                                    className="text-sm font-medium truncate leading-tight"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {displayName || 'User'}
                                </p>
                                <p
                                    className="text-xs truncate leading-tight mt-0.5"
                                    style={{ color: 'var(--sidebar-text-muted)' }}
                                >
                                    {getRoleLabel(roles)}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className="py-3 flex justify-center"
                        style={{ borderTop: '1px solid var(--sidebar-border)' }}
                    >
                        <SidebarAvatar name={displayName} />
                    </div>
                )}
            </aside>
        </>
    );
}
