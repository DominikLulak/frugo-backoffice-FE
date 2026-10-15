export type SidebarItem = {
    label: string;
    path: string;
    permission: string;
}

export type SidebarGroup = {
    id: string;
    label: string;
    items: SidebarItem[]
}

export const sidebarGroups: SidebarGroup[] = [
    {
        id: "stock",
        label: "Sklad",
        items:[
            {
                label: "Produkty",
                path: "/dashboard/products",
                permission: "PRODUCTS_READ"
            },
            {
                label: "Polozky na sklade",
                path: "/dashboard/stock/items",
                permission: "STOCKS_READ"
            },
            {
                label: "Palety",
                path: "/dashboard/pallets",
                permission: "STOCKS_READ"
            },
        ]
    },
    {
        id: "orders",
        label: "Objednavky a zasilky",
        items: [
            {
                label: "Obejdnavky",
                path: "/dashboard/orders",
                permission: "ORDERS_READ"
            },
            {
                label: "Zasilky",
                path: "/dashboard/shipments",
                permission: "SHIPMENTS_READ"
            },
        ]
    },
    {
        id: "purchaseOrders",
        label: "Nakupni objednavky",
        items: [
            {
                label: "Nakupni objednavky",
                path: "/dashboard/purchaseOrders",
                permission: "PURCHASE_ORDERS_READ"
            },
            {
                label: "Dodavatele",
                path: "/dashboard/suppliers",
                permission: "SUPPLIERS_READ"
            }
        ]
    },
    {
        id: "warehouses",
        label: "Sklady",
        items: [
            {
                label: "Sklady",
                path: "/dashboard/warehouses",
                permission: "WAREHOUSE_READ"
            },
            {
                label: "Sektory",
                path: "/dashboard/warehouses/sector-types",
                permission: "WAREHOUSE_READ"
            }
        ]
    },
    {
        id: "administration",
        label: "Administrace",
        items: [
            {
                label: "Oddeleni",
                path: "/dashboard/departments",
                permission: "DEPARTMENTS_READ"
            },
            {
                label: "Zamestnanci",
                path: "/dashboard/employees",
                permission: "EMPLOYEES_READ"
            },
            {
                label: "Zakaznici",
                path: "/dashboard/customers",
                permission: "CUSTOMERS_READ"
            }
        ]
    },
    {
        id: "permissions",
        label: "Opravneni",
        items: [
            {
                label: "Moduly",
                path: "/dashboard/modules",
                permission: "MODULES_READ"
            },
            {
                label: "Role",
                path: "/dashboard/roles",
                permission: "ROLES_READ"
            },
            {
                label: "Uzivatele",
                path: "/dashboard/users",
                permission: "USERS_READ"
            }
        ]
    },
    {
        id: "events",
        label: "Eventy a pohyby",
        items: [
            {
                label: "Skladove pohyby",
                path: "/dashboard/stockMovements",
                permission: "EVENTS_READ"
            },
            {
                label: "Event Log",
                path: "/dashboard/eventLogs",
                permission: "EVENTS_READ"
            },
            {
                label: "Historie stavů nákupních objednávek",
                path: "/dashboard/purchaseOrderStatusHistories",
                permission: "EVENTS_READ"
            }
        ]
    },
    {
        id: "referenceData",
        label: "Referencni tabulky",
        items: [
            {
                label: "Smeny",
                path: "/dashboard/shifts",
                permission: "REFERENCE_DATA_READ"
            },
            {
                label: "Statusy",
                path: "/dashboard/statuses",
                permission: "REFERENCE_DATA_READ"
            },
            {
                label: "Zeme",
                path: "/dashboard/countries",
                permission: "REFERENCE_DATA_READ"
            },
            {
                label: "Baleni",
                path: "/dashboard/packaging",
                permission: "REFERENCE_DATA_READ"
            },
            {
                label: "Eti Sequence",
                path: "/dashboard/etiSeq",
                permission: "REFERENCE_DATA_READ"
            }
        ]
    }
]