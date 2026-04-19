export type TableStatus = "available" | "occupied" | "reserved" | "maintenance";

export interface Table {
    id: number;
    branch_id: number;
    table_number: number;
    capacity: number;
    status: TableStatus;
    location: string;
    qr_code: string;
}
