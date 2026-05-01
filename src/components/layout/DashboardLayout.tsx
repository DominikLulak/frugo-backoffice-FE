import {useState} from "react";
import Sidebar from "./Sidebar.tsx";
import Topbar from "./Topbar.tsx";
import {Outlet} from "react-router-dom";

export default function DashboardLayout(){
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return(
        <div className="d-flex vh-100">

            {sidebarOpen && <Sidebar/>}

            <div className="flex-grow-1 d-flex flex-column">
                
                <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>

                <main className="bg-light flex-grow-1 p-4">
                    <Outlet/>
                </main>
                
            </div>

        </div>
    )
}