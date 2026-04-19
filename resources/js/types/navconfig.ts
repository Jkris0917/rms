import {
    LayoutDashboard,
    Users,
    BarChart3,
    CircleDollarSign,
    Settings,
    ShoppingCart,
    ChefHat,
    Truck,
    UtensilsCrossed,
    CalendarDays,
    Package,
    ClipboardList,
    Building,
    Menu,
    Table,
    IdCard,
    Tag,
    Calendar,
    Box,
    BaggageClaim,
    TruckElectric,
    Search,
    Timer,
    ChartArea,
    MessageCircle,
    MenuIcon,
    CardSim,
    Notebook,
    Scroll,
    FileStack,
    Cog,
} from 'lucide-react';
import { NavSection } from './navtypes';

// ─── Safe Route Helper ────────────────────────────────────────────────────────
//
// Returns the generated URL if the named route exists,
// or falls back to '#' so the app never throws on missing routes.
//

function r(name: string, params?: Record<string, unknown>): string {
    try {
        return route(name, params);
    } catch {
        return '#';
    }
}

// ─── Role Nav Config ──────────────────────────────────────────────────────────
//
// One entry per role. Each role holds an array of sections.
// Sections with a `title` render a small heading (hidden when sidebar is collapsed).
// To add a link    → push to `items` in the relevant section.
// To add a section → push { title, items } to the role array.
// To add a role    → add a key here and its position in ROLE_PRIORITY below.
//

