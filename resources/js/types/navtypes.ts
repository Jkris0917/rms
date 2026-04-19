import { type LucideIcon } from 'lucide-react';

export interface NavItem {
    icon: LucideIcon;
    label: string;
    href: string;
}

export interface NavSection {
    title?: string;
    items: NavItem[];
}

export interface AuthUser {
    name?: string;
    email?: string;
    roles?: string[];
    dashboard?: { route: string; label: string };
    profile?: { full_name?: string; avatar?: string; position?: string };
}

export interface SidebarProps {
    user: AuthUser | null;
    collapsed: boolean;
    mobileOpen: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
}
