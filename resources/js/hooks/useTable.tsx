import { Table } from "@/types/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function useTable() {
    const [table, settable] = useState<Table[]>([]);
    const [editing, setEditing] = useState<Table | null>(null);
    const [viewing, setViewing] = useState<Table | null>(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchTable = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/table", {
                params: { page, search },
            });
            settable(response.data.data);
            setLastPage(response.data.meta.last_page);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to fetch tables");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTable();
    }, [page, search]);

    const handleSave = async (data: Omit<Table, "id">) => {
        setProcessing(true);
        try {
            if (editing) {
                await axios.put(`/api/table/${editing.id}`, data);
                toast.success("Table updated successfully");
            } else {
                await axios.post("/api/table", data);
                toast.success("Table created successfully");
            }
            fetchTable();
            setEditing(null);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to save table");
        } finally {
            setProcessing(false);
        }
    };
    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Delete table?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#ef4444",
        });

        if (result.isConfirmed) {
            setProcessing(true);
            try {
                await axios.delete(`/api/table/${id}`);
                // ✅ optimistically remove first — instant visual feedback
                settable(prev => prev.filter(t => t.id !== id));
                toast.success("Table deleted successfully");
                await fetchTable(); // ✅ awaited so finally runs AFTER the list refreshes
            } catch (err: any) {
                toast.error(err.response?.data?.message || "Failed to delete table");
            } finally {
                setProcessing(false);
            }
        }
    };

    return {
        table,
        settable,
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
