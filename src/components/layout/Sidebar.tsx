import {useState} from "react";
import SidebarLink from "./SidebarLink.tsx";
import {hasPermission} from "../../utils/permissions.ts";

export default function Sidebar(){

    const [stockOpen, setStockOpen] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);
    const [puruchaseOrderOpen, setPurchaseOrderOpen] = useState(false);

    const menuButton = (active: boolean) =>
        `btn w-100 text-start d-flex justify-content-between align-items-center mb-2 ${
        active ? "btn-outline-light" : "btn-dark"
    }`;

    return(
        <div className="bg-dark text-white sidebar">

            <div className="p-3 border-bottom">
                <h3 className="m-0">
                    Fru<span className="text-success">go</span>
                </h3>
            </div>

            <div className="p-2">

                {/* Sklad */}

                {hasPermission("WAREHOUSE_READ") && (
                    <>
                        <button
                            className={menuButton(stockOpen)}
                            onClick={() => setStockOpen(!stockOpen)}
                        >
                            <span>Sklad</span>
                            <span>{stockOpen ? "▲" : "▼"}</span>
                        </button>

                        {stockOpen && (
                            <div className="ms-3 mb-2">

                                <SidebarLink
                                    to="/dashboard/stock/items"
                                    label="Položky na skladě"
                                />

                                <SidebarLink
                                    to="/dashboard/pallets"
                                    label="Pallety na skladě"
                                />

                                <SidebarLink
                                    to="/dashboard"
                                    label="Příjem položky"
                                    disabled
                                />

                                <SidebarLink
                                    to="/dashboard"
                                    label="Výdej položky do objednávky"
                                    disabled
                                />

                                <SidebarLink
                                    to="/dashboard"
                                    label="Výdej položky do zásilky"
                                    disabled
                                />

                                <SidebarLink
                                    to="/dashboard"
                                    label="Založení nové položky"
                                    disabled
                                />

                                <SidebarLink
                                    to="/dashboard"
                                    label="Vymazání položky ze skladu"
                                    disabled
                                />

                            </div>
                        )}
                    </>
                )}

                {/* Produkty */}

                {hasPermission("PRODUCT_READ") && (
                    <SidebarLink
                        to="/dashboard/products"
                        label="Produkty"
                    />
                )}

                {/* Objednávky */}

                {hasPermission("ORDER_READ") && (
                    <SidebarLink
                        to="/dashboard/orders"
                        label="Objednávky"
                    />
                )}

                {/* Zásilky */}

                {hasPermission("SHIPMENT_READ") && (
                    <SidebarLink
                        to="/dashboard/shipments"
                        label="Zásilky"
                    />
                )}

                {/* Nakupni objednavky */}

                {hasPermission("PRODUCT_READ") && (
                    <>
                        <button
                            className={menuButton(puruchaseOrderOpen)}
                            onClick={() => setPurchaseOrderOpen(!puruchaseOrderOpen)}
                        >
                            <span>Nakupni objednavky</span>
                            <span>{puruchaseOrderOpen ? "▲" : "▼"}</span>
                        </button>

                        {puruchaseOrderOpen && (
                            <div className="ms-3 mb-2">
                                <SidebarLink
                                    to="/dashboard/suppliers"
                                    label="Dodavatele"
                                />
                                <SidebarLink
                                    to="/dashboard/purchaseOrders"
                                    label="Nakupni objednavky"
                                />
                            </div>
                        )}
                    </>
                )}

                {/* Administrace */}

                {(hasPermission("EMPLOYEE_READ") ||
                    hasPermission("CUSTOMER_READ")) && (

                    <>
                        <button
                            className={menuButton(adminOpen)}
                            onClick={() => setAdminOpen(!adminOpen)}
                        >
                            <span>Administrace</span>
                            <span>{adminOpen ? "▲" : "▼"}</span>
                        </button>

                        {adminOpen && (
                            <div className="ms-3 mb-2">

                                {hasPermission("EMPLOYEE_READ") && (
                                    <SidebarLink
                                        to="/dashboard/employees"
                                        label="Zaměstnanci"
                                    />
                                )}

                                {hasPermission("CUSTOMER_READ") && (
                                    <SidebarLink
                                        to="/dashboard/customers"
                                        label="Zákazníci"
                                    />
                                )}

                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    );
}