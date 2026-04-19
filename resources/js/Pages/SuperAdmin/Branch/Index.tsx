import useBranch from "@/hooks/useBranch";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Branch } from "@/types/branch";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import BranchModal from "./BranchModal";

const breadcrumbs = [
    { label: "Dashboard", href: route("superadmin.dashboard") },
    { label: "Branches" },
];

type ModalState =
    | { open: false }
    | { open: true; mode: "create" }
    | { open: true; mode: "edit"; branch: Branch }
    | { open: true; mode: "show"; branch: Branch };

export default function BranchesIndex() {
    const {
        branch,
        editing,
        setEditing,
        handleDelete,
        handleSave,
        lastPage,
        loading,
        page,
        processing,
        search,
        setPage,
        setSearch,
    } = useBranch();

    const [modal, setModal] = useState<ModalState>({ open: false });

    const openCreate = () => setModal({ open: true, mode: "create" });
    const openEdit = (b: Branch) => {
        setEditing(b);
        setModal({ open: true, mode: "edit", branch: b });
    };
    const openShow = (b: Branch) => setModal({ open: true, mode: "show", branch: b });
    const closeModal = () => {
        setModal({ open: false });
        setEditing(null);
    };

    const handleModalSave = async (data: Omit<Branch, "id">) => {
        await handleSave(data);
        closeModal();
    };

    return (
        <Authenticated breadcrumbs={breadcrumbs}>
            <Head title="Branches" />

            <div className="min-h-screen p-6 lg:p-10" style={{ background: "var(--bg-app)" }}>
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: "var(--accent)" }}>
                                Locations
                            </p>
                            <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                                Branches
                            </h1>
                            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                                Manage all your restaurant locations
                            </p>
                        </div>
                        <button
                            onClick={openCreate}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg active:scale-95 transition-all duration-150"
                            style={{ background: "var(--accent)" }}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add Branch
                        </button>
                    </div>

                    {/* Search */}
                    <form onSubmit={(e) => { e.preventDefault(); setPage(1); }} className="mb-6 flex gap-3 max-w-md">
                        <div className="relative flex-1">
                            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                placeholder="Search branches..."
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

                    {/* Table Card */}
                    <div className="rounded-2xl overflow-hidden" style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--bg-border)",
                        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.06)",
                    }}>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr style={{ borderBottom: "1px solid var(--bg-border)", background: "var(--bg-surface-hover)" }}>
                                        <th className="px-6 py-4 text-[11px] font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Branch</th>
                                        <th className="px-6 py-4 text-[11px] font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>City</th>
                                        <th className="px-6 py-4 text-[11px] font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Contact</th>
                                        <th className="px-6 py-4 text-[11px] font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Hours</th>
                                        <th className="px-6 py-4 text-[11px] font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Status</th>
                                        <th className="px-6 py-4 text-[11px] font-bold tracking-widest uppercase text-right" style={{ color: "var(--text-muted)" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full border-2 border-t-indigo-600 animate-spin" style={{ borderColor: "var(--bg-border)", borderTopColor: "var(--accent)" }} />
                                                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading branches...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : branch.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center gap-3" style={{ color: "var(--text-muted)" }}>
                                                    <svg className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                                                    </svg>
                                                    <p className="text-sm">No branches found.</p>
                                                    <button
                                                        onClick={openCreate}
                                                        className="mt-2 text-sm underline underline-offset-2"
                                                        style={{ color: "var(--accent)" }}
                                                    >
                                                        Create your first branch
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        branch.map((b) => (
                                            <tr
                                                key={b.id}
                                                className="group transition-colors table-row-hover"
                                                style={{ borderTop: "1px solid var(--bg-border-subtle)" }}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                                            {b.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{b.name}</p>
                                                            <p className="text-xs mt-0.5 max-w-[200px] truncate" style={{ color: "var(--text-muted)" }}>{b.address}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>{b.city}</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{b.phone}</div>
                                                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{b.email}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                                                    {(() => {
                                                        const formatTo12Hour = (time: string) => {
                                                            if (!time) return "--";
                                                            const [hours, minutes] = time.split(":");
                                                            let hour = parseInt(hours);
                                                            const ampm = hour >= 12 ? "PM" : "AM";
                                                            hour = hour % 12 || 12;
                                                            return `${hour}:${minutes} ${ampm}`;
                                                        };
                                                        return `${formatTo12Hour(b.open_time)} – ${formatTo12Hour(b.close_time)}`;
                                                    })()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                                                        style={{
                                                            background: b.is_active ? "#dcfce7" : "#f1f5f9",
                                                            color: b.is_active ? "#166534" : "#475569",
                                                        }}
                                                    >
                                                        <span className={`w-1.5 h-1.5 rounded-full ${b.is_active ? "bg-emerald-500" : "bg-slate-400"}`} />
                                                        {b.is_active ? "Active" : "Inactive"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-1.5 transition-opacity">
                                                        <ActionBtn
                                                            onClick={() => openShow(b)}
                                                            title="View"
                                                            hoverBg="var(--bg-surface-hover)"
                                                            color="var(--text-secondary)"
                                                            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />}
                                                        />
                                                        <ActionBtn
                                                            onClick={() => openEdit(b)}
                                                            title="Edit"
                                                            hoverBg="var(--accent-light)"
                                                            color="var(--accent)"
                                                            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />}
                                                        />
                                                        <ActionBtn
                                                            onClick={() => handleDelete(b.id)}
                                                            title="Delete"
                                                            hoverBg="#fee2e2"
                                                            color="#ef4444"
                                                            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {lastPage > 1 && (
                            <div className="px-6 py-4 flex items-center justify-between" style={{
                                borderTop: "1px solid var(--bg-border)",
                                background: "var(--bg-surface-hover)"
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
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </PageBtn>
                                    <PageBtn
                                        onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                                        disabled={page === lastPage}
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </PageBtn>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modal.open && (
                <BranchModal
                    open={modal.open}
                    mode={modal.mode}
                    branch={modal.mode !== "create" ? modal.branch : null}
                    onClose={closeModal}
                    onSave={handleModalSave}
                    processing={processing}
                />
            )}
        </Authenticated>
    );
}

// Helper Components
function ActionBtn({
    onClick,
    title,
    hoverBg,
    color,
    icon,
}: {
    onClick: () => void;
    title: string;
    hoverBg: string;
    color: string;
    icon: React.ReactNode;
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
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {icon}
            </svg>
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
