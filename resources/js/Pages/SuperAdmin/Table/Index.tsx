import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TableModal from "./TableModal";
import useTable from "@/hooks/useTable";
import { Table } from "@/types/table";
import { useState } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
    QrCode,
    Database,
    CheckCircle2,
    XCircle,
} from "lucide-react";

const breadcrumbs = [
    { label: "Dashboard", href: route("superadmin.dashboard") },
    { label: "Tables" },
];

type ModalMode = "create" | "edit" | "show" | null;

export default function TableIndex() {
    const {
        editing,
        handleDelete,
        handleSave,
        lastPage,
        loading,
        page,
        processing,
        search,
        setEditing,
        setPage,
        setProcessing,
        setSearch,
        setViewing,
        settable,
        table,
        viewing,
    } = useTable();

    const [modalMode, setModalMode] = useState<ModalMode>(null);

    const openCreate = () => {
        setEditing(null);
        setViewing(null);
        setModalMode("create");
    };

    const openEdit = (t: Table) => {
        setEditing(t);
        setViewing(null);
        setModalMode("edit");
    };

    const openShow = (t: Table) => {
        setViewing(t);
        setEditing(null);
        setModalMode("show");
    };

    const closeModal = () => {
        setModalMode(null);
        setEditing(null);
        setViewing(null);
    };

    const statusConfig: Record<string, { label: string; color: string }> = {
        available: {
            label: "Available",
            color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 ring-emerald-200 dark:ring-emerald-700",
        },
        occupied: {
            label: "Occupied",
            color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 ring-rose-200 dark:ring-rose-700",
        },
        reserved: {
            label: "Reserved",
            color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 ring-amber-200 dark:ring-amber-700",
        },
        maintenance: {
            label: "Maintenance",
            color: "text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 ring-slate-200 dark:ring-slate-700",
        },
    };

    return (
        <Authenticated breadcrumbs={breadcrumbs}>
            <Head title="Tables" />

            <div className="min-h-screen p-6 lg:p-10" style={{ background: "var(--bg-app)" }}>
                <div className="max-w-7xl mx-auto">
                    {/* ── Header ── */}
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: "var(--accent)" }}>
                                Floor Management
                            </p>
                            <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                                Dining Tables
                            </h1>
                            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                                Manage floor layout, capacity, and table status.
                            </p>
                        </div>
                        <button
                            onClick={openCreate}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg active:scale-95 transition-all duration-150"
                            style={{ background: "var(--accent)" }}
                        >
                            <Plus className="h-4 w-4" />
                            New Table
                        </button>
                    </div>

                    {/* ── Search bar ── */}
                    <form onSubmit={(e) => { e.preventDefault(); setPage(1); }} className="mb-6 flex gap-3 max-w-md">
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--text-muted)" }} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search tables…"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition themed-input"
                                style={{
                                    background: "var(--bg-surface)",
                                    border: "1px solid var(--bg-border)",
                                    color: "var(--text-primary)",
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2.5 rounded-xl text-sm font-medium active:scale-95 transition-all"
                            style={{
                                background: "var(--bg-surface)",
                                border: "1px solid var(--bg-border)",
                                color: "var(--text-secondary)",
                            }}
                        >
                            Search
                        </button>
                    </form>

                    {/* ── Table card ── */}
                    <div className="rounded-2xl overflow-hidden" style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--bg-border)",
                        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.06)",
                    }}>
                        {loading ? (
                            <div className="flex items-center justify-center py-24 gap-3" style={{ color: "var(--text-muted)" }}>
                                <Database className="h-5 w-5 animate-pulse" />
                                <span className="text-sm">Loading tables…</span>
                            </div>
                        ) : table.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-3" style={{ color: "var(--text-muted)" }}>
                                <Database className="h-10 w-10 opacity-30" />
                                <p className="text-sm">No tables found.</p>
                                <button
                                    onClick={openCreate}
                                    className="mt-2 text-sm underline underline-offset-2"
                                    style={{ color: "var(--accent)" }}
                                >
                                    Create your first table
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr style={{ borderBottom: "1px solid var(--bg-border)", background: "var(--bg-surface-hover)" }}>
                                            {[
                                                "ID",
                                                "Table #",
                                                "Branch",
                                                "Capacity",
                                                "Location",
                                                "Status",
                                                "QR Code",
                                                "",
                                            ].map((h, i) => (
                                                <th
                                                    key={h}
                                                    className={`px-6 py-4 text-[11px] font-bold tracking-widest uppercase ${i === 7 ? "text-right" : ""}`}
                                                    style={{ color: "var(--text-muted)" }}
                                                >
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table.map((t) => {
                                            const status =
                                                statusConfig[t.status as string] ??
                                                statusConfig["available"];
                                            return (
                                                <tr
                                                    key={t.id}
                                                    className="group transition-colors table-row-hover"
                                                    style={{ borderTop: "1px solid var(--bg-border-subtle)" }}
                                                >
                                                    <td className="px-6 py-4 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                                                        #{t.id}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3.5">
                                                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                                                {t.table_number}
                                                            </div>
                                                            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                                                                Table {t.table_number}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                                                        {t.branch_id}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                                                            <span>👤</span>
                                                            {t.capacity}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm max-w-[140px] truncate" style={{ color: "var(--text-muted)" }}>
                                                        {t.location || "—"}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                                                            style={{
                                                                background:
                                                                    t.status === "available" ? "#dcfce7" :
                                                                        t.status === "occupied" ? "#fee2e2" :
                                                                            t.status === "reserved" ? "#fef9c3" :
                                                                                "#f1f5f9",
                                                                color:
                                                                    t.status === "available" ? "#166534" :
                                                                        t.status === "occupied" ? "#991b1b" :
                                                                            t.status === "reserved" ? "#854d0e" :
                                                                                "#475569",
                                                            }}
                                                        >
                                                            <span
                                                                className="w-1.5 h-1.5 rounded-full"
                                                                style={{
                                                                    background:
                                                                        t.status === "available" ? "#22c55e" :
                                                                            t.status === "occupied" ? "#ef4444" :
                                                                                t.status === "reserved" ? "#eab308" :
                                                                                    "#94a3b8",
                                                                }}
                                                            />
                                                            {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {t.qr_code ? (
                                                            <span className="inline-flex items-center gap-1.5 font-mono text-xs"
                                                                style={{ color: "var(--accent)" }}>
                                                                <QrCode className="h-4 w-4" />
                                                                {t.qr_code}
                                                            </span>
                                                        ) : (
                                                            <span style={{ color: "var(--text-muted)", opacity: 0.4 }}>—</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-1.5 transition-opacity">
                                                            <ActionBtn
                                                                onClick={() => openShow(t)}
                                                                title="View"
                                                                color="var(--text-secondary)"
                                                                hoverBg="var(--bg-surface-hover)"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </ActionBtn>
                                                            <ActionBtn
                                                                onClick={() => openEdit(t)}
                                                                title="Edit"
                                                                color="var(--accent)"
                                                                hoverBg="var(--accent-light)"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </ActionBtn>
                                                            <ActionBtn
                                                                onClick={() => handleDelete(t.id)}
                                                                title="Delete"
                                                                color="#ef4444"
                                                                hoverBg="#fee2e2"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </ActionBtn>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* ── Pagination ── */}
                    {lastPage > 1 && (
                        <div className="px-6 py-4 mt-5 flex items-center justify-between rounded-2xl" style={{
                            borderTop: "1px solid var(--bg-border)",
                            background: "var(--bg-surface-hover)",
                            border: "1px solid var(--bg-border)",
                        }}>
                            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                                Page <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{page}</span> of{" "}
                                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{lastPage}</span>
                            </span>
                            <div className="flex gap-1.5">
                                <PageBtn
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </PageBtn>
                                <PageBtn
                                    onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                                    disabled={page === lastPage}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </PageBtn>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Modal ── */}
            {modalMode && (
                <TableModal
                    mode={modalMode}
                    editing={editing}
                    viewing={viewing}
                    processing={processing}
                    onClose={closeModal}
                    onSave={handleSave}
                />
            )}
        </Authenticated>
    );
}

// ── Tiny helpers ──────────────────────────────────────────────────────────────

function ActionBtn({
    children,
    onClick,
    title,
    color,
    hoverBg,
}: {
    children: React.ReactNode;
    onClick: () => void;
    title: string;
    color: string;
    hoverBg: string;
}) {
    return (
        <button
            onClick={onClick}
            title={title}
            className="p-1.5 rounded-lg transition-colors action-btn"
            style={{
                ["--btn-hover-bg" as any]: hoverBg,
                ["--btn-color" as any]: color,
                color,
            }}
        >
            {children}
        </button>
    );
}

function PageBtn({
    children,
    onClick,
    disabled,
}: {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-8 h-8 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--bg-border)",
                color: "var(--text-secondary)",
            }}
        >
            {children}
        </button>
    );
}
