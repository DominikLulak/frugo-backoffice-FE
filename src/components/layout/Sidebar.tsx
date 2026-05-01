import {useState} from "react";
import {Link} from "react-router-dom";

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
                <h3 className="m-0">Frugo</h3>
            </div>

            <div className="p-2">

                <Link to="/dashboard" className="btn btn-success w-100 text-start mb-2">Dashboard</Link>

                <button className={menuButton(stockOpen)} onClick={() => setStockOpen(!stockOpen)}>
                    <span>Sklad</span>
                    <span>{stockOpen ? "▲" : "▼"}</span>
                </button>

                {stockOpen && (
                    <div className="ms-3 mb-2">
                        <Link to="#" className="btn btn-dark w-100 text-start mb-2">Polozky na sklade</Link>
                        <Link to="#" className="btn btn-dark w-100 text-start mb-2">Objednavky</Link>
                        <Link to="#" className="btn btn-dark w-100 text-start mb-2">Zasilky</Link>
                    </div>
                )}

                <button className={menuButton(transOpen)} onClick={() => setTransOpen(!transOpen)}>
                    <span>Transakce</span>
                    <span>{transOpen ? "▲" : "▼"}</span>
                </button>

                {transOpen && (
                    <div className="ms-3 mb-2">
                        <Link to="#" className="btn btn-dark w-100 text-start mb-2">Prijem zbozi</Link>
                        <Link to="#" className="btn btn-dark w-100 text-start mb-2">Vydej objednavky</Link>
                        <Link to="#" className="btn btn-dark w-100 text-start mb-2">Vydej zasilky</Link>
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
                                <Link to="#" className="btn btn-dark w-100 text-start mb-2">Zamestnanci</Link>
                                <Link to="#" className="btn btn-dark w-100 text-start mb-2">Zakaznici</Link>
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    )
}