import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import './App.css'
import Login from "./pages/login/Login.tsx";
import DashboardHome from "./pages/dashboard/DashboardHome.tsx";
import DashboardLayout from "./components/layout/DashboardLayout.tsx";
import StockItemsPage from "./pages/dashboard/stock/StockItemsPage.tsx";
import OrdersPage from "./pages/dashboard/orders/OrdersPage.tsx";
import ShipmentsPage from "./pages/dashboard/shipments/ShipmentsPage.tsx";
import EmployeePage from "./pages/dashboard/employees/EmployeePage.tsx";
import CustomerPage from "./pages/dashboard/customers/CustomerPage.tsx";
import ProductsPage from "./pages/dashboard/products/ProductsPage.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import PalletPage from "./pages/dashboard/pallets/PalletPage.tsx";
import SupplierPage from "./pages/dashboard/suppliers/SupplierPage.tsx";
import PurchaseOrderPage from "./pages/dashboard/purchaseOrders/PurchaseOrderPage.tsx";
import WarehousePage from "./pages/dashboard/warehouses/WarehousePage.tsx";
import SectorTypePage from "./pages/dashboard/warehouses/SectorTypePage.tsx";
import PackagingPage from "./pages/dashboard/warehouses/PackagingPage.tsx";
import DepartmentPage from "./pages/dashboard/employees/DepartmentPage.tsx";
import ShiftPage from "./pages/dashboard/referenceData/ShiftPage.tsx";
import StatusPage from "./pages/dashboard/referenceData/StatusPage.tsx";
import CountryPage from "./pages/dashboard/referenceData/CountryPage.tsx";
import RolePage from "./pages/dashboard/rbac/RolePage.tsx";
import UserPage from "./pages/dashboard/rbac/UserPage.tsx";
import ModulePage from "./pages/dashboard/rbac/ModulePage.tsx";
import StockMovementPage from "./pages/dashboard/event/StockMovementPage.tsx";
import EventLogPage from "./pages/dashboard/event/EventLogPage.tsx";

function App() {

    const token =
        localStorage.getItem("token")

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route
                path="/dashboard"
                element={
                token
                    ? <DashboardLayout />
                    : <Navigate to="/" />
                }
            >
                <Route index element={<DashboardHome/>}/>

                <Route
                    path="stock/items"
                    element={
                        <ProtectedRoute permission="WAREHOUSE_READ">
                            <StockItemsPage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="pallets"
                    element={
                        <ProtectedRoute permission="PRODUCT_READ">
                            <PalletPage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="products"
                    element={
                        <ProtectedRoute permission="PRODUCT_READ">
                            <ProductsPage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="orders"
                    element={
                        <ProtectedRoute permission="ORDER_READ">
                            <OrdersPage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="shipments"
                    element={
                        <ProtectedRoute permission="SHIPMENT_READ">
                            <ShipmentsPage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="employees"
                    element={
                        <ProtectedRoute permission="EMPLOYEE_READ">
                            <EmployeePage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="departments"
                    element={
                        <ProtectedRoute permission="EMPLOYEE_READ">
                            <DepartmentPage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="customers"
                    element={
                        <ProtectedRoute permission="CUSTOMER_READ">
                            <CustomerPage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="suppliers"
                    element={
                        <ProtectedRoute permission="PRODUCT_READ">
                            <SupplierPage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="purchaseOrders"
                    element={
                        <ProtectedRoute permission="PRODUCT_READ">
                            <PurchaseOrderPage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="warehouses/WarehousePage"
                    element={
                        <ProtectedRoute permission="WAREHOUSE_READ">
                            <WarehousePage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="warehouses/SectorTypePage"
                    element={
                        <ProtectedRoute permission="WAREHOUSE_READ">
                            <SectorTypePage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="warehouses/Packaging"
                    element={
                        <ProtectedRoute permission="WAREHOUSE_READ">
                            <PackagingPage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="shifts"
                    element={
                        <ProtectedRoute permission="WAREHOUSE_READ">
                            <ShiftPage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="statuses"
                    element={
                        <ProtectedRoute permission="WAREHOUSE_READ">
                            <StatusPage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="countries"
                    element={
                        <ProtectedRoute permission="WAREHOUSE_READ">
                            <CountryPage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="roles"
                    element={
                        <ProtectedRoute permission="WAREHOUSE_READ">
                            <RolePage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="users"
                    element={
                        <ProtectedRoute permission="WAREHOUSE_READ">
                            <UserPage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="modules"
                    element={
                        <ProtectedRoute permission="WAREHOUSE_READ">
                            <ModulePage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="stockMovements"
                    element={
                        <ProtectedRoute permission="WAREHOUSE_READ">
                            <StockMovementPage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="eventLogs"
                    element={
                        <ProtectedRoute permission="WAREHOUSE_READ">
                            <EventLogPage/>
                        </ProtectedRoute>
                    }
                />

            </Route>

        </Routes>
    </BrowserRouter>
  )
}

export default App
