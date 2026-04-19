export interface MenuCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    image_url?: string;
    sort_order?: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface MenuItem {
    id: number;
    menu_category_id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    price: number;
    cost_price?: number;
    preparation_time?: number;
    is_available: boolean;
    is_featured: boolean;
    allergens?: string;
    nutrition_info?: string;
    type: 'food' | 'beverage' | 'dessert' | 'other';
    sort_order?: number;
    is_active: boolean;
}

export interface MenuItemModifier {
    id: number;
    menu_item_id: number;
    name: string;
    is_required: boolean;
    allow_multiple: boolean;
}

export interface MenuItemModifierOption {
    id: number;
    menu_item_modifier_id: number;
    name: string;
    additional_price: number;
    is_default: boolean;
}
