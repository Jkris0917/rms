import { Table } from "@/types/table";
import { useEffect, useRef, useState } from "react";
import {
    X,
    QrCode,
    Store,
    Hash,
    Users,
    MapPin,
    CheckCircle2,
    Loader2,
    RefreshCw,
    Download,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";

type ModalMode = "create" | "edit" | "show";

type Props = {
    mode: ModalMode;
    editing: Table | null;
    viewing: Table | null;
    processing: boolean;
    onClose: () => void;
    onSave: (data: Omit<Table, "id">) => Promise<void>;
};

type Branch = {
    id: number;
    name: string;
    address: string;
    city: string;
    phone?: string;
    email?: string;
};

const STATUS_OPTIONS = ["available", "occupied", "reserved", "maintenance"] as const;
type Status = (typeof STATUS_OPTIONS)[number];

const statusColors: Record<Status, string> = {
    available: "bg-emerald-500",
    occupied: "bg-rose-500",
    reserved: "bg-amber-400",
    maintenance: "bg-slate-400",
};

const defaultForm: Omit<Table, "id"> = {
    branch_id: 0,
    table_number: 0,
    capacity: 2,
    status: "available",
    location: "",
    qr_code: "",
};

/** Generate a random alphanumeric code, e.g. TBL-A3F9X2-001 */
function generateRandomCode(tableNumber: number): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const random = Array.from({ length: 6 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
    ).join("");
    const padded = String(tableNumber).padStart(3, "0");
    return `TBL-${random}-${padded}`;
}

export default function TableModal({
    mode,
    editing,
    viewing,
    processing,
    onClose,
    onSave,
}: Props) {
    const isShow = mode === "show";
    const isEdit = mode === "edit";
    const isCreate = mode === "create";

    const [form, setForm] = useState<Omit<Table, "id">>(defaultForm);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loadingBranches, setLoadingBranches] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const qrContainerRef = useRef<HTMLDivElement>(null);

    // Fetch branches from API
    useEffect(() => {
        const fetchBranches = async () => {
            setLoadingBranches(true);
            try {
                const response = await axios.get("/api/branches/active");
                const branchesData = response.data.data || response.data;
                setBranches(branchesData);

                if (isCreate && branchesData.length > 0 && form.branch_id === 0) {
                    setForm(prev => ({ ...prev, branch_id: branchesData[0].id }));
                }
            } catch (err) {
                console.error("Failed to fetch branches:", err);
                toast.error("Failed to load branches");
            } finally {
                setLoadingBranches(false);
            }
        };

        fetchBranches();
    }, []);

    useEffect(() => {
        if (isEdit && editing) {
            const { id, ...rest } = editing;
            setForm(rest);
        } else if (isShow && viewing) {
            const { id, ...rest } = viewing;
            setForm(rest);
        } else if (isCreate) {
            setForm(defaultForm);
            if (branches.length > 0) {
                setForm(prev => ({ ...prev, branch_id: branches[0].id }));
            }
        }
    }, [editing, viewing, mode, branches]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) onClose();
    };

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    /** Generate a fresh random code and store it in form.qr_code */
    const generateQRCode = () => {
        if (!form.table_number || form.table_number === 0) {
            toast.error("Please enter table number first");
            return;
        }
        const code = generateRandomCode(form.table_number);
        setForm(prev => ({ ...prev, qr_code: code }));
        toast.success("QR code generated! Customers can scan this at the table.");
    };

    /** Auto-generate a code when table number is set and no code exists yet */
    const handleTableNumberBlur = () => {
        if (!form.qr_code && form.table_number > 0) {
            const code = generateRandomCode(form.table_number);
            setForm(prev => ({ ...prev, qr_code: code }));
        }
    };

    /** Download QR code as PNG */
    const downloadQRCode = () => {
        const canvas = qrContainerRef.current?.querySelector("canvas");
        if (!canvas) {
            toast.error("No QR code to download");
            return;
        }
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `table_${form.table_number}_${form.qr_code}.png`;
        link.href = url;
        link.click();
        toast.success("QR code downloaded");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isShow) return;

        // Auto-generate code if still missing at submit time
        const finalForm = { ...form };
        if (!finalForm.qr_code && finalForm.table_number > 0) {
            finalForm.qr_code = generateRandomCode(finalForm.table_number);
            setForm(finalForm);
        }

        await onSave(finalForm);
        onClose();
    };

    const set = <K extends keyof typeof form>(key: K, val: (typeof form)[K]) =>
        setForm(prev => ({ ...prev, [key]: val }));

    const titles: Record<ModalMode, string> = {
        create: "New Table",
        edit: "Edit Table",
        show: `Table ${form.table_number}`,
    };

    const getBranchName = (branchId: number) => {
        const branch = branches.find(b => b.id === branchId);
        return branch ? `${branch.name} (${branch.city})` : `Branch #${branchId}`;
    };

    const subtitles: Record<ModalMode, string> = {
        create: "Add a new dining table to your floor.",
        edit: `Updating table #${editing?.id}`,
        show: `${getBranchName(form.branch_id)} · ${form.location || "No location set"}`,
    };

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
        >
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 shadow-2xl animate-slide-up overflow-hidden">

                {/* Accent stripe */}
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />

                {/* Header */}
                <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
                            {titles[mode]}
                        </h2>
                        <p className="mt-0.5 text-xs text-slate-400">{subtitles[mode]}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

                    {/* Show mode: Status badge */}
                    {isShow && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                            <span
                                className={`h-2.5 w-2.5 rounded-full ${statusColors[form.status as Status] ?? "bg-slate-400"}`}
                            />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 capitalize">
                                {form.status}
                            </span>
                        </div>
                    )}

                    {/* Two-column grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <Field icon={<Store className="h-4 w-4" />} label="Branch">
                            {isShow ? (
                                <ReadValue>{getBranchName(form.branch_id)}</ReadValue>
                            ) : (
                                <select
                                    required
                                    value={form.branch_id || ""}
                                    onChange={e => set("branch_id", Number(e.target.value))}
                                    className={inputCls}
                                    disabled={loadingBranches}
                                >
                                    <option value="" disabled>
                                        {loadingBranches ? "Loading branches..." : "Select branch"}
                                    </option>
                                    {branches.map(branch => (
                                        <option key={branch.id} value={branch.id}>
                                            {branch.name} - {branch.city}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </Field>

                        <Field icon={<Hash className="h-4 w-4" />} label="Table Number">
                            {isShow ? (
                                <ReadValue>{form.table_number}</ReadValue>
                            ) : (
                                <input
                                    type="number"
                                    required
                                    min={1}
                                    value={form.table_number || ""}
                                    onChange={e => set("table_number", Number(e.target.value))}
                                    onBlur={handleTableNumberBlur}
                                    className={inputCls}
                                    placeholder="12"
                                />
                            )}
                        </Field>

                        <Field icon={<Users className="h-4 w-4" />} label="Capacity">
                            {isShow ? (
                                <ReadValue>{form.capacity} seats</ReadValue>
                            ) : (
                                <input
                                    type="number"
                                    required
                                    min={1}
                                    max={50}
                                    value={form.capacity || ""}
                                    onChange={e => set("capacity", Number(e.target.value))}
                                    className={inputCls}
                                    placeholder="4"
                                />
                            )}
                        </Field>

                        <Field icon={<MapPin className="h-4 w-4" />} label="Location">
                            {isShow ? (
                                <ReadValue>{form.location || "—"}</ReadValue>
                            ) : (
                                <input
                                    type="text"
                                    value={form.location}
                                    onChange={e => set("location", e.target.value)}
                                    className={inputCls}
                                    placeholder="Indoor / Patio / VIP Room..."
                                />
                            )}
                        </Field>
                    </div>

                    {/* Status picker (edit/create only) */}
                    {!isShow && (
                        <div>
                            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                                Status
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {STATUS_OPTIONS.map(s => (
                                    <button
                                        type="button"
                                        key={s}
                                        onClick={() => set("status", s)}
                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-all duration-150 ${form.status === s
                                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                                            : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                                            }`}
                                    >
                                        <span className={`h-1.5 w-1.5 rounded-full ${statusColors[s]}`} />
                                        <span className="capitalize">{s}</span>
                                        {form.status === s && (
                                            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* QR Code Section */}
                    <div>
                        <label className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                            <div className="flex items-center gap-1.5">
                                <QrCode className="h-4 w-4 text-slate-400" />
                                Table QR Code
                            </div>
                            {!isShow && (
                                <button
                                    type="button"
                                    onClick={generateQRCode}
                                    className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                                >
                                    <RefreshCw className="h-3 w-3" />
                                    {form.qr_code ? "Regenerate" : "Generate QR"}
                                </button>
                            )}
                        </label>

                        {form.qr_code ? (
                            <div className="space-y-3">
                                {/* QR canvas */}
                                <div
                                    ref={qrContainerRef}
                                    className="flex flex-col items-center justify-center gap-3 p-5 bg-white rounded-xl border border-slate-200 dark:border-slate-700"
                                >
                                    <QRCodeCanvas
                                        value={form.qr_code}
                                        size={180}
                                        level="H"
                                        includeMargin={false}
                                        bgColor="#FFFFFF"
                                        fgColor="#1E1E2E"
                                    />
                                    {/* Code label beneath the QR */}
                                    <span className="font-mono text-sm font-semibold tracking-widest text-slate-700 dark:text-slate-200 select-all">
                                        {form.qr_code}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={downloadQRCode}
                                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                                    >
                                        <Download className="h-3.5 w-3.5" />
                                        Download QR
                                    </button>
                                </div>

                                {/* Info strip */}
                                <div className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 p-2.5 rounded-lg space-y-0.5">
                                    <p>✓ This code is unique to this table. Print and place it on the table for customers to scan.</p>
                                    <p className="text-slate-400">
                                        Table #{form.table_number} · Branch ID: {form.branch_id}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            /* No code yet — placeholder */
                            <div className="flex flex-col items-center justify-center gap-2 py-8 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 text-slate-400">
                                <QrCode className="h-10 w-10 opacity-30" />
                                <p className="text-xs">
                                    {!isShow
                                        ? "Enter a table number, then click 'Generate QR' above."
                                        : "No QR code assigned to this table."}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {isShow ? "Close" : "Cancel"}
                        </button>
                        {!isShow && (
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                            >
                                {processing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                {isCreate ? "Create Table" : "Save Changes"}
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(12px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in { animation: fade-in 0.15s ease-out both; }
                .animate-slide-up { animation: slide-up 0.2s ease-out both; }
            `}</style>
        </div>
    );
}

// Helper components
const inputCls =
    "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors";

function Field({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                <span className="text-slate-400">{icon}</span>
                {label}
            </label>
            {children}
        </div>
    );
}

function ReadValue({ children }: { children: React.ReactNode }) {
    return (
        <p className="rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
            {children}
        </p>
    );
}
