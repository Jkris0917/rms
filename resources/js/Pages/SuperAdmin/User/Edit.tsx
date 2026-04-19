import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { User } from "@/types/user";

const ROLES = [
    { value: "manager", label: "Manager" },
    { value: "cashier", label: "Cashier" },
    { value: "waiter", label: "Waiter" },
    { value: "chef", label: "Chef" },
    { value: "kitchen_staff", label: "Kitchen Staff" },
    { value: "delivery_driver", label: "Delivery Driver" },
    { value: "customer", label: "Customer" },
];

interface Props {
    user: User;
}

export default function EditUser({ user }: Props) {
    const p = user.profile;
    const [processing, setProcessing] = useState(false);
    const [form, setForm] = useState({
        username: user.username ?? "",
        email: user.email ?? "",
        role: user.roles?.[0]?.name ?? "",
        first_name: p?.first_name ?? "",
        last_name: p?.last_name ?? "",
        middle_name: p?.middle_name ?? "",
        phone: p?.phone ?? "",
        gender: p?.gender ?? "",
        position: p?.position ?? "",
        employment_type: p?.employment_type ?? "",
        employment_status: p?.employment_status ?? "active",
        shift: p?.shift ?? "",
        address: p?.address ?? "",
        emergency_contact_name: p?.emergency_contact_name ?? "",
        emergency_contact_phone: p?.emergency_contact_phone ?? "",
        emergency_contact_relationship: p?.emergency_contact_relationship ?? "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const breadcrumbs = [
        { label: "Dashboard", href: route("superadmin.dashboard") },
        { label: "Users", href: route("superadmin.users.index") },
        { label: "Edit" },
    ];

    const set = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            const response = await fetch(`/api/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? "",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    setErrors(data.errors);
                    toast.error("Please fix the errors below.");
                } else {
                    throw new Error(data.message ?? "Something went wrong.");
                }
                return;
            }

            toast.success("User updated successfully!");
            setTimeout(() => router.visit(route("superadmin.users.show", user.id)), 800);
        } catch (err: any) {
            toast.error(err.message ?? "Failed to update user.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Authenticated breadcrumbs={breadcrumbs}>
            <Head title={`Edit — ${form.first_name || user.username}`} />
            <Toaster position="top-right" richColors />

            <div className="min-h-screen p-6 lg:p-10" style={{ background: "var(--bg-app)" }}>
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: "var(--accent)" }}>Administration</p>
                        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Edit User</h1>
                        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                            Update the details for{" "}
                            <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{form.first_name || user.username}</span>.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Account */}
                        <Section title="Account Information" icon="🔐">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Username" error={errors.username}>
                                    <input type="text" value={form.username} onChange={e => set("username", e.target.value)}
                                        className={inputCls(errors.username)} />
                                </Field>
                                <Field label="Email" error={errors.email}>
                                    <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                                        className={inputCls(errors.email)} />
                                </Field>
                            </div>
                            <Field label="Role" error={errors.role} className="mt-4">
                                <select value={form.role} onChange={e => set("role", e.target.value)} className={inputCls(errors.role)}>
                                    <option value="">Select a role…</option>
                                    {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                                </select>
                            </Field>
                        </Section>

                        {/* Personal */}
                        <Section title="Personal Information" icon="👤">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Field label="First Name" error={errors.first_name}>
                                    <input type="text" value={form.first_name} onChange={e => set("first_name", e.target.value)}
                                        className={inputCls(errors.first_name)} />
                                </Field>
                                <Field label="Middle Name" error={errors.middle_name}>
                                    <input type="text" value={form.middle_name} onChange={e => set("middle_name", e.target.value)}
                                        className={inputCls(errors.middle_name)} />
                                </Field>
                                <Field label="Last Name" error={errors.last_name}>
                                    <input type="text" value={form.last_name} onChange={e => set("last_name", e.target.value)}
                                        className={inputCls(errors.last_name)} />
                                </Field>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <Field label="Phone" error={errors.phone}>
                                    <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                                        className={inputCls(errors.phone)} />
                                </Field>
                                <Field label="Gender" error={errors.gender}>
                                    <select value={form.gender} onChange={e => set("gender", e.target.value)} className={inputCls(errors.gender)}>
                                        <option value="">Select…</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </Field>
                                <Field label="Address" error={errors.address} className="sm:col-span-2">
                                    <input type="text" value={form.address} onChange={e => set("address", e.target.value)}
                                        className={inputCls(errors.address)} placeholder="Street, City, Province" />
                                </Field>
                            </div>
                        </Section>

                        {/* Employment */}
                        {form.role && form.role !== "customer" && (
                            <Section title="Employment Details" icon="💼">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Position" error={errors.position}>
                                        <input type="text" value={form.position} onChange={e => set("position", e.target.value)}
                                            className={inputCls(errors.position)} />
                                    </Field>
                                    <Field label="Employment Type" error={errors.employment_type}>
                                        <select value={form.employment_type} onChange={e => set("employment_type", e.target.value)} className={inputCls(errors.employment_type)}>
                                            <option value="">Select…</option>
                                            <option value="full_time">Full Time</option>
                                            <option value="part_time">Part Time</option>
                                            <option value="contractual">Contractual</option>
                                        </select>
                                    </Field>
                                    <Field label="Employment Status" error={errors.employment_status}>
                                        <select value={form.employment_status} onChange={e => set("employment_status", e.target.value)} className={inputCls(errors.employment_status)}>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="on_leave">On Leave</option>
                                        </select>
                                    </Field>
                                    <Field label="Shift" error={errors.shift}>
                                        <select value={form.shift} onChange={e => set("shift", e.target.value)} className={inputCls(errors.shift)}>
                                            <option value="">Select…</option>
                                            <option value="morning">Morning</option>
                                            <option value="afternoon">Afternoon</option>
                                            <option value="night">Night</option>
                                        </select>
                                    </Field>
                                </div>
                            </Section>
                        )}

                        {/* Emergency Contact */}
                        <Section title="Emergency Contact" icon="🆘">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Field label="Name" error={errors.emergency_contact_name}>
                                    <input type="text" value={form.emergency_contact_name} onChange={e => set("emergency_contact_name", e.target.value)}
                                        className={inputCls(errors.emergency_contact_name)} />
                                </Field>
                                <Field label="Phone" error={errors.emergency_contact_phone}>
                                    <input type="tel" value={form.emergency_contact_phone} onChange={e => set("emergency_contact_phone", e.target.value)}
                                        className={inputCls(errors.emergency_contact_phone)} />
                                </Field>
                                <Field label="Relationship" error={errors.emergency_contact_relationship}>
                                    <input type="text" value={form.emergency_contact_relationship} onChange={e => set("emergency_contact_relationship", e.target.value)}
                                        className={inputCls(errors.emergency_contact_relationship)} />
                                </Field>
                            </div>
                        </Section>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => router.visit(route("superadmin.users.show", user.id))}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium active:scale-95 transition-all shadow-sm"
                                style={{
                                    border: "1px solid var(--bg-border)",
                                    background: "var(--bg-surface)",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg active:scale-95 transition-all disabled:opacity-60"
                                style={{ background: "var(--accent)", color: "#fff" }}
                            >
                                {processing && <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />}
                                {processing ? "Saving…" : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
    return (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)" }}>
            <div className="px-6 py-4 flex items-center gap-2.5" style={{ borderBottom: "1px solid var(--bg-border-subtle)", background: "var(--bg-surface-hover)" }}>
                <span className="text-lg">{icon}</span>
                <h2 className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{title}</h2>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

function Field({ label, error, children, className = "" }: {
    label: string; error?: string; children: React.ReactNode; className?: string;
}) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</label>
            {children}
            {error && <p className="text-xs text-rose-500">{error}</p>}
        </div>
    );
}

const inputCls = (error?: string) =>
    `w-full px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 transition themed-input ${error ? "border-rose-300 focus:ring-rose-200" : "focus:ring-indigo-200"}`;
