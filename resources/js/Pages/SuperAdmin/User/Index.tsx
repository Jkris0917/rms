import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import { Toaster } from "sonner";
import useUser from "@/hooks/useUser";
import { User } from "@/types/user";

const breadcrumbs = [
    { label: "Dashboard", href: route("superadmin.dashboard") },
    { label: "Users" },
];

const ROLE_STYLES: Record<string, { bg: string; color: string }> = {
    super_admin: { bg: "#ede9fe", color: "#6d28d9" },
    manager: { bg: "#dbeafe", color: "#1d4ed8" },
    cashier: { bg: "#d1fae5", color: "#065f46" },
    waiter: { bg: "#fef3c7", color: "#92400e" },
    chef: { bg: "#ffedd5", color: "#9a3412" },
    kitchen_staff: { bg: "#fee2e2", color: "#991b1b" },
    delivery_driver: { bg: "#cffafe", color: "#155e75" },
    customer: { bg: "#f1f5f9", color: "#475569" },
};

// Dark-mode overrides applied via CSS class
const ROLE_STYLES_DARK: Record<string, { bg: string; color: string }> = {
    super_admin: { bg: "#2e1065", color: "#c4b5fd" },
    manager: { bg: "#1e3a5f", color: "#93c5fd" },
    cashier: { bg: "#064e3b", color: "#6ee7b7" },
    waiter: { bg: "#451a03", color: "#fcd34d" },
    chef: { bg: "#431407", color: "#fdba74" },
    kitchen_staff: { bg: "#450a0a", color: "#fca5a5" },
    delivery_driver: { bg: "#083344", color: "#67e8f9" },
    customer: { bg: "#1e293b", color: "#94a3b8" },
};

function getInitials(user: User): string {
    const p = user.profile;
    if (p?.first_name && p?.last_name) return `${p.first_name[0]}${p.last_name[0]}`.toUpperCase();
    return user.username.slice(0, 2).toUpperCase();
}

function getDisplayName(user: User): string {
    const p = user.profile;
    if (p?.first_name) return `${p.first_name} ${p.last_name ?? ""}`.trim();
    return user.username;
}

const AVATAR_COLORS = [
    "from-violet-500 to-indigo-500",
    "from-rose-500 to-pink-500",
    "from-amber-500 to-orange-500",
    "from-emerald-500 to-teal-500",
    "from-cyan-500 to-blue-500",
];

function RoleBadge({ role }: { role: string }) {
    const light = ROLE_STYLES[role] ?? { bg: "#f1f5f9", color: "#475569" };
    const dark = ROLE_STYLES_DARK[role] ?? { bg: "#1e293b", color: "#94a3b8" };
    return (
        <span
            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold role-badge"
            style={{
                ["--role-bg" as any]: light.bg,
                ["--role-color" as any]: light.color,
                ["--role-bg-dark" as any]: dark.bg,
                ["--role-color-dark" as any]: dark.color,
                background: "var(--role-bg)",
                color: "var(--role-color)",
            }}
        >
            {role.replace(/_/g, " ")}
        </span>
    );
}

