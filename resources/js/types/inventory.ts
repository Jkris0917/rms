export interface Suppliers {
    id: number;
    name: string;
    contact_person?: string;
    phone?: string;
    email?: string;
    address?: string;
    is_active: boolean;
}

export interface InventoryCategory {
    id: number;
    name: string;
    description?: string;
}

export interface InventoryItem {
    id: number;
    inventory_category_id: number;
    branch_id: number;
    name: string;
    sku?: string;
    unit: string;
    quantity: number;
    low_stock_threshold: number;
    unit_cost: number;
    expiry_date?: string;
}

export interface InventoryTransaction {
    id: number;
    inventory_item_id: number;
    user_id: number;
    transaction_type: 'stock_in' | 'stock_out' | 'adjustment' | 'waste' | 'transfer';
    quantity: number;
    unit_cost?: number;
    reference_type?: string;
    reference_id?: number;
    notes?: string;
}

export interface PurchaseOrder {
    id: number;
    po_number: string;
    supplier_id: string;
    branch_id: number;
    order_by: number;
    status: 'draft' | 'sent' | 'partial' | 'recieved' | 'cancelled';
    total_amount: number;
    expected_delivery?: string;
    recieve_at?: string;
    notes?: string;
}

export interface PurchaseOrderItem {
    id: number;
    purchase_order_id: number;
    inventory_item_id: number;
    quantity: number;
    received_quantity: number;
    unit_cost: number;
    total_cost: number;
}

export interface Recipe {
    id: number;
    menu_item_id: number;
    inventory_item_id: number;
    quantity: number;
}
