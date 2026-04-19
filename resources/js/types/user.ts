export interface User {
    id: number;
    username: string;
    email: string;
    roles?: Role[];
    profile?: Profile;
}

export interface Role {
    id: number;
    name: string;
}

export interface Profile {
    id: number;
    user_id: number;

    // Basic info
    first_name: string;
    middle_name?: string;
    last_name: string;
    phone: string;
    avatar?: string;
    address?: string;
    date_of_birth?: string;
    gender: 'male' | 'female' | 'other';

    // Emergency contact
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    emergency_contact_relationship?: string;

    // Employment info
    position?: string;
    hire_date?: string;
    salary?: number;
    employment_type?: 'full_time' | 'part_time' | 'contractual';
    employee_id?: string;
    employment_status?: 'active' | 'inactive' | 'on_leave';

    // Schedule / shift
    shift?: 'morning' | 'afternoon' | 'night';
    work_days?: string[];
    shift_start?: string;
    shift_end?: string;

    // Social media
    facebook?: string;
    instagram?: string;
    twitter?: string;

    // Customer-specific
    dietary_restrictions?: string;
    allergies?: string;
    notes?: string;
}

export interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}
