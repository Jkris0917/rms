export interface Profile {
    first_name: string;
    middle_name: string | null;
    last_name: string;
    full_name: string;
    phone: string | null;
    avatar: string | null;
    position: string | null;
}

export interface Dashboard {
    route: string;
    label: string;
}

export type Role =
    | 'super_admin'
    | 'manager'
    | 'cashier'
    | 'waiter'
    | 'chef'
    | 'kitchen_staff'
    | 'delivery_driver'
    | 'customer';

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    email_verified_at?: string;
    roles: Role[];
    permissions: string[];
    profile: Profile | null;
    dashboard: Dashboard;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: AuthUser | null;
    };
};