export const ROLE_NAV: Record<string, NavSection[]> = {
    super_admin: [
        {
            title: 'Overview',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', href: r('superadmin.dashboard') },
            ],
        },
        {
            title: 'Management',
            items: [
                { icon: Building, label: 'Branches', href: r('superadmin.branches.index') },
                { icon: Users, label: 'Users & Staffs', href: r('superadmin.users.index') },
                { icon: UtensilsCrossed, label: 'Menu', href: r('superadmin.menu.index') },
                { icon: Table, label: 'Tables', href: r('superadmin.tables.index') },
            ],
        },
        {
            title: 'Operations',
            items: [
                { icon: ShoppingCart, label: 'Orders', href: r('superadmin.orders.index') },
                { icon: IdCard, label: 'Payments', href: r('superadmin.payments.index') },
                { icon: Tag, label: 'Discounts', href: r('superadmin.discounts.index') },
                { icon: Calendar, label: 'Reservations', href: r('superadmin.reservations.index') },
                { icon: Truck, label: 'Deliveries', href: r('superadmin.deliveries.index') },
            ],
        },
        {
            title: 'Back Office',
            items: [
                { icon: Box, label: 'Inventory', href: r('superadmin.inventory.index') },
                { icon: BaggageClaim, label: 'Purchase Orders', href: r('superadmin.purchase-orders.index') },
                { icon: TruckElectric, label: 'Suppliers', href: r('superadmin.suppliers.index') },
                { icon: Search, label: 'Recipes', href: r('superadmin.recipes.index') },
                { icon: Timer, label: 'Shifts', href: r('superadmin.shifts.index') },
                { icon: ChartArea, label: 'Reports', href: r('superadmin.settings.index') },
                { icon: MessageCircle, label: 'Feedback', href: r('superadmin.feedback.index') },
            ],
        },
        {
            title: 'Other Settings',
            items: [
                { icon: Cog, label: 'Menu Category', href: r('superadmin.menu-categories.index') },
                { icon: Cog, label: 'Inventory Category', href: r('superadmin.inventory-categories.index') },
            ],
        },
    ],

    manager: [
        {
            title: 'Overview',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', href: r('manager.dashboard') },
            ],
        },
        {
            title: 'Management',
            items: [
                { icon: Building, label: 'Branches', href: r('manager.branches.index') },
                { icon: Users, label: 'Users & Staffs', href: r('manager.users.index') },
                { icon: UtensilsCrossed, label: 'Menu', href: r('manager.menu.index') },
                { icon: Table, label: 'Tables', href: r('manager.tables.index') },
            ],
        },
        {
            title: 'Operations',
            items: [
                { icon: ShoppingCart, label: 'Orders', href: r('manager.orders.index') },
                { icon: IdCard, label: 'Payments', href: r('manager.payments.index') },
                { icon: Tag, label: 'Discounts', href: r('manager.discounts.index') },
                { icon: Calendar, label: 'Reservations', href: r('manager.reservations.index') },
                { icon: Truck, label: 'Deliveries', href: r('manager.deliveries.index') },
            ],
        },
        {
            title: 'Back Office',
            items: [
                { icon: Box, label: 'Inventory', href: r('manager.inventory.index') },
                { icon: BaggageClaim, label: 'Purchase Orders', href: r('manager.purchase-orders.index') },
                { icon: TruckElectric, label: 'Suppliers', href: r('manager.suppliers.index') },
                { icon: Search, label: 'Recipes', href: r('manager.recipes.index') },
                { icon: Timer, label: 'Shifts', href: r('manager.shifts.index') },
                { icon: ChartArea, label: 'Reports', href: r('manager.settings.index') },
                { icon: MessageCircle, label: 'Feedback', href: r('manager.feedback.index') },
            ],
        },
    ],

    cashier: [
        {
            title: 'Overview',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', href: r('cashier.dashboard') },
            ],
        },
        {
            title: 'Billing',
            items: [
                { icon: MenuIcon, label: 'Menu', href: r('cashier.menu.index') },
                { icon: ShoppingCart, label: 'Orders', href: r('cashier.orders.index') },
                { icon: CardSim, label: 'Payments', href: r('cashier.payments.index') },
                { icon: Tag, label: 'Discounts', href: r('cashier.discounts.index') },
                { icon: ChartArea, label: 'Reports', href: r('cashier.reports.index') },
            ],
        },
    ],

    waiter: [
        {
            title: 'Overview',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', href: r('waiter.dashboard') },
            ],
        },
        {
            title: 'Floor',
            items: [
                { icon: UtensilsCrossed, label: 'Menu', href: r('menu.index') },
                { icon: Table, label: 'Tables', href: r('tables.index') },
                { icon: CalendarDays, label: 'Reservations', href: r('reservations.index') },
                { icon: Settings, label: 'Settings', href: r('profile.edit') },
            ],
        },
        {
            title: 'Orders',
            items: [
                { icon: ShoppingCart, label: 'Orders', href: r('orders.index') },
                { icon: Tag, label: 'Discounts', href: r('discounts.index') },
            ],
        },
    ],

    chef: [
        {
            title: 'Overview',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', href: r('chef.dashboard') },
            ],
        },
        {
            title: 'Kitchen',
            items: [
                { icon: Menu, label: 'Menu', href: r('menu.index') },
                { icon: ShoppingCart, label: 'Orders', href: r('orders.index') },
                { icon: Search, label: 'Recipes', href: r('recipes.index') },
                { icon: Package, label: 'Inventory', href: r('inventory.index') },
            ],
        },
    ],

    kitchen_staff: [
        {
            title: 'Overview',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', href: r('kitchen_staff.dashboard') },
            ],
        },
        {
            items: [
                { icon: Menu, label: 'Menu', href: r('menu.index') },
                { icon: ShoppingCart, label: 'Orders', href: r('order.index') },
            ],
        },
    ],

    delivery_driver: [
        {
            title: 'Overview',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', href: r('delivery_driver.dashboard') },
            ],
        },
        {
            items: [
                { icon: ShoppingCart, label: 'Orders', href: r('orders.index') },
                { icon: Truck, label: 'Deliveries', href: r('deliveries.index') },
            ],
        },
    ],

    customer: [
        {
            title: 'Overview',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', href: r('customer.dashboard') },
            ],
        },
        {
            title: 'My Account',
            items: [
                { icon: ShoppingCart, label: 'Place Order', href: r('customer.dashboard') },
                { icon: Calendar, label: 'My Orders', href: r('orders.index') },
                { icon: Calendar, label: 'My Reservations', href: r('reservations.index') },
                { icon: MessageCircle, label: 'Submit Feedback', href: r('reservations.index') },
            ],
        },
    ],

    default: [
        {
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', href: r('dashboard') },
                { icon: Settings, label: 'Settings', href: r('profile.edit') },
            ],
        },
    ],
};

// First matching role in this list wins
export const ROLE_PRIORITY = [
    'super_admin',
    'manager',
    'cashier',
    'waiter',
    'chef',
    'kitchen_staff',
    'delivery_driver',
    'customer',
] as const;

export function getNavSections(roles: string[]): NavSection[] {
    for (const role of ROLE_PRIORITY) {
        if (roles.includes(role)) return ROLE_NAV[role];
    }
    return ROLE_NAV.default;
}
