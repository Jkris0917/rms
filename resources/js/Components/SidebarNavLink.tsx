import { Link } from '@inertiajs/react';
import { NavItem } from '@/types/navtypes';

interface SidebarNavLinkProps {
    item: NavItem;
    active: boolean;
    collapsed: boolean;
    onClick?: () => void;
}

export default function SidebarNavLink({ item, active, collapsed, onClick }: SidebarNavLinkProps) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            onClick={onClick}
            data-active={active}
            className="sidebar-nav-item group relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] hover:bg-[var(--sidebar-item-hover)] data-[active=true]:hover:bg-[var(--sidebar-item-active-bg)]"
            style={{
                color: active ? 'var(--sidebar-item-active-text)' : 'var(--sidebar-text)',
                backgroundColor: active ? 'var(--sidebar-item-active-bg)' : undefined,
            }}
        >
            {/* Active bar */}
            {active && (
                <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                    style={{ backgroundColor: 'var(--accent)' }}
                />
            )}

            {/* Icon */}
            <span
                className="flex-shrink-0"
                style={{ color: active ? 'var(--sidebar-item-active-icon)' : 'var(--sidebar-text-muted)' }}
            >
                <Icon size={18} strokeWidth={1.75} />
            </span>

            {/* Label */}
            {!collapsed && <span className="truncate">{item.label}</span>}

            {/* Tooltip — collapsed only */}
            {collapsed && (
                <span className="pointer-events-none absolute left-full ml-2 z-50 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    {item.label}
                </span>
            )}
        </Link>
    );
}
