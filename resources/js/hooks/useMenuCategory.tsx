import { MenuCategory, PaginatedResponse } from "@/types/menu";
import { useState } from "react";
import Swal from "sweetalert2";

export default function useMenuCategory() {
    const [menuCategories, setMenuCategories] = useState<PaginatedResponse<MenuCategory> | null>(null);
    const [editing, setEditing] = useState<MenuCategory | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const fetchMenuCategories = async (newPage?: number) => {
        setProcessing(true);
        try {
            const currentPage = newPage ?? page;
            const response = await fetch(`/api/menu-category?search=${encodeURIComponent(search)}&page=${currentPage}`);

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data = await response.json();
            setMenuCategories(data);
            setPage(data.current_page);
        } catch (error) {
            console.error('Error fetching categories:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to load categories',
                confirmButtonColor: '#8b5cf6',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
            });
        } finally {
            setProcessing(false);
        }
    };

    const handleCreate = () => {
        setEditing(null);
        setModalOpen(true);
    };

    const handleEdit = (category: MenuCategory) => {
        setEditing(category);
        setModalOpen(true);
    };

    const handleSave = async (formData: FormData) => {
        setProcessing(true);
        try {
            const isEdit = editing !== null;
            const url = isEdit
                ? `/api/menu-category/${editing.id}`
                : '/api/menu-category';

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            const result = await response.json();

            if (!response.ok) {
                if (response.status === 422 && result.errors) {
                    const errorMessages = Object.values(result.errors).flat().join('\n');
                    throw new Error(errorMessages);
                }
                throw new Error(result.message || 'Failed to save category');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: result.message,
                timer: 2000,
                showConfirmButton: false,
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
            });

            setModalOpen(false);
            await fetchMenuCategories(1);
        } catch (error) {
            console.error('Error saving category:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error instanceof Error ? error.message : 'Failed to save category',
                confirmButtonColor: '#8b5cf6',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
            });
        } finally {
            setProcessing(false);
        }
    };

    const handleDelete = async (category: MenuCategory) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            html: `You are about to delete "<strong>${category.name}</strong>"`,
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            reverseButtons: true
        });

        if (!result.isConfirmed) return;

        setProcessing(true);
        try {
            const response = await fetch(`/api/menu-category/${category.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || 'Failed to delete category');
            }

            const successResult = await response.json();

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: successResult.message,
                timer: 2000,
                showConfirmButton: false,
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
            });

            await fetchMenuCategories(page);
        } catch (error) {
            console.error('Error deleting category:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error instanceof Error ? error.message : 'Failed to delete category',
                confirmButtonColor: '#8b5cf6',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
            });
        } finally {
            setProcessing(false);
        }
    };

    const handleToggleStatus = async (category: MenuCategory) => {
        const newStatus = !category.is_active;
        const action = newStatus ? 'activate' : 'deactivate';

        const result = await Swal.fire({
            title: `Confirm ${action}`,
            html: `Are you sure you want to ${action} "<strong>${category.name}</strong>"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#8b5cf6',
            cancelButtonColor: '#6c757d',
            confirmButtonText: `Yes, ${action} it!`,
            cancelButtonText: 'Cancel',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            reverseButtons: true
        });

        if (!result.isConfirmed) return;

        const formData = new FormData();
        formData.append('is_active', newStatus ? '1' : '0');
        formData.append('name', category.name);
        formData.append('slug', category.slug);
        formData.append('description', category.description || '');
        formData.append('sort_order', (category.sort_order || 0).toString());
        formData.append('_method', 'PUT');

        setProcessing(true);
        try {
            const response = await fetch(`/api/menu-category/${category.id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || 'Failed to update status');
            }

            const successResult = await response.json();

            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: successResult.message,
                timer: 2000,
                showConfirmButton: false,
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
            });

            await fetchMenuCategories(page);
        } catch (error) {
            console.error('Error updating status:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error instanceof Error ? error.message : 'Failed to update category status',
                confirmButtonColor: '#8b5cf6',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
            });
        } finally {
            setProcessing(false);
        }
    };

    return {
        menuCategories,
        editing,
        modalOpen,
        processing,
        search,
        page,
        setSearch,
        setModalOpen,
        fetchMenuCategories,
        handleCreate,
        handleEdit,
        handleSave,
        handleDelete,
        handleToggleStatus,
    };
}
