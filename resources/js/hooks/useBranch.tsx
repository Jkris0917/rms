import { Branch } from "@/types/branch";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function useBranch() {
    const [branch, setBranch] = useState<Branch[]>([]);
    const [editing, setEditing] = useState<Branch | null>(null);
    const [viewing, setViewing] = useState<Branch | null>(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchBranch = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/branches", {
                params: { page, search },
            });
            setBranch(response.data.data);
            setLastPage(response.data.meta.last_page);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to fetch branches");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranch();
    }, [page, search]);

    const handleSave = async (data: Omit<Branch, "id">) => {
        setProcessing(true);
        try {
            if (editing) {
                await axios.put(`/api/branches/${editing.id}`, data);
                toast.success("Branch updated successfully");
            } else {
                await axios.post("/api/branches", data);
                toast.success("Branch created successfully");
            }
            fetchBranch();
            setEditing(null);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to save branch");
        } finally {
            setProcessing(false);
        }
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#ef4444",
        });

        if (result.isConfirmed) {
            setProcessing(true);
            try {
                await axios.delete(`/api/branches/${id}`);
                toast.success("Branch deleted successfully");
                fetchBranch();
            } catch (err: any) {
                toast.error(err.response?.data?.message || "Failed to delete branch");
            } finally {
                setProcessing(false);
            }
        }
    };

    return {
        branch,
        setBranch,
        editing,
        setEditing,
        viewing,
        setViewing,
        search,
        setSearch,
        page,
        setPage,
        lastPage,
        processing,
        setProcessing,
        loading,
        handleSave,
        handleDelete,
    };
}
