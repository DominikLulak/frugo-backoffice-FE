export type Warehouse = {
    id: number;
    code: string;
    name: string;
    description: string;
}

export type WarehouseSector = {
    id: number;
    code: string;
    name: string;
    sectorTypeId: number;
    typeCode: string;
    typeName: string;
    description: string;
}

export type WarehouseDetail = {
    id: number;
    code: string;
    name: string;
    description: string;
    sectors: WarehouseSector[];
}

export type Location = {
    id: number;
    code: string;
    aisle: number | null;
    rack: number | null;
    level: number | null;
    position: number | null;
    canBeOrdered: boolean;
}

export type SectorDetail = {
    id: number;
    warehouseCode: string;
    code: string;
    name: string;
    typeCode: string;
    typeName: string;
    description: string;
    locations: Location[];
}

export type SectorType = {
    id: number;
    code: string;
    name: string;
    description: string;
}

export type SectorTypeCreateDto = {
    code: string;
    name: string;
    description: string;
}

export type WarehouseCreateDto = {
    code: string;
    name: string;
    description: string;
}

export type WarehouseSectorCreateDto = {
    code: string;
    name: string;
    sectorTypeId: number;
    description: string;
}

export type LocationCreateDto = {
    code: string;
    aisle: number | null;
    rack: number | null;
    level: number | null;
    position: number | null;
    canBeOrdered: boolean;
}