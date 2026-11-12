import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import './App.css'
import Login from "./pages/login/Login.tsx";
import DashboardLayout from "./components/layout/DashboardLayout.tsx";
import DashboardHome from "./pages/dashboard/DashboardHome.tsx";
import {renderAppRoutes} from "./routes/routes.tsx";

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

                {renderAppRoutes()}
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