export default function IndexUser() {
    const {
        users,
        search,
        setSearch,
        processing,
        fetchUsers,
        createUser,
        showUser,
        editUser,
        deleteUser,
    } = useUser();

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchUsers(1);
    };

    return (
        <Authenticated breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <Toaster position="top-right" richColors />

            <div className="min-h-screen p-6 lg:p-10" style={{ background: "var(--bg-app)" }}>
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: "var(--accent)" }}>Administration</p>
                        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>User Management</h1>
                        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                            {users ? `${users.total} total members` : "Loading..."}
                        </p>
                    </div>

                    <button
                        onClick={createUser}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg active:scale-95 transition-all duration-150"
                        style={{ background: "var(--accent)" }}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add User
                    </button>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="mb-6 flex gap-3 max-w-md">
                    <div className="relative flex-1">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name or email…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
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
                                    {["User", "Role", "Status", "Position", "Actions"].map((h, i) => (
                                        <th key={h} className={`px-6 py-4 text-[11px] font-bold tracking-widest uppercase ${i === 4 ? "text-right" : ""}`}
                                            style={{ color: "var(--text-muted)" }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {processing && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-8 h-8 rounded-full border-2 border-t-indigo-600 animate-spin" style={{ borderColor: "var(--bg-border)", borderTopColor: "var(--accent)" }} />
                                                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading users…</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {!processing && users?.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center">
                                            <p className="text-sm" style={{ color: "var(--text-muted)" }}>No users found.</p>
                                        </td>
                                    </tr>
                                )}

                                {!processing && users?.data.map((user, i) => {
                                    const role = user.roles?.[0]?.name;
                                    const status = user.profile?.employment_status;
                                    const gradientClass = AVATAR_COLORS[i % AVATAR_COLORS.length];

                                    return (
                                        <tr
                                            key={user.id}
                                            className="group transition-colors table-row-hover"
                                            style={{ borderTop: "1px solid var(--bg-border-subtle)" }}
                                        >
                                            {/* User */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3.5">
                                                    <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md`}>
                                                        {getInitials(user)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm leading-tight" style={{ color: "var(--text-primary)" }}>{getDisplayName(user)}</p>
                                                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role */}
                                            <td className="px-6 py-4">
                                                {role ? <RoleBadge role={role} /> : <span style={{ color: "var(--text-muted)", opacity: 0.4 }}>—</span>}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                {status ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                                                        style={{
                                                            background: status === "active" ? "#dcfce7"
                                                                : status === "on_leave" ? "#fef9c3"
                                                                    : "#fee2e2",
                                                            color: status === "active" ? "#166534"
                                                                : status === "on_leave" ? "#854d0e"
                                                                    : "#991b1b",
                                                        }}>
                                                        <span className="w-1.5 h-1.5 rounded-full"
                                                            style={{
                                                                background: status === "active" ? "#22c55e"
                                                                    : status === "on_leave" ? "#eab308"
                                                                        : "#f87171",
                                                            }} />
                                                        {status.replace(/_/g, " ")}
                                                    </span>
                                                ) : (
                                                    <span style={{ color: "var(--text-muted)", opacity: 0.4 }}>—</span>
                                                )}
                                            </td>

                                            {/* Position */}
                                            <td className="px-6 py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                                                {user.profile?.position ?? <span style={{ opacity: 0.3 }}>—</span>}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1.5 transition-opacity">
                                                    <ActionBtn
                                                        onClick={() => showUser(user)}
                                                        title="View"
                                                        hoverBg="var(--bg-surface-hover)"
                                                        color="var(--text-secondary)"
                                                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />}
                                                    />
                                                    <ActionBtn
                                                        onClick={() => editUser(user)}
                                                        title="Edit"
                                                        hoverBg="var(--accent-light)"
                                                        color="var(--accent)"
                                                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />}
                                                    />
                                                    <ActionBtn
                                                        onClick={() => deleteUser(user)}
                                                        title="Delete"
                                                        hoverBg="#fee2e2"
                                                        color="#ef4444"
                                                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users && users.last_page > 1 && (
                        <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: "1px solid var(--bg-border)", background: "var(--bg-surface-hover)" }}>
                            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                                Showing{" "}
                                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{users.from}–{users.to}</span>
                                {" "}of{" "}
                                <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{users.total}</span>
                            </span>
                            <div className="flex gap-1.5">
                                {Array.from({ length: users.last_page }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => fetchUsers(page)}
                                        className="w-8 h-8 rounded-lg text-sm font-medium transition-all"
                                        style={page === users.current_page
                                            ? { background: "var(--accent)", color: "#fff" }
                                            : { background: "var(--bg-surface)", border: "1px solid var(--bg-border)", color: "var(--text-secondary)" }
                                        }
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}

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
