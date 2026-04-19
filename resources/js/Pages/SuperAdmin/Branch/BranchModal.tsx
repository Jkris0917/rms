import { Branch } from "@/types/branch";
import { useEffect, useState } from "react";

type Mode = "create" | "edit" | "show";

type Props = {
    mode: Mode;
    open: boolean;
    onClose: () => void;
    onSave?: (data: Omit<Branch, "id">) => void;
    processing?: boolean;
    branch?: Branch | null;
};

const emptyForm: Omit<Branch, "id"> = {
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    is_active: true,
    open_time: "09:00",
    close_time: "17:00",
};

export default function BranchModal({ mode, open, onClose, onSave, processing, branch }: Props) {
    const [formData, setFormData] = useState<Omit<Branch, "id">>(emptyForm);

    useEffect(() => {
        if ((mode === "edit" || mode === "show") && branch) {
            setFormData({
                name: branch.name,
                address: branch.address,
                city: branch.city,
                phone: branch.phone,
                email: branch.email,
                is_active: branch.is_active,
                open_time: branch.open_time,
                close_time: branch.close_time,
            });
        } else if (mode === "create") {
            setFormData(emptyForm);
        }
    }, [mode, branch, open]);

    if (!open) return null;

    const isReadOnly = mode === "show";

    const title = {
        create: "Add New Branch",
        edit: "Edit Branch",
        show: "Branch Details",
    }[mode];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave?.(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit}>
                    <div className="px-6 py-5 max-h-[70vh] overflow-y-auto space-y-4">
                        {/* Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Branch Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    readOnly={isReadOnly}
                                    required={!isReadOnly}
                                    placeholder="e.g. Downtown Branch"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 read-only:bg-gray-50 read-only:cursor-default transition"
                                />
                            </div>

                            {/* Address */}
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    readOnly={isReadOnly}
                                    required={!isReadOnly}
                                    placeholder="Street address"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent read-only:bg-gray-50 read-only:cursor-default transition"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    readOnly={isReadOnly}
                                    required={!isReadOnly}
                                    placeholder="City"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent read-only:bg-gray-50 read-only:cursor-default transition"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    readOnly={isReadOnly}
                                    required={!isReadOnly}
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent read-only:bg-gray-50 read-only:cursor-default transition"
                                />
                            </div>

                            {/* Email */}
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    readOnly={isReadOnly}
                                    required={!isReadOnly}
                                    placeholder="branch@example.com"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent read-only:bg-gray-50 read-only:cursor-default transition"
                                />
                            </div>

                            {/* Open Time */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Open Time
                                </label>
                                <input
                                    type="time"
                                    name="open_time"
                                    value={formData.open_time}
                                    onChange={handleChange}
                                    readOnly={isReadOnly}
                                    required={!isReadOnly}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent read-only:bg-gray-50 read-only:cursor-default transition"
                                />
                            </div>

                            {/* Close Time */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Close Time
                                </label>
                                <input
                                    type="time"
                                    name="close_time"
                                    value={formData.close_time}
                                    onChange={handleChange}
                                    readOnly={isReadOnly}
                                    required={!isReadOnly}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent read-only:bg-gray-50 read-only:cursor-default transition"
                                />
                            </div>

                            {/* Is Active */}
                            <div className="col-span-2">
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="is_active"
                                            checked={formData.is_active}
                                            onChange={handleChange}
                                            disabled={isReadOnly}
                                            className="sr-only peer"
                                        />
                                        <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors peer-disabled:opacity-60" />
                                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                                    </div>
                                    <span className="text-sm text-gray-700 font-medium">
                                        {formData.is_active ? "Active" : "Inactive"}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                        >
                            {isReadOnly ? "Close" : "Cancel"}
                        </button>
                        {!isReadOnly && (
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2"
                            >
                                {processing && (
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                )}
                                {mode === "create" ? "Create Branch" : "Save Changes"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
