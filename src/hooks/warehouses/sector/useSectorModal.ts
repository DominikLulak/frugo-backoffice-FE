import {useState} from "react";
import type {SectorDetail, WarehouseSector} from "../../../types/warehouse.ts";
import {getSectorLocations} from "../../../api/WarehouseApi.ts";

type Props = {
    onSaved: () => void | Promise<void>
}

export default function useSectorModal({onSaved}:Props){
    const [selectedSector, setSelectedSector] = useState<SectorDetail | null>(null)

    const [editingSector, setEditingSector] = useState<WarehouseSector | null>(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const openDetail = async (sector: WarehouseSector) => {
        const data = await getSectorLocations(sector.id)
        setSelectedSector(data)
    }

    const closeDetail = () => {
        setSelectedSector(null)
    }

    const refreshSelectedSector = async () => {
        if(!selectedSector) return

        const data = await getSectorLocations(selectedSector.id)
        setSelectedSector(data)
    }

    const handleSectorSave = async () => {
        await onSaved()

        if(selectedSector){
            await refreshSelectedSector()
        }
    }

    const openCreate = () => {
        setEditingSector(null)
        setShowEditModal(true)
    }

    const openEdit = async (sector: WarehouseSector) => {
        setEditingSector(sector)
        setShowEditModal(true)
    }

    const closeEdit = () => {
        setEditingSector(null)
        setShowEditModal(false)
    }

    return{
        selectedSector, editingSector, showEditModal,
        openDetail, closeDetail, openCreate, openEdit, closeEdit,
        refreshSelectedSector, handleSectorSave
    }
}