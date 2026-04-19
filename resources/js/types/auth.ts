import type { AuthUser, Role } from '@/types';

export function hasRole(user: AuthUser | null, role: Role): boolean {
    return user?.roles.includes(role) ?? false;
}

export function hasAnyRole(user: AuthUser | null, roles: Role[]): boolean {
    return roles.some((role) => user?.roles.includes(role)) ?? false;
}

export function hasPermission(user: AuthUser | null, permission: string): boolean {
    return user?.permissions.includes(permission) ?? false;
}

export function isStaff(user: AuthUser | null): boolean {
    const staffRoles: Role[] = [
        'super_admin',
        'manager',
        'cashier',
        'waiter',
        'chef',
        'kitchen_staff',
        'delivery_driver',
    ];
    return hasAnyRole(user, staffRoles);
}

export function isCustomer(user: AuthUser | null): boolean {
    return hasRole(user, 'customer');
}
