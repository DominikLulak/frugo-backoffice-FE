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
                    path="customers"
                    element={
                        <ProtectedRoute permission="CUSTOMER_READ">
                            <CustomerPage/>
                        </ProtectedRoute>
                    }
                />

            </Route>

        </Routes>
    </BrowserRouter>
  )
}

export default App
