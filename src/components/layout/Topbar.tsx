import {useNavigate} from "react-router-dom";
import "./Layout.css"

type Props = {
    toggleSidebar: () => void
}

export default function Topbar({toggleSidebar}: Props){
    const navigate = useNavigate()

    const username = localStorage.getItem("username") || "Uzivatel"

    const logout = () =>{
        localStorage.clear()
        navigate("/")
    }

    return(
        <div className="bg-white border-bottom px-4 d-flex align-items-center justify-content-between topbar">
            <button className="btn btn-outline-secondary" onClick={toggleSidebar}>☰</button>

            <div className="dropdown">
                <button
                    className="btn btn-light dropdown-toggle"
                    data-bs-toggle="dropdown"
                    type="button"
                >
                    {username}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <button className="dropdown-item text-danger" onClick={logout}>Odhlasit</button>
                    </li>
                </ul>
            </div>
        </div>
    )

}