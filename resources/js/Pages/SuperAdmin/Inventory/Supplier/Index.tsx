import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import useSupplier from "@/hooks/useSupplier";
import SupplierModal from "./SupplierModal";
import { PencilIcon, PlusIcon, TrashIcon, Search, Building2, ChevronLeft, ChevronRight, User, Phone, Mail } from "lucide-react";

const breadcrumbs = [
    { label: 'Dashboard', href: route('superadmin.dashboard') },
    { label: 'Suppliers' },
];

export default function SupplierIndex() {
    const {
        suppliers,
        editing,
        search,
        open,
        processing,
        page,
        lastPage,
        loading,
        setEditing,
        setSearch,
        setOpen,
        fetchSuppliers,
        handleSave,
        handleDelete
    } = useSupplier();

    const handleEdit = (supplier: any) => { setEditing(supplier); setOpen(true); };
    const handleAdd = () => { setEditing(null); setOpen(true); };
    const handlePageChange = (newPage: number) => fetchSuppliers(newPage);

    const getInitials = (name: string) =>
        name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

    const AVATAR_COLORS = [
        'from-emerald-500 to-teal-500', 'from-blue-500 to-cyan-500',
        'from-purple-500 to-pink-500', 'from-orange-500 to-amber-500',
        'from-red-500 to-rose-500', 'from-indigo-500 to-violet-500',
    ];

    const getAvatarColor = (id: number) => AVATAR_COLORS[id % AVATAR_COLORS.length];

    return (
        <Authenticated breadcrumbs={breadcrumbs}>
            <Head title="Suppliers" />

            <style>{`
                @keyframes row-in {
                    from { opacity: 0; transform: translateX(-8px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes sup-shimmer {
                    0% { background-position: -600px 0; }
                    100% { background-position: 600px 0; }
                }
                .sup-table-row {
                    animation: row-in 0.28s cubic-bezier(0.16,1,0.3,1) both;
                    border-bottom: 1px solid var(--bg-border);
                    transition: background 0.15s;
                }
                .sup-table-row:last-child { border-bottom: none; }
                .sup-table-row:hover .sup-row-actions { opacity: 1; }
                .sup-row-actions { opacity: 0; transition: opacity 0.18s; display: flex; gap: 5px; align-items: center; }
                .sup-action-btn {
                    width: 30px; height: 30px; border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    border: 1.5px solid var(--bg-border); background: var(--bg-surface);
                    cursor: pointer; transition: all 0.15s;
                }
                .sup-action-btn:hover.edit { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); color: var(--accent); }
                .sup-action-btn:hover.del { border-color: #ef4444; background: rgba(239,68,68,0.08); color: #ef4444; }
                .sup-action-btn:active { transform: scale(0.9); }
                .sup-action-btn:disabled { opacity: 0.35; cursor: not-allowed; }
                .sup-search-input {
                    width: 100%; padding: 9px 14px 9px 36px;
                    border-radius: 10px; font-size: 13.5px;
                    border: 1.5px solid var(--bg-border);
                    background: var(--bg-surface);
                    color: var(--text-primary); outline: none;
                    transition: border-color 0.18s, box-shadow 0.18s;
                    font-family: inherit; box-sizing: border-box;
                }
                .sup-search-input:focus {
                    border-color: var(--accent);
                    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 14%, transparent);
                }
                .sup-search-input::placeholder { color: var(--text-muted); opacity: 0.6; }
                .sup-add-btn {
                    display: inline-flex; align-items: center; gap: 7px;
                    padding: 9px 18px; border-radius: 10px;
                    font-size: 13.5px; font-weight: 600;
                    color: white; background: var(--accent); border: none; cursor: pointer;
                    transition: opacity 0.18s, transform 0.15s, box-shadow 0.18s;
                    box-shadow: 0 2px 12px color-mix(in srgb, var(--accent) 35%, transparent);
                    position: relative; overflow: hidden; white-space: nowrap;
                }
                .sup-add-btn::after {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%);
                    pointer-events: none;
                }
                .sup-add-btn:hover { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 4px 20px color-mix(in srgb, var(--accent) 45%, transparent); }
                .sup-add-btn:active { transform: translateY(0); }
                .sup-th {
                    padding: 11px 16px; font-size: 11px; font-weight: 700;
                    letter-spacing: 0.06em; text-transform: uppercase;
                    color: var(--text-muted); text-align: left; white-space: nowrap;
                    border-bottom: 1px solid var(--bg-border);
                    background: color-mix(in srgb, var(--bg-border) 30%, var(--bg-surface));
                }
                .sup-td { padding: 13px 16px; font-size: 13px; color: var(--text-primary); vertical-align: middle; }
                .sup-page-btn {
                    width: 30px; height: 30px; border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 12.5px; font-weight: 500;
                    border: 1.5px solid var(--bg-border);
                    background: var(--bg-surface); color: var(--text-secondary);
                    cursor: pointer; transition: all 0.15s;
                }
                .sup-page-btn:hover:not(:disabled):not(.active) { border-color: var(--accent); color: var(--accent); }
                .sup-page-btn.active { background: var(--accent); border-color: var(--accent); color: white; box-shadow: 0 2px 8px color-mix(in srgb, var(--accent) 35%, transparent); }
                .sup-page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
                .sup-skeleton {
                    background: linear-gradient(90deg, var(--bg-border) 25%, color-mix(in srgb, var(--bg-border) 50%, var(--bg-surface)) 50%, var(--bg-border) 75%);
                    background-size: 600px 100%;
                    animation: sup-shimmer 1.4s ease-in-out infinite;
                    border-radius: 6px;
                }
                .sup-avatar {
                    width: 34px; height: 34px; border-radius: 9px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 12px; font-weight: 700; color: white;
                    flex-shrink: 0;
                }
                .sup-status-pill {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 3px 9px; border-radius: 999px;
                    font-size: 11px; font-weight: 600; letter-spacing: 0.02em;
                }
                .sup-meta-item {
                    display: flex; align-items: center; gap: 5px;
                    font-size: 12.5px; color: var(--text-muted);
                }
            `}</style>

            <div style={{ padding: '24px', background: 'var(--bg-app)', minHeight: '100%' }}>

                {/* Header */}
                <div style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '12px',
                            background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                            border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Building2 size={20} style={{ color: 'var(--accent)' }} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
                                Suppliers
                            </h1>
                            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '3px 0 0' }}>
                                {loading ? 'Loading…' : `${suppliers.length} supplier${suppliers.length !== 1 ? 's' : ''} listed`}
                            </p>
                        </div>
                    </div>

                    <button onClick={handleAdd} className="sup-add-btn">
                        <PlusIcon size={15} /> Add Supplier
                    </button>
                </div>

                {/* Search */}
                <div style={{ marginBottom: '20px', maxWidth: '420px', position: 'relative' }}>
                    <Search size={14} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                    <input
                        type="text"
                        placeholder="Search by name, contact, email, or phone…"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); fetchSuppliers(1); }}
                        className="sup-search-input"
                    />
                </div>

                {/* Table Card */}
                <div style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--bg-border)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                }}>
                    {/* Loading */}
                    {loading && (
                        <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                                    <div className="sup-skeleton" style={{ width: '34px', height: '34px', borderRadius: '9px', flexShrink: 0 }} />
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <div className="sup-skeleton" style={{ height: '12px', width: `${55 + (i * 7) % 30}%` }} />
                                        <div className="sup-skeleton" style={{ height: '10px', width: `${35 + (i * 11) % 25}%` }} />
                                    </div>
                                    <div className="sup-skeleton" style={{ height: '22px', width: '56px', borderRadius: '999px' }} />
                                    <div className="sup-skeleton" style={{ height: '30px', width: '68px', borderRadius: '8px' }} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && suppliers.length === 0 && (
                        <div style={{ padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <div style={{
                                width: '52px', height: '52px', borderRadius: '14px', marginBottom: '14px',
                                background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                                border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Building2 size={22} style={{ color: 'var(--accent)', opacity: 0.7 }} />
                            </div>
                            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', margin: '0 0 4px' }}>No suppliers found</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 18px' }}>Add your first supplier to get started</p>
                            <button onClick={handleAdd} className="sup-add-btn">
                                <PlusIcon size={14} /> Add Supplier
                            </button>
                        </div>
                    )}

                    {/* Table */}
                    {!loading && suppliers.length > 0 && (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th className="sup-th">Supplier</th>
                                        <th className="sup-th">Contact</th>
                                        <th className="sup-th">Phone</th>
                                        <th className="sup-th">Email</th>
                                        <th className="sup-th">Status</th>
                                        <th className="sup-th" style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suppliers.map((supplier, index) => (
                                        <tr
                                            key={supplier.id}
                                            className="sup-table-row"
                                            style={{ animationDelay: `${index * 0.04}s` }}
                                        >
                                            {/* Supplier name + avatar */}
                                            <td className="sup-td">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                                                    <div className={`sup-avatar bg-gradient-to-br ${getAvatarColor(supplier.id)}`}>
                                                        {getInitials(supplier.name)}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                                                            {supplier.name}
                                                        </div>
                                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>
                                                            ID #{supplier.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Contact person */}
                                            <td className="sup-td">
                                                {supplier.contact_person ? (
                                                    <div className="sup-meta-item">
                                                        <User size={12} />
                                                        <span>{supplier.contact_person}</span>
                                                    </div>
                                                ) : (
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>—</span>
                                                )}
                                            </td>

                                            {/* Phone */}
                                            <td className="sup-td">
                                                {supplier.phone ? (
                                                    <div className="sup-meta-item">
                                                        <Phone size={12} />
                                                        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12.5px' }}>{supplier.phone}</span>
                                                    </div>
                                                ) : (
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>—</span>
                                                )}
                                            </td>

                                            {/* Email */}
                                            <td className="sup-td">
                                                {supplier.email ? (
                                                    <div className="sup-meta-item">
                                                        <Mail size={12} />
                                                        <span>{supplier.email}</span>
                                                    </div>
                                                ) : (
                                                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>—</span>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="sup-td">
                                                <span
                                                    className="sup-status-pill"
                                                    style={supplier.is_active
                                                        ? { background: 'rgba(16,185,129,0.12)', color: 'rgb(5,150,105)', border: '1px solid rgba(16,185,129,0.25)' }
                                                        : { background: 'rgba(107,114,128,0.1)', color: 'var(--text-muted)', border: '1px solid var(--bg-border)' }
                                                    }
                                                >
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', display: 'inline-block', flexShrink: 0 }} />
                                                    {supplier.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="sup-td" style={{ textAlign: 'right' }}>
                                                <div className="sup-row-actions" style={{ justifyContent: 'flex-end' }}>
                                                    <button
                                                        onClick={() => handleEdit(supplier)}
                                                        className="sup-action-btn edit"
                                                        disabled={processing}
                                                        title="Edit"
                                                        style={{ color: 'var(--text-muted)' }}
                                                    >
                                                        <PencilIcon size={13} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(supplier.id)}
                                                        className="sup-action-btn del"
                                                        disabled={processing}
                                                        title="Delete"
                                                        style={{ color: 'var(--text-muted)' }}
                                                    >
                                                        <TrashIcon size={13} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && lastPage > 1 && (
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            flexWrap: 'wrap', gap: '12px',
                            padding: '14px 16px',
                            borderTop: '1px solid var(--bg-border)',
                        }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                Page <strong style={{ color: 'var(--text-secondary)' }}>{page}</strong> of <strong style={{ color: 'var(--text-secondary)' }}>{lastPage}</strong>
                            </span>
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <button
                                    className="sup-page-btn"
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1 || processing}
                                >
                                    <ChevronLeft size={14} />
                                </button>
                                {Array.from({ length: Math.min(5, lastPage) }, (_, i) => {
                                    let pageNum: number;
                                    if (lastPage <= 5) pageNum = i + 1;
                                    else if (page <= 3) pageNum = i + 1;
                                    else if (page >= lastPage - 2) pageNum = lastPage - 4 + i;
                                    else pageNum = page - 2 + i;
                                    return (
                                        <button
                                            key={pageNum}
                                            className={`sup-page-btn ${pageNum === page ? 'active' : ''}`}
                                            onClick={() => handlePageChange(pageNum)}
                                            disabled={processing}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    className="sup-page-btn"
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === lastPage || processing}
                                >
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <SupplierModal
                data={suppliers}
                open={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                onEdit={handleEdit}
                processing={processing}
                supplier={editing}
            />
        </Authenticated>
    );
}
