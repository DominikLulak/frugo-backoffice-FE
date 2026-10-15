import type {ReactNode} from "react";
import StockItemsPage from "../pages/dashboard/stock/StockItemsPage.tsx";
import ProductsPage from "../pages/dashboard/products/ProductsPage.tsx";
import OrdersPage from "../pages/dashboard/orders/OrdersPage.tsx";
import {Route} from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute.tsx";
import PalletPage from "../pages/dashboard/pallets/PalletPage.tsx";
import ShipmentsPage from "../pages/dashboard/shipments/ShipmentsPage.tsx";
import EmployeePage from "../pages/dashboard/employees/EmployeePage.tsx";
import DepartmentPage from "../pages/dashboard/employees/DepartmentPage.tsx";
import CustomerPage from "../pages/dashboard/customers/CustomerPage.tsx";
import SupplierPage from "../pages/dashboard/suppliers/SupplierPage.tsx";
import PurchaseOrderPage from "../pages/dashboard/purchaseOrders/PurchaseOrderPage.tsx";
import WarehousePage from "../pages/dashboard/warehouses/WarehousePage.tsx";
import SectorTypePage from "../pages/dashboard/warehouses/SectorTypePage.tsx";
import ShiftPage from "../pages/dashboard/referenceData/ShiftPage.tsx";
import PackagingPage from "../pages/dashboard/warehouses/PackagingPage.tsx";
import StatusPage from "../pages/dashboard/referenceData/StatusPage.tsx";
import CountryPage from "../pages/dashboard/referenceData/CountryPage.tsx";
import EtiSequencePage from "../pages/dashboard/referenceData/EtiSequencePage.tsx";
import RolePage from "../pages/dashboard/rbac/RolePage.tsx";
import UserPage from "../pages/dashboard/rbac/UserPage.tsx";
import ModulePage from "../pages/dashboard/rbac/ModulePage.tsx";
import StockMovementPage from "../pages/dashboard/event/StockMovementPage.tsx";
import EventLogPage from "../pages/dashboard/event/EventLogPage.tsx";
import PurchaseOrderStatusHistoryPage from "../pages/dashboard/event/PurchaseOrderStatusHistoryPage.tsx";

type AppRoute = {
    path: string;
    element: ReactNode
    permission: string;
}

export const appRoutes: AppRoute[] = [
    {
        path: "stock/items",
        element: <StockItemsPage/>,
        permission: "STOCKS_READ"
    },
    {
        path: "pallets",
        element: <PalletPage/>,
        permission: "STOCKS_READ"
    },
    {
        path: "products",
        element: <ProductsPage/>,
        permission: "PRODUCTS_READ"
    },
    {
        path: "orders",
        element: <OrdersPage/>,
        permission: "ORDERS_READ"
    },
    {
        path: "shipments",
        element: <ShipmentsPage/>,
        permission: "SHIPMENTS_READ"
    },
    {
        path: "employees",
        element: <EmployeePage/>,
        permission: "EMPLOYEES_READ"
    },
    {
        path: "departments",
        element: <DepartmentPage/>,
        permission: "DEPARTMENTS_READ"
    },
    {
        path: "customers",
        element: <CustomerPage/>,
        permission: "CUSTOMERS_READ"
    },
    {
        path: "suppliers",
        element: <SupplierPage/>,
        permission: "SUPPLIERS_READ"
    },
    {
        path: "purchaseOrders",
        element: <PurchaseOrderPage/>,
        permission: "PURCHASE_ORDERS_READ"
    },
    {
        path: "warehouses",
        element: <WarehousePage/>,
        permission: "WAREHOUSE_READ"
    },
    {
        path: "warehouses/sector-types",
        element: <SectorTypePage/>,
        permission: "WAREHOUSE_READ"
    },
    {
        path: "packaging",
        element: <PackagingPage/>,
        permission: "REFERENCE_DATA_READ"
    },
    {
        path: "shifts",
        element: <ShiftPage/>,
        permission: "REFERENCE_DATA_READ"
    },
    {
        path: "statuses",
        element: <StatusPage/>,
        permission: "REFERENCE_DATA_READ"
    },
    {
        path: "countries",
        element: <CountryPage/>,
        permission: "REFERENCE_DATA_READ"
    },
    {
        path: "etiSeq",
        element: <EtiSequencePage/>,
        permission: "REFERENCE_DATA_READ"
    },
    {
        path: "roles",
        element: <RolePage/>,
        permission: "ROLES_READ"
    },
    {
        path: "users",
        element: <UserPage/>,
        permission: "USERS_READ"
    },
    {
        path: "modules",
        element: <ModulePage/>,
        permission: "MODULES_READ"
    },
    {
        path: "stockMovements",
        element: <StockMovementPage/>,
        permission: "EVENTS_READ"
    },
    {
        path: "eventLogs",
        element: <EventLogPage/>,
        permission: "EVENTS_READ"
    },
    {
        path: "purchaseOrderStatusHistories",
        element: <PurchaseOrderStatusHistoryPage/>,
        permission: "EVENTS_READ"
    },
];

export function renderAppRoutes(){
    return appRoutes.map((route) => (
        <Route
            key={route.path}
            path={route.path}
            element={
                <ProtectedRoute permission={route.permission}>
                    {route.element}
                </ProtectedRoute>
            }
        />
    ))
}