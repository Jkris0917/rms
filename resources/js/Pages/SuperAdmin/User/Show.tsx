import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { User } from "@/types/user";
import { Toaster } from "sonner";

const breadcrumbs = (id: number) => [
    { label: "Dashboard", href: route("superadmin.dashboard") },
    { label: "Users", href: route("superadmin.users.index") },
    { label: "View" },
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

const DARK_ROLE_STYLES: Record<string, { bg: string; color: string }> = {
    super_admin: { bg: "#2e1065", color: "#c4b5fd" },
    manager: { bg: "#1e3a5f", color: "#93c5fd" },
    cashier: { bg: "#064e3b", color: "#6ee7b7" },
    waiter: { bg: "#451a03", color: "#fcd34d" },
    chef: { bg: "#431407", color: "#fdba74" },
    kitchen_staff: { bg: "#450a0a", color: "#fca5a5" },
    delivery_driver: { bg: "#083344", color: "#67e8f9" },
    customer: { bg: "#1e293b", color: "#94a3b8" },
};

const AVATAR_GRADIENTS = [
    "from-violet-500 to-indigo-500",
    "from-rose-500 to-pink-500",
    "from-amber-500 to-orange-500",
    "from-emerald-500 to-teal-500",
];

interface Props {
    user: User;
}

export default function ShowUser({ user }: Props) {
    const p = user.profile;
    const role = user.roles?.[0]?.name;
    const initials = p?.first_name
        ? `${p.first_name[0]}${p.last_name?.[0] ?? ""}`.toUpperCase()
        : user.username.slice(0, 2).toUpperCase();
    const fullName = p?.first_name ? `${p.first_name} ${p.last_name ?? ""}`.trim() : user.username;
    const gradient = AVATAR_GRADIENTS[user.id % AVATAR_GRADIENTS.length];

    const roleStyle = role ? ROLE_STYLES[role] : undefined;

    return (
        <Authenticated breadcrumbs={breadcrumbs(user.id)}>
            <Head title={`User — ${fullName}`} />
            <Toaster position="top-right" richColors />

            <div className="min-h-screen p-6 lg:p-10" style={{ background: "var(--bg-app)" }}>
                <div className="max-w-3xl mx-auto space-y-6">

                    {/* Profile card */}
                    <div className="rounded-2xl overflow-hidden" style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--bg-border)",
                        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
                    }}>
                        <div className="h-24 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600" />
                        <div className="px-6 pb-6">
                            <div className="-mt-12 mb-4 flex items-end justify-between">
                                <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-bold shadow-xl border-4`}
                                    style={{ borderColor: "var(--bg-surface)" }}>
                                    {initials}
                                </div>
                                <div className="flex gap-2 mb-1">
                                    <button
                                        onClick={() => router.visit(route("superadmin.users.edit", user.id))}
                                        className="px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-md active:scale-95 transition-all"
                                        style={{ background: "var(--accent)" }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => router.visit(route("superadmin.users.index"))}
                                        className="px-4 py-2 rounded-xl text-sm font-medium active:scale-95 transition-all"
                                        style={{
                                            border: "1px solid var(--bg-border)",
                                            background: "var(--bg-surface)",
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{fullName}</h1>
                            <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>@{user.username} · {user.email}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {role && roleStyle && (
                                    <span className="px-3 py-1 rounded-lg text-xs font-semibold dark-role-badge"
                                        style={{ background: roleStyle.bg, color: roleStyle.color }}>
                                        {role.replace(/_/g, " ")}
                                    </span>
                                )}
                                {p?.employment_status && (
                                    <span className="px-3 py-1 rounded-lg text-xs font-semibold"
                                        style={{
                                            background: p.employment_status === "active" ? "#dcfce7"
                                                : p.employment_status === "on_leave" ? "#fef9c3"
                                                    : "#fee2e2",
                                            color: p.employment_status === "active" ? "#166534"
                                                : p.employment_status === "on_leave" ? "#854d0e"
                                                    : "#991b1b",
                                        }}>
                                        {p.employment_status.replace(/_/g, " ")}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {p && (
                            <>
                                <InfoCard title="Personal Info" icon="👤" items={[
                                    { label: "Phone", value: p.phone },
                                    { label: "Gender", value: p.gender },
                                    { label: "Date of Birth", value: p.date_of_birth },
                                    { label: "Address", value: p.address },
                                ]} />

                                <InfoCard title="Employment" icon="💼" items={[
                                    { label: "Position", value: p.position },
                                    { label: "Employee ID", value: p.employee_id },
                                    { label: "Employment Type", value: p.employment_type?.replace(/_/g, " ") },
                                    { label: "Hire Date", value: p.hire_date },
                                ]} />

                                <InfoCard title="Schedule" icon="🕐" items={[
                                    { label: "Shift", value: p.shift },
                                    { label: "Hours", value: p.shift_start && p.shift_end ? `${p.shift_start} – ${p.shift_end}` : undefined },
                                    { label: "Work Days", value: p.work_days?.join(", ") },
                                ]} />

                                <InfoCard title="Emergency Contact" icon="🆘" items={[
                                    { label: "Name", value: p.emergency_contact_name },
                                    { label: "Phone", value: p.emergency_contact_phone },
                                    { label: "Relationship", value: p.emergency_contact_relationship },
                                ]} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

function InfoCard({ title, icon, items }: {
    title: string;
    icon: string;
    items: { label: string; value?: string | null }[];
}) {
    const hasContent = items.some(i => i.value);
    return (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)" }}>
            <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid var(--bg-border-subtle)", background: "var(--bg-surface-hover)" }}>
                <span>{icon}</span>
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{title}</h3>
            </div>
            <div className="p-5 space-y-3">
                {!hasContent && <p className="text-sm" style={{ color: "var(--text-muted)", opacity: 0.5 }}>No information provided.</p>}
                {items.map(({ label, value }) =>
                    value ? (
                        <div key={label} className="flex justify-between items-start gap-4">
                            <span className="text-xs font-medium shrink-0" style={{ color: "var(--text-muted)" }}>{label}</span>
                            <span className="text-sm text-right" style={{ color: "var(--text-secondary)" }}>{value}</span>
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}
