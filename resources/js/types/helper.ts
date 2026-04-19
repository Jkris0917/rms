export function getInitials(name?: string): string {
    if (!name) return 'U';
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export function getRoleLabel(roles: string[]): string {
    const map: Record<string, string> = {
        super_admin: 'Super Admin',
        manager: 'Manager',
        cashier: 'Cashier',
        waiter: 'Waiter',
        chef: 'Chef',
        kitchen_staff: 'Kitchen Staff',
        delivery_driver: 'Driver',
        customer: 'Customer',
    };
    for (const role of Object.keys(map)) {
        if (roles.includes(role)) return map[role];
    }
    return 'User';
}
