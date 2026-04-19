import { User, PaginatedUsers } from "@/types/user";
import { useState, useCallback } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function useUser() {
    const [users, setUsers] = useState<PaginatedUsers | null>(null);
    const [editing, setEditing] = useState<User | null>(null);
    const [search, setSearch] = useState("");
    const [processing, setProcessing] = useState(false);

    // ── Fetch ──────────────────────────────────────────────────────

    const fetchUsers = useCallback(async (page = 1) => {
        setProcessing(true);
        try {
            const params = new URLSearchParams({
                search: search,
                page: String(page),
            });
            const response = await fetch(`/api/users?${params}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error("Failed to fetch users.");
            const data: PaginatedUsers = await response.json();
            setUsers(data);
        } catch (error) {
            toast.error("Could not load users. Please try again.");
        } finally {
            setProcessing(false);
        }
    }, [search]);

    // ── Create ─────────────────────────────────────────────────────

    const createUser = () => {
        router.visit(route("superadmin.users.create"));
    };

    // ── Show ───────────────────────────────────────────────────────

    const showUser = (user: User) => {
        router.visit(route("superadmin.users.show", user.id));
    };

    // ── Edit ───────────────────────────────────────────────────────

    const editUser = (user: User) => {
        router.visit(route("superadmin.users.edit", user.id));
    };

    // ── Delete ─────────────────────────────────────────────────────

    const deleteUser = async (user: User) => {
        const result = await Swal.fire({
            title: "Delete User?",
            html: `<p>You are about to permanently delete <strong>${user.profile?.first_name ?? user.username}</strong>. This cannot be undone.</p>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        setProcessing(true);
        try {
            const response = await fetch(`/api/users/${user.id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? "",
                },
            });

            if (!response.ok) throw new Error();

            toast.success(`${user.profile?.first_name ?? user.username} has been deleted.`);
            await fetchUsers();
        } catch {
            toast.error("Failed to delete user. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    // ── Restore (soft delete) ──────────────────────────────────────

    const restoreUser = async (user: User) => {
        setProcessing(true);
        try {
            const response = await fetch(`/api/users/${user.id}/restore`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? "",
                },
            });

            if (!response.ok) throw new Error();

            toast.success(`${user.profile?.first_name ?? user.username} has been restored.`);
            await fetchUsers();
        } catch {
            toast.error("Failed to restore user. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    return {
        users,
        editing,
        setEditing,
        search,
        setSearch,
        processing,
        fetchUsers,
        createUser,
        showUser,
        editUser,
        deleteUser,
        restoreUser,
    };
}
