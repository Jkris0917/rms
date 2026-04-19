import Dropdown from '@/Components/Dropdown';
import { useTheme } from '@/hooks/useTheme';
import { Bell, Menu, ChevronDown, User, Settings, LogOut, Sun, Moon } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserProfile {
    full_name?: string;
    avatar?: string;
    position?: string;
}

interface AuthUser {
    name?: string;
    email?: string;
    roles?: string[];
    profile?: UserProfile;
}

interface HeaderProps {
    user: AuthUser | null;
    onMobileMenuToggle: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name?: string): string {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name, size = 'md' }: { name?: string; size?: 'sm' | 'md' | 'lg' }) {
    const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-8 h-8 text-sm', lg: 'w-9 h-9 text-sm' };
    return (
        <div
            className={`${sizes[size]} flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-semibold flex-shrink-0 ring-2 ring-white dark:ring-[var(--sidebar-bg)] shadow-sm`}
        >
            {getInitials(name)}
        </div>
    );
}

// ─── Theme Toggle Button ───────────────────────────────────────────────────────

function ThemeToggle() {
    const { theme, toggle } = useTheme();
    return (
        <button
            onClick={toggle}
            className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-150"
            style={{
                color: 'var(--header-icon)',
                backgroundColor: 'transparent',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--header-icon-hover-bg)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun size={18} strokeWidth={1.75} />
            ) : (
                <Moon size={18} strokeWidth={1.75} />
            )}
        </button>
    );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header({ user, onMobileMenuToggle }: HeaderProps) {
    const displayName = user?.profile?.full_name ?? user?.name;

    return (
        <header
            className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 backdrop-blur-md gap-3"
            style={{
                backgroundColor: 'var(--header-bg)',
                borderBottom: '1px solid var(--header-border)',
            }}
        >
            {/* Mobile-only hamburger */}
            <button
                onClick={onMobileMenuToggle}
                className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-150"
                style={{ color: 'var(--header-icon)' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--header-icon-hover-bg)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                aria-label="Open menu"
            >
                <Menu size={20} strokeWidth={1.75} />
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right: actions */}
            <div className="flex items-center gap-1">
                {/* Theme toggle */}
                <ThemeToggle />

                {/* Notification bell */}
                <button
                    className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-150"
                    style={{ color: 'var(--header-icon)' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--header-icon-hover-bg)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                    <Bell size={20} strokeWidth={1.75} />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full ring-1 ring-white dark:ring-[var(--header-bg)]" />
                </button>

                {/* Divider */}
                <div className="w-px h-5 mx-1" style={{ backgroundColor: 'var(--header-divider)' }} />

                {/* Profile dropdown */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <button
                            className="flex items-center gap-2 px-1.5 py-1 rounded-lg transition-colors duration-150 group"
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--header-icon-hover-bg)')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                            <Avatar name={displayName} />
                            <div className="hidden md:flex flex-col items-start">
                                <span
                                    className="text-sm font-medium leading-tight"
                                    style={{ color: 'var(--header-name)' }}
                                >
                                    {displayName || 'User'}
                                </span>
                                <span
                                    className="text-xs leading-tight max-w-[140px] truncate"
                                    style={{ color: 'var(--header-email)' }}
                                >
                                    {user?.email || ''}
                                </span>
                            </div>
                            <span
                                className="hidden md:block ml-0.5 transition-colors"
                                style={{ color: 'var(--header-icon)' }}
                            >
                                <ChevronDown size={14} strokeWidth={2.5} />
                            </span>
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Content align="right">
                        {/* User info header */}
                        <div
                            className="px-3 py-2.5"
                            style={{ borderBottom: '1px solid var(--dropdown-border)' }}
                        >
                            <p
                                className="text-sm font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {displayName}
                            </p>
                            <p
                                className="text-xs mt-0.5"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {user?.email}
                            </p>
                        </div>

                        <Dropdown.Link href={route('profile.edit')}>
                            <span className="flex items-center gap-2.5">
                                <User size={16} strokeWidth={1.75} />
                                My Profile
                            </span>
                        </Dropdown.Link>

                        <Dropdown.Link href="#">
                            <span className="flex items-center gap-2.5">
                                <Settings size={16} strokeWidth={1.75} />
                                Settings
                            </span>
                        </Dropdown.Link>

                        <div className="my-1" style={{ borderTop: '1px solid var(--dropdown-border)' }} />

                        <Dropdown.Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-rose-500 hover:bg-rose-500/10"
                        >
                            <span className="flex items-center gap-2.5">
                                <LogOut size={16} strokeWidth={1.75} />
                                Sign Out
                            </span>
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </header>
    );
}
