import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Suppliers } from "@/types/inventory";
import { X, Building2, User, Phone, Mail, MapPin, ToggleLeft } from 'lucide-react';

type Props = {
    data: Suppliers[]
    open: boolean
    onClose: () => void
    onSave: (supplier: Suppliers) => void
    onEdit: (supplier: Suppliers) => void
    processing: boolean
    supplier: Suppliers | null
}

export default function SupplierModal({ open, onClose, onSave, processing, supplier }: Props) {
    const [formData, setFormData] = useState<Partial<Suppliers>>({
        name: '',
        contact_person: '',
        phone: '',
        email: '',
        address: '',
        is_active: true
    });

    useEffect(() => {
        if (supplier) {
            setFormData(supplier);
        } else {
            setFormData({ name: '', contact_person: '', phone: '', email: '', address: '', is_active: true });
        }
    }, [supplier, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as Suppliers);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    return (
        <>
            <style>{`
                .sup-modal-backdrop {
                    position: fixed; inset: 0; z-index: 50;
                    background: rgba(0,0,0,0.55);
                    backdrop-filter: blur(6px);
                }
                .sup-modal-wrap {
                    position: fixed; inset: 0; z-index: 50;
                    display: flex; align-items: center; justify-content: center;
                    padding: 16px;
                    pointer-events: none;
                }
                .sup-modal-panel {
                    position: relative; width: 100%; max-width: 480px;
                    background: var(--bg-surface);
                    border-radius: 20px;
                    box-shadow: 0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px var(--bg-border);
                    overflow: hidden;
                    pointer-events: all;
                }
                .sup-accent-bar {
                    height: 3px;
                    background: var(--accent);
                    width: 100%;
                }
                .sup-header {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 20px 24px 18px;
                }
                .sup-close-btn {
                    width: 32px; height: 32px; border-radius: 8px;
                    border: 1.5px solid var(--bg-border);
                    background: transparent;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; color: var(--text-muted);
                    transition: background 0.15s;
                }
                .sup-close-btn:hover { background: var(--bg-app); }
                .sup-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, var(--bg-border) 20%, var(--bg-border) 80%, transparent);
                    margin: 0 24px;
                }
                .sup-form { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 16px; }
                .sup-label {
                    display: flex; align-items: center; gap: 6px;
                    font-size: 11.5px; font-weight: 600;
                    letter-spacing: 0.045em; text-transform: uppercase;
                    color: var(--text-muted); margin-bottom: 7px;
                }
                .sup-label svg { width: 11px; height: 11px; opacity: 0.75; flex-shrink: 0; }
                .sup-input {
                    width: 100%; padding: 9px 13px;
                    border-radius: 10px; font-size: 13.5px;
                    outline: none;
                    transition: border-color 0.18s, box-shadow 0.18s;
                    background: var(--bg-app);
                    border: 1.5px solid var(--bg-border);
                    color: var(--text-primary);
                    font-family: inherit;
                    box-sizing: border-box;
                    transition: border-color 0.18s, box-shadow 0.18s, opacity 0.15s;
                }
                .sup-input:focus {
                    border-color: var(--accent);
                    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 14%, transparent);
                }
                .sup-input:disabled { opacity: 0.5; cursor: not-allowed; }
                .sup-input::placeholder { color: var(--text-muted); opacity: 0.6; }
                .sup-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
                .sup-toggle-wrap {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 13px; border-radius: 10px;
                    border: 1.5px solid var(--bg-border);
                    background: var(--bg-app); cursor: pointer;
                    user-select: none; transition: border-color 0.18s;
                }
                .sup-toggle-wrap:hover { border-color: color-mix(in srgb, var(--accent) 40%, var(--bg-border)); }
                .sup-toggle-track {
                    width: 38px; height: 21px; border-radius: 999px;
                    position: relative; transition: background 0.22s; flex-shrink: 0;
                }
                .sup-toggle-thumb {
                    position: absolute; top: 2.5px; left: 2.5px;
                    width: 16px; height: 16px; border-radius: 50%;
                    background: white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.25);
                    transition: transform 0.22s cubic-bezier(0.16,1,0.3,1);
                }
                .sup-actions {
                    display: flex; justify-content: flex-end; gap: 10px;
                    padding-top: 18px;
                    border-top: 1px solid var(--bg-border);
                    margin-top: 4px;
                }
                .sup-cancel-btn {
                    padding: 9px 18px; border-radius: 10px;
                    font-size: 13.5px; font-weight: 500;
                    background: transparent;
                    border: 1.5px solid var(--bg-border);
                    color: var(--text-secondary);
                    cursor: pointer; transition: background 0.15s, border-color 0.15s;
                }
                .sup-cancel-btn:hover { background: var(--bg-app); }
                .sup-cancel-btn:disabled { opacity: 0.5; cursor: not-allowed; }
                .sup-submit-btn {
                    position: relative; overflow: hidden;
                    padding: 9px 22px; border-radius: 10px;
                    font-size: 13.5px; font-weight: 600;
                    color: white; background: var(--accent);
                    border: none; cursor: pointer;
                    transition: opacity 0.18s, transform 0.15s, box-shadow 0.18s;
                    box-shadow: 0 2px 12px color-mix(in srgb, var(--accent) 35%, transparent);
                }
                .sup-submit-btn::after {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%);
                    pointer-events: none;
                }
                .sup-submit-btn:hover:not(:disabled) {
                    opacity: 0.92; transform: translateY(-1px);
                    box-shadow: 0 4px 20px color-mix(in srgb, var(--accent) 45%, transparent);
                }
                .sup-submit-btn:active:not(:disabled) { transform: translateY(0); }
                .sup-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
                @keyframes sup-spin { to { transform: rotate(360deg); } }
                .sup-spin { animation: sup-spin 0.7s linear infinite; }
                @keyframes sup-field-in {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .sup-field {
                    animation: sup-field-in 0.3s ease both;
                }
                .sup-field:nth-child(1) { animation-delay: 0.04s; }
                .sup-field:nth-child(2) { animation-delay: 0.08s; }
                .sup-field:nth-child(3) { animation-delay: 0.12s; }
                .sup-field:nth-child(4) { animation-delay: 0.16s; }
                .sup-field:nth-child(5) { animation-delay: 0.20s; }
            `}</style>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" style={{ position: 'relative', zIndex: 50 }} onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100"
                        leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0"
                    >
                        <div className="sup-modal-backdrop" />
                    </Transition.Child>

                    <div className="sup-modal-wrap">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-250"
                            enterFrom="opacity-0 translate-y-5 scale-[0.97]"
                            enterTo="opacity-100 translate-y-0 scale-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0 scale-100"
                            leaveTo="opacity-0 translate-y-3 scale-[0.97]"
                        >
                            <Dialog.Panel className="sup-modal-panel">
                                {/* Accent stripe */}
                                <div className="sup-accent-bar" />

                                {/* Header */}
                                <div className="sup-header">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '36px', height: '36px', borderRadius: '10px',
                                            background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                                            border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <Building2 size={16} style={{ color: 'var(--accent)' }} />
                                        </div>
                                        <div>
                                            <Dialog.Title style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
                                                {supplier ? 'Edit Supplier' : 'New Supplier'}
                                            </Dialog.Title>
                                            <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: '3px 0 0' }}>
                                                {supplier ? `Updating "${supplier.name}"` : 'Fill in the supplier details below'}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="sup-close-btn" onClick={onClose} type="button">
                                        <X size={14} />
                                    </button>
                                </div>

                                <div className="sup-divider" />

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="sup-form">

                                    {/* Name */}
                                    <div className="sup-field">
                                        <label className="sup-label">
                                            <Building2 /> Supplier Name <span style={{ color: 'var(--accent)', marginLeft: '2px' }}>*</span>
                                        </label>
                                        <input
                                            type="text" name="name" required
                                            value={formData.name || ''}
                                            onChange={handleChange}
                                            className="sup-input"
                                            placeholder="e.g. Fresh Farms Co."
                                            disabled={processing}
                                        />
                                    </div>

                                    {/* Contact Person */}
                                    <div className="sup-field">
                                        <label className="sup-label">
                                            <User /> Contact Person
                                        </label>
                                        <input
                                            type="text" name="contact_person"
                                            value={formData.contact_person || ''}
                                            onChange={handleChange}
                                            className="sup-input"
                                            placeholder="Full name"
                                            disabled={processing}
                                        />
                                    </div>

                                    {/* Phone + Email row */}
                                    <div className="sup-field sup-row">
                                        <div>
                                            <label className="sup-label">
                                                <Phone /> Phone
                                            </label>
                                            <input
                                                type="tel" name="phone"
                                                value={formData.phone || ''}
                                                onChange={handleChange}
                                                className="sup-input"
                                                placeholder="+63 912 345 6789"
                                                disabled={processing}
                                            />
                                        </div>
                                        <div>
                                            <label className="sup-label">
                                                <Mail /> Email
                                            </label>
                                            <input
                                                type="email" name="email"
                                                value={formData.email || ''}
                                                onChange={handleChange}
                                                className="sup-input"
                                                placeholder="hello@supplier.com"
                                                disabled={processing}
                                            />
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="sup-field">
                                        <label className="sup-label">
                                            <MapPin /> Address
                                        </label>
                                        <textarea
                                            name="address" rows={3}
                                            value={formData.address || ''}
                                            onChange={handleChange}
                                            className="sup-input"
                                            placeholder="Street, City, Province…"
                                            disabled={processing}
                                            style={{ resize: 'vertical', minHeight: '76px' }}
                                        />
                                    </div>

                                    {/* Status toggle */}
                                    <div className="sup-field">
                                        <label className="sup-label">
                                            <ToggleLeft /> Status
                                        </label>
                                        <div
                                            className="sup-toggle-wrap"
                                            onClick={() => !processing && setFormData(p => ({ ...p, is_active: !p.is_active }))}
                                            style={{ opacity: processing ? 0.5 : 1, cursor: processing ? 'not-allowed' : 'pointer' }}
                                        >
                                            <div
                                                className="sup-toggle-track"
                                                style={{ background: formData.is_active ? 'var(--accent)' : 'var(--bg-border)' }}
                                            >
                                                <div
                                                    className="sup-toggle-thumb"
                                                    style={{ transform: formData.is_active ? 'translateX(17px)' : 'translateX(0)' }}
                                                />
                                            </div>
                                            <div>
                                                <span style={{
                                                    fontSize: '13px', fontWeight: 600,
                                                    color: formData.is_active ? 'var(--accent)' : 'var(--text-muted)',
                                                    transition: 'color 0.22s', display: 'block',
                                                }}>
                                                    {formData.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                                    {formData.is_active ? 'Supplier is visible and available' : 'Supplier is hidden from orders'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="sup-actions">
                                        <button type="button" className="sup-cancel-btn" onClick={onClose} disabled={processing}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="sup-submit-btn" disabled={processing}>
                                            {processing ? (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="sup-spin">
                                                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                                    </svg>
                                                    Saving…
                                                </span>
                                            ) : (supplier ? 'Update Supplier' : 'Add Supplier')}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
