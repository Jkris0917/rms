import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import useMenuCategory from "@/hooks/useMenuCategory";
import { ChevronLeft, ChevronRight, Edit, Trash2, Plus, Search, Layers } from "lucide-react";
import MenuCategoryModal from "./MenuCategoryModal";

const breadcrumbs = [
    { label: "Dashboard", href: route("superadmin.dashboard") },
    { label: "Menu Categories" },
];

const CATEGORY_COLORS = [
    "from-emerald-500 to-teal-500",
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-amber-500",
    "from-red-500 to-rose-500",
    "from-indigo-500 to-violet-500",
];

export default function MenuCategoryIndex() {
    const {
        menuCategories,
        editing,
        modalOpen,
        processing,
        search,
        setSearch,
        setModalOpen,
        fetchMenuCategories,
        handleCreate,
        handleEdit,
        handleSave,
        handleDelete,
        handleToggleStatus,
    } = useMenuCategory();

    useEffect(() => {
        fetchMenuCategories(1);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchMenuCategories(1);
    };

    const getCategoryColor = (id: number) => CATEGORY_COLORS[id % CATEGORY_COLORS.length];

    return (
        <Authenticated breadcrumbs={breadcrumbs}>
            <Head title="Menu Categories" />

            <style>{`
                @keyframes card-in {
                    from { opacity: 0; transform: translateY(16px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes shimmer {
                    0% { background-position: -400px 0; }
                    100% { background-position: 400px 0; }
                }
                .category-card {
                    animation: card-in 0.35s cubic-bezier(0.16,1,0.3,1) both;
                    position: relative;
                    border-radius: 16px;
                    overflow: hidden;
                    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s;
                    background: var(--bg-surface);
                    border: 1px solid var(--bg-border);
                    cursor: default;
                }

                .category-card:hover .card-actions {
                    opacity: 1;
                    transform: translateY(0);
                }
                .card-actions {
                    opacity: 0;
                    transform: translateY(4px);
                    transition: opacity 0.2s, transform 0.2s;
                }
                .card-image-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%);
                    pointer-events: none;
                }
                .action-btn {
                    width: 28px; height: 28px;
                    border-radius: 7px;
                    display: flex; align-items: center; justify-content: center;
                    border: none; cursor: pointer;
                    transition: background 0.15s, transform 0.12s;
                }
                .action-btn:active { transform: scale(0.9); }
                .search-input-wrap {
                    position: relative; flex: 1;
                }
                .search-input {
                    width: 100%;
                    padding: 9px 14px 9px 36px;
                    border-radius: 10px;
                    font-size: 13.5px;
                    border: 1.5px solid var(--bg-border);
                    background: var(--bg-surface);
                    color: var(--text-primary);
                    outline: none;
                    transition: border-color 0.18s, box-shadow 0.18s;
                    font-family: inherit;
                    box-sizing: border-box;
                }
                .search-input:focus {
                    border-color: var(--accent);
                    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 14%, transparent);
                }
                .search-icon {
                    position: absolute; left: 11px; top: 50%;
                    transform: translateY(-50%);
                    pointer-events: none;
                    color: var(--text-muted);
                }
                .status-pill {
                    padding: 3px 9px;
                    border-radius: 999px;
                    font-size: 10.5px;
                    font-weight: 700;
                    letter-spacing: 0.03em;
                    border: none; cursor: pointer;
                    transition: transform 0.15s, box-shadow 0.15s;
                    backdrop-filter: blur(4px);
                }
                .status-pill:hover { transform: scale(1.06); }
                .add-btn {
                    display: inline-flex; align-items: center; gap: 7px;
                    padding: 9px 18px;
                    border-radius: 10px;
                    font-size: 13.5px; font-weight: 600;
                    color: white; background: var(--accent);
                    border: none; cursor: pointer;
                    transition: opacity 0.18s, transform 0.15s, box-shadow 0.18s;
                    box-shadow: 0 2px 12px color-mix(in srgb, var(--accent) 35%, transparent);
                    position: relative; overflow: hidden;
                }
                .add-btn::after {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 60%);
                    pointer-events: none;
                }
                .add-btn:hover {
                    opacity: 0.92;
                    box-shadow: 0 4px 20px color-mix(in srgb, var(--accent) 45%, transparent);
                    transform: translateY(-1px);
                }
                .add-btn:active { transform: translateY(0); }
                .skeleton-card {
                    border-radius: 16px; overflow: hidden;
                    border: 1px solid var(--bg-border);
                    background: var(--bg-surface);
                }
                .skeleton-block {
                    background: linear-gradient(90deg, var(--bg-border) 25%, color-mix(in srgb, var(--bg-border) 50%, var(--bg-surface)) 50%, var(--bg-border) 75%);
                    background-size: 400px 100%;
                    animation: shimmer 1.4s ease-in-out infinite;
                    border-radius: 6px;
                }
                .page-btn {
                    width: 30px; height: 30px;
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 12.5px; font-weight: 500;
                    border: 1.5px solid var(--bg-border);
                    background: var(--bg-surface);
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: all 0.15s;
                }
                .page-btn:hover:not(:disabled):not(.active) {
                    border-color: var(--accent);
                    color: var(--accent);
                }
                .page-btn.active {
                    background: var(--accent);
                    border-color: var(--accent);
                    color: white;
                    box-shadow: 0 2px 8px color-mix(in srgb, var(--accent) 35%, transparent);
                }
                .page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
                .empty-state {
                    grid-column: 1 / -1;
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    padding: 64px 24px;
                    border-radius: 16px;
                    border: 1.5px dashed var(--bg-border);
                    text-align: center;
                }
            `}</style>

            <div style={{ padding: '24px', background: 'var(--bg-app)', minHeight: '100%' }}>

                {/* Header */}
                <div style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        {/* Icon badge */}
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '12px',
                            background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                        }}>
                            <Layers size={20} style={{ color: 'var(--accent)' }} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
                                Menu Categories
                            </h1>
                            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '3px 0 0' }}>
                                {menuCategories ? `${menuCategories.total} categories total` : 'Loading…'}
                            </p>
                        </div>
                    </div>

                    <button onClick={handleCreate} className="add-btn">
                        <Plus size={15} />
                        Add Category
                    </button>
                </div>

                {/* Search bar */}
                <form onSubmit={handleSearch} style={{ marginBottom: '24px', display: 'flex', gap: '10px', maxWidth: '380px' }}>
                    <div className="search-input-wrap">
                        <Search size={14} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search categories…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '9px 16px', borderRadius: '10px',
                            fontSize: '13px', fontWeight: 500,
                            border: '1.5px solid var(--bg-border)',
                            background: 'var(--bg-surface)',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer', transition: 'border-color 0.15s',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Search
                    </button>
                </form>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>

                    {/* Skeletons */}
                    {processing && !menuCategories && (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="skeleton-card">
                                <div className="skeleton-block" style={{ height: '148px', borderRadius: 0 }} />
                                <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div className="skeleton-block" style={{ height: '13px', width: '65%' }} />
                                    <div className="skeleton-block" style={{ height: '11px', width: '90%' }} />
                                    <div className="skeleton-block" style={{ height: '11px', width: '50%' }} />
                                </div>
                            </div>
                        ))
                    )}

                    {/* Empty state */}
                    {!processing && menuCategories?.data.length === 0 && (
                        <div className="empty-state">
                            <div style={{
                                width: '52px', height: '52px', borderRadius: '14px', marginBottom: '14px',
                                background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                                border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Layers size={22} style={{ color: 'var(--accent)', opacity: 0.7 }} />
                            </div>
                            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', margin: '0 0 4px' }}>
                                No categories yet
                            </p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 18px' }}>
                                Create your first category to get started
                            </p>
                            <button onClick={handleCreate} className="add-btn">
                                <Plus size={14} /> Create Category
                            </button>
                        </div>
                    )}

                    {/* Category Cards */}
                    {menuCategories?.data.map((category, index) => (
                        <div
                            key={category.id}
                            className="category-card"
                            style={{ animationDelay: `${index * 0.045}s` }}
                        >
                            {/* Image area */}
                            <div style={{ position: 'relative', height: '148px', overflow: 'hidden' }}>
                                {category.image ? (
                                    <img
                                        src={category.image.startsWith('http') ? category.image : `/storage/${category.image}`}
                                        alt={category.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }}
                                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                                    />
                                ) : (
                                    <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor(category.id)}`}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ color: 'white', fontSize: '42px', fontWeight: 800, opacity: 0.3, lineHeight: 1 }}>
                                            {category.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div className="card-image-overlay" />

                                {/* Status pill */}
                                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                                    <button
                                        onClick={() => handleToggleStatus(category)}
                                        className="status-pill"
                                        style={category.is_active
                                            ? { background: 'rgba(16,185,129,0.85)', color: 'white' }
                                            : { background: 'rgba(107,114,128,0.75)', color: 'white' }
                                        }
                                    >
                                        {category.is_active ? '● Active' : '○ Inactive'}
                                    </button>
                                </div>

                                {/* Action buttons */}
                                <div
                                    className="card-actions"
                                    style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}
                                >
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="action-btn"
                                        style={{ background: 'rgba(255,255,255,0.92)', color: 'var(--accent)' }}
                                        title="Edit"
                                    >
                                        <Edit size={12} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category)}
                                        className="action-btn"
                                        style={{ background: 'rgba(255,255,255,0.92)', color: '#ef4444' }}
                                        title="Delete"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>

                                {/* Sort badge */}
                                <div style={{
                                    position: 'absolute', bottom: '10px', right: '10px',
                                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                                    borderRadius: '6px', padding: '2px 7px',
                                    fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.85)',
                                }}>
                                    #{category.sort_order || 0}
                                </div>
                            </div>

                            {/* Content */}
                            <div style={{ padding: '13px 14px 14px' }}>
                                <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', lineHeight: 1.3 }}>
                                    {category.name}
                                </h3>

                                {category.description && (
                                    <p style={{
                                        fontSize: '11.5px', color: 'var(--text-muted)', margin: '0 0 8px',
                                        display: '-webkit-box', WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5,
                                    }}>
                                        {category.description}
                                    </p>
                                )}

                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    paddingTop: '9px',
                                    borderTop: '1px solid var(--bg-border)',
                                    marginTop: category.description ? '0' : '4px',
                                }}>
                                    <span style={{
                                        fontSize: '10.5px', color: 'var(--text-muted)',
                                        fontFamily: 'ui-monospace, monospace',
                                        background: 'var(--bg-app)', padding: '2px 7px',
                                        borderRadius: '5px', border: '1px solid var(--bg-border)',
                                        maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                    }}>
                                        /{category.slug}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {menuCategories && menuCategories.last_page > 1 && (
                    <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            Showing <strong style={{ color: 'var(--text-secondary)' }}>{menuCategories.from}–{menuCategories.to}</strong> of <strong style={{ color: 'var(--text-secondary)' }}>{menuCategories.total}</strong> categories
                        </span>

                        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                            <button
                                onClick={() => fetchMenuCategories(menuCategories.current_page - 1)}
                                disabled={menuCategories.current_page === 1}
                                className="page-btn"
                            >
                                <ChevronLeft size={14} />
                            </button>

                            {Array.from({ length: Math.min(5, menuCategories.last_page) }, (_, i) => {
                                let pageNum: number;
                                if (menuCategories.last_page <= 5) pageNum = i + 1;
                                else if (menuCategories.current_page <= 3) pageNum = i + 1;
                                else if (menuCategories.current_page >= menuCategories.last_page - 2) pageNum = menuCategories.last_page - 4 + i;
                                else pageNum = menuCategories.current_page - 2 + i;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => fetchMenuCategories(pageNum)}
                                        className={`page-btn ${pageNum === menuCategories.current_page ? 'active' : ''}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => fetchMenuCategories(menuCategories.current_page + 1)}
                                disabled={menuCategories.current_page === menuCategories.last_page}
                                className="page-btn"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            <MenuCategoryModal
                data={editing}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                processing={processing}
            />
        </Authenticated>
    );
}
