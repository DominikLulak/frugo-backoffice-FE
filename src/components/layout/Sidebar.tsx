import {useState} from "react";
import SidebarLink from "./SidebarLink.tsx";

export default function Sidebar(){
    const role = localStorage.getItem("role")

    const [stockOpen, setStockOpen] = useState(false)
    const [transOpen, setTransOpen] = useState(false)
    const [adminOpen, setAdminOpen] = useState(false)

    const menuButton = (active: boolean) =>
        `btn w-100 text-start d-flex justify-content-between align-items-center mb-2 ${
            active ? "btn btn-outline-light" : "btn-dark"
        }`

    return(
        <div className="bg-dark text-white sidebar">

            <div className="p-3 border-bottom">
                <h3 className="m-0">
                    Fru<span className="text-success">go</span>
                </h3>
            </div>

            <div className="p-2">

                {/*<SidebarLink to="/dashboard" className="btn btn-success w-100 text-start mb-2">Dashboard</SidebarLink>*/}

                <button className={menuButton(stockOpen)} onClick={() => setStockOpen(!stockOpen)}>
                    <span>Sklad</span>
                    <span>{stockOpen ? "▲" : "▼"}</span>
                </button>

                {stockOpen && (
                    <div className="ms-3 mb-2">
                        <SidebarLink to="/dashboard/stock/items" label="Položky na skladě"/>
                        {role === "ADMIN" && (
                            <>
                                <SidebarLink to="/dashboard" label="Vytvoření příjemky na položku" disabled/>
                                <SidebarLink to="/dashboard" label="Vymazání položky ze skladu" disabled/>
                                <SidebarLink to="/dashboard" label="Založení nové položky" disabled/>
                            </>
                        )}
                        <SidebarLink to="/dashboard/orders" label="Objednávky" />
                        {role === "ADMIN" && (
                            <>
                                <SidebarLink to="/dashboard" label="Objednávky - Editace" disabled/>
                            </>
                        )}
                        <SidebarLink to="/dashboard/shipments" label="Zásilky" />
                        {role === "ADMIN" && (
                            <>
                                <SidebarLink to="/dashboard" label="Zásilky - Editace" disabled/>
                            </>
                        )}
                    </div>
                )}

                <button className={menuButton(transOpen)} onClick={() => setTransOpen(!transOpen)}>
                    <span>Transakce</span>
                    <span>{transOpen ? "▲" : "▼"}</span>
                </button>

                {transOpen && (
                    <div className="ms-3 mb-2">
                        <SidebarLink to="/dashboard" label="Příjem položky" disabled/>
                        <SidebarLink to="/dashboard" label="Výdej položky do objednávky" disabled/>
                        <SidebarLink to="/dashboard" label="Výdej položky do zásilky" disabled/>
                    </div>
                )}

                {role === "ADMIN" && (
                    <>
                        <button className={menuButton(adminOpen)} onClick={() => setAdminOpen(!adminOpen)}>
                            <span>Administrace</span>
                            <span>{adminOpen ? "▲" : "▼"}</span>
                        </button>

                        {adminOpen && (
                            <div className="ms-3 mb-2">
                                <SidebarLink to="/dashboard/employees" label="Zaměstnanci"/>
                                <SidebarLink to="/dashboard/customers" label="Zákazníci"/>
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    )
}