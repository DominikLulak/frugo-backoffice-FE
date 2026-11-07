import {useState} from "react";
import type {Warehouse, WarehouseDetail} from "../../../types/warehouse.ts";
import {getWarehouseDetail} from "../../../api/WarehouseApi.ts";

type Props = {
    onSaved: () => void | Promise<void>
}

export default function useWarehouseModal({onSaved}:Props){
    const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseDetail | null>(null)

    const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const openDetail = async (warehouse: Warehouse) => {
        const data = await getWarehouseDetail(warehouse.id)
        setSelectedWarehouse(data)
    }

    const closeDetail = () => {
        setSelectedWarehouse(null)
    }

    const refreshSelectedWarehouse = async () => {
        if(!selectedWarehouse) return

        const data = await getWarehouseDetail(selectedWarehouse.id)
        setSelectedWarehouse(data)
    }

    const handleWarehouseSave = async () => {
        await onSaved()

        if(selectedWarehouse){
            await refreshSelectedWarehouse()
        }
    }

    const openCreate = () => {
        setEditingWarehouse(null)
        setShowEditModal(true)
    }

    const openEdit = async (warehouse: Warehouse) => {
        setEditingWarehouse(warehouse)
        setShowEditModal(true)
    }

    const closeEdit = () => {
        setEditingWarehouse(null)
        setShowEditModal(false)
    }

    return{
        selectedWarehouse, editingWarehouse, showEditModal,
        openDetail, closeDetail, openCreate, openEdit, closeEdit,
        refreshSelectedWarehouse, handleWarehouseSave
    }
}