import { Suppliers } from "@/types/inventory";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export default function useSupplier() {
    const [suppliers, setSuppliers] = useState<Suppliers[]>([])
    const [editing, setEditing] = useState<Suppliers | null>(null)
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const fetchSuppliers = useCallback(async (pageNumber = 1) => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/suppliers?page=${pageNumber}&search=${search}`)
            setSuppliers(response.data.data)
            setPage(response.data.current_page)
            setLastPage(response.data.last_page)
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Error fetching suppliers")
        } finally {
            setLoading(false)
        }
    }, [search])

    const handleSave = async (supplier: Suppliers) => {
        setProcessing(true)
        try {
            if (editing) {
                await axios.put(`/api/suppliers/${editing.id}`, supplier)
            } else {
                await axios.post('/api/suppliers', supplier)
            }
            await fetchSuppliers(page)
            setOpen(false)
            setEditing(null)
        } catch (err: any) {
            toast.error(err.message?.response?.data || 'Error saving supplier:')
            alert('Failed to save supplier. Please try again.')
        } finally {
            setProcessing(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this supplier?')) return
        setProcessing(true)
        try {
            await axios.delete(`/api/suppliers/${id}`)
            await fetchSuppliers(page)
        } catch (err: any) {
            toast.error(err.message?.response?.data || 'Error saving supplier:')
            alert('Failed to delete supplier. Please try again.')
        } finally {
            setProcessing(false)
        }
    }

    // Initial fetch and when search changes
    useEffect(() => {
        fetchSuppliers(1)
    }, [fetchSuppliers])

    return {
        suppliers,
        editing,
        search,
        open,
        processing,
        page,
        lastPage,
        loading,
        setSuppliers,
        setEditing,
        setSearch,
        setOpen,
        setProcessing,
        setPage,
        setLastPage,
        fetchSuppliers,
        handleSave,
        handleDelete
    }
}
