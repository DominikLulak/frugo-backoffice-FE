import {useState} from "react";
import Sidebar from "./Sidebar.tsx";
import Topbar from "./Topbar.tsx";
import {Outlet} from "react-router-dom";

export default function DashboardLayout(){
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return(
        <div className="dashboard-layout">

            {sidebarOpen && <Sidebar/>}

            <div className="dashboard-main">
                
                <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>

                <main className="dashboard-content">
                    <Outlet/>
                </main>
                
            </div>

        </div>
    )
}