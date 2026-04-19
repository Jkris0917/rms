import { MenuCategory } from "@/types/menu";
import { useEffect, useState, useRef } from "react";
import { X, ImagePlus, Hash, AlignLeft, SortAsc, ToggleLeft } from "lucide-react";

type Props = {
    data: MenuCategory | null;
    open: boolean;
    onClose: () => void;
    onSave: (data: FormData) => void;
    processing: boolean;
}

export default function MenuCategoryModal({ data, open, onClose, onSave, processing }: Props) {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        sort_order: 0,
        is_active: true,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [dragOver, setDragOver] = useState(false);
    const [mounted, setMounted] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            // Slight delay for mount animation
            requestAnimationFrame(() => setMounted(true));
        } else {
            setMounted(false);
        }
    }, [open]);

    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name || '',
                slug: data.slug || '',
                description: data.description || '',
                sort_order: data.sort_order ?? 0,
                is_active: data.is_active ?? true,
            });
            if (data.image) {
                setImagePreview(data.image.startsWith('http') ? data.image : `/storage/${data.image}`);
            } else {
                setImagePreview('');
            }
        } else {
            setFormData({ name: '', slug: '', description: '', sort_order: 0, is_active: true });
            setImagePreview('');
        }
        setImageFile(null);
        setErrors({});
    }, [data, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setErrors({ name: 'Category name is required' });
            return;
        }
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('slug', formData.slug || '');
        submitData.append('description', formData.description || '');
        const sortOrder = Number(formData.sort_order);
        submitData.append('sort_order', isNaN(sortOrder) ? '0' : sortOrder.toString());
        submitData.append('is_active', formData.is_active ? '1' : '0');
        if (imageFile) submitData.append('image', imageFile);
        if (data) submitData.append('_method', 'PUT');
        onSave(submitData);
    };

    const handleImageChange = (file: File) => {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleSortOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numValue = parseInt(e.target.value);
        setFormData({ ...formData, sort_order: isNaN(numValue) ? 0 : numValue });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) handleImageChange(file);
    };

    if (!open) return null;

    return (
        <>
            <style>{`
                @keyframes modal-backdrop-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modal-slide-in {
                    from { opacity: 0; transform: translateY(24px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes field-in {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .modal-backdrop {
                    animation: modal-backdrop-in 0.2s ease forwards;
                }
                .modal-panel {
                    animation: modal-slide-in 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .form-field {
                    animation: field-in 0.3s ease forwards;
                    opacity: 0;
                }
                .form-field:nth-child(1) { animation-delay: 0.05s; }
                .form-field:nth-child(2) { animation-delay: 0.09s; }
                .form-field:nth-child(3) { animation-delay: 0.13s; }
                .form-field:nth-child(4) { animation-delay: 0.17s; }
                .form-field:nth-child(5) { animation-delay: 0.21s; }
                .form-field:nth-child(6) { animation-delay: 0.25s; }
                .modal-input {
                    width: 100%;
                    padding: 10px 14px;
                    border-radius: 10px;
                    font-size: 13.5px;
                    outline: none;
                    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
                    background: var(--bg-app);
                    border: 1.5px solid var(--bg-border);
                    color: var(--text-primary);
                    font-family: inherit;
                }
                .modal-input:focus {
                    border-color: var(--accent);
                    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 14%, transparent);
                }
                .modal-input.error {
                    border-color: #ef4444;
                    box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
                }
                .modal-label {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    color: var(--text-muted);
                    margin-bottom: 7px;
                }
                .modal-label svg {
                    width: 12px;
                    height: 12px;
                    opacity: 0.7;
                }
                .drop-zone {
                    border: 1.5px dashed var(--bg-border);
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: var(--bg-app);
                }
                .drop-zone:hover, .drop-zone.drag-over {
                    border-color: var(--accent);
                    background: color-mix(in srgb, var(--accent) 5%, var(--bg-app));
                }
                .toggle-track {
                    width: 40px;
                    height: 22px;
                    border-radius: 999px;
                    position: relative;
                    cursor: pointer;
                    transition: background 0.22s;
                    flex-shrink: 0;
                }
                .toggle-thumb {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.25);
                    transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .submit-btn {
                    position: relative;
                    overflow: hidden;
                    padding: 10px 22px;
                    border-radius: 10px;
                    font-size: 13.5px;
                    font-weight: 600;
                    color: white;
                    background: var(--accent);
                    border: none;
                    cursor: pointer;
                    transition: opacity 0.18s, transform 0.15s, box-shadow 0.18s;
                    box-shadow: 0 2px 12px color-mix(in srgb, var(--accent) 35%, transparent);
                }
                .submit-btn:hover:not(:disabled) {
                    opacity: 0.92;
                    box-shadow: 0 4px 20px color-mix(in srgb, var(--accent) 45%, transparent);
                    transform: translateY(-1px);
                }
                .submit-btn:active:not(:disabled) { transform: translateY(0); }
                .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
                .submit-btn::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%);
                    pointer-events: none;
                }
                .cancel-btn {
                    padding: 10px 18px;
                    border-radius: 10px;
                    font-size: 13.5px;
                    font-weight: 500;
                    background: transparent;
                    border: 1.5px solid var(--bg-border);
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: background 0.18s, border-color 0.18s;
                }
                .cancel-btn:hover {
                    background: var(--bg-app);
                    border-color: color-mix(in srgb, var(--text-muted) 50%, transparent);
                }
                .divider-line {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, var(--bg-border) 20%, var(--bg-border) 80%, transparent);
                    margin: 0 -24px;
                }
            `}</style>

            <div className="fixed inset-0 z-50 overflow-y-auto" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                {/* Backdrop */}
                <div
                    className="modal-backdrop fixed inset-0"
                    style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
                    onClick={onClose}
                />

                {/* Panel */}
                <div
                    className="modal-panel relative w-full"
                    style={{
                        maxWidth: '520px',
                        background: 'var(--bg-surface)',
                        borderRadius: '20px',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px var(--bg-border)',
                        overflow: 'hidden',
                    }}
                >
                    {/* Accent stripe */}
                    <div style={{ height: '3px', background: 'var(--accent)', width: '100%' }} />

                    {/* Header */}
                    <div style={{ padding: '20px 24px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
                                {data ? 'Edit Category' : 'New Category'}
                            </h2>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '3px 0 0' }}>
                                {data ? `Updating "${data.name}"` : 'Fill in the details below'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid var(--bg-border)',
                                background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-app)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                            <X size={15} />
                        </button>
                    </div>

                    <div className="divider-line" />

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ padding: '20px 24px 24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                            {/* Name */}
                            <div className="form-field">
                                <label className="modal-label">
                                    <Hash /> Category Name <span style={{ color: 'var(--accent)', marginLeft: '2px' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`modal-input ${errors.name ? 'error' : ''}`}
                                    placeholder="e.g. Appetizers, Main Course..."
                                />
                                {errors.name && (
                                    <p style={{ fontSize: '11.5px', color: '#ef4444', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        ⚠ {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Slug */}
                            <div className="form-field">
                                <label className="modal-label">
                                    <svg viewBox="0 0 16 16" fill="currentColor"><path d="M3 4.5A1.5 1.5 0 014.5 3h3a.5.5 0 010 1h-3A.5.5 0 004 4.5v7a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-3a.5.5 0 011 0v3A1.5 1.5 0 0111.5 13h-7A1.5 1.5 0 013 11.5v-7z" /><path d="M10 3.5a.5.5 0 01.5-.5H13a.5.5 0 01.5.5V6a.5.5 0 01-1 0V4.707L8.354 8.854a.5.5 0 11-.708-.708L11.793 4H10.5a.5.5 0 01-.5-.5z" /></svg>
                                    Slug (URL)
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="modal-input"
                                    placeholder="auto-generated from name"
                                />
                                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>
                                    Leave empty to auto-generate
                                </p>
                            </div>

                            {/* Description */}
                            <div className="form-field">
                                <label className="modal-label">
                                    <AlignLeft /> Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="modal-input"
                                    placeholder="Brief description of this category..."
                                    style={{ resize: 'vertical', minHeight: '80px' }}
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="form-field">
                                <label className="modal-label">
                                    <ImagePlus /> Category Image
                                </label>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    {/* Preview */}
                                    {imagePreview && (
                                        <div style={{
                                            width: '72px', height: '72px', borderRadius: '10px', overflow: 'hidden',
                                            border: '1.5px solid var(--bg-border)', flexShrink: 0,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        }}>
                                            <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                    {/* Drop zone */}
                                    <div
                                        className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
                                        style={{ flex: 1 }}
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={handleDrop}
                                    >
                                        <ImagePlus size={18} style={{ color: 'var(--text-muted)', margin: '0 auto 6px', display: 'block' }} />
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>
                                            {imageFile ? imageFile.name : 'Click or drag image here'}
                                        </p>
                                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '3px 0 0' }}>
                                            PNG, JPG, WEBP up to 2MB
                                        </p>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageChange(f); }}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sort Order + Status row */}
                            <div className="form-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                {/* Sort Order */}
                                <div>
                                    <label className="modal-label">
                                        <SortAsc /> Sort Order
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.sort_order}
                                        onChange={handleSortOrderChange}
                                        className="modal-input"
                                        min="0"
                                        style={{ textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}
                                    />
                                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>
                                        Lower = higher priority
                                    </p>
                                </div>

                                {/* Status toggle */}
                                <div>
                                    <label className="modal-label">
                                        <ToggleLeft /> Status
                                    </label>
                                    <div
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            padding: '10px 14px', borderRadius: '10px',
                                            border: '1.5px solid var(--bg-border)',
                                            background: 'var(--bg-app)', cursor: 'pointer',
                                            userSelect: 'none',
                                        }}
                                        onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                                    >
                                        <div
                                            className="toggle-track"
                                            style={{ background: formData.is_active ? 'var(--accent)' : 'var(--bg-border)' }}
                                        >
                                            <div
                                                className="toggle-thumb"
                                                style={{ transform: formData.is_active ? 'translateX(18px)' : 'translateX(0)' }}
                                            />
                                        </div>
                                        <span style={{
                                            fontSize: '13px', fontWeight: 600,
                                            color: formData.is_active ? 'var(--accent)' : 'var(--text-muted)',
                                            transition: 'color 0.22s',
                                        }}>
                                            {formData.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--bg-border)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button type="button" onClick={onClose} className="cancel-btn">
                                Cancel
                            </button>
                            <button type="submit" disabled={processing} className="submit-btn">
                                {processing ? (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.7s linear infinite' }}>
                                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                        </svg>
                                        Saving…
                                    </span>
                                ) : (data ? 'Update Category' : 'Create Category')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
