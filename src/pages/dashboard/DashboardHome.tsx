export default function DashboardHome(){
    return(
        <h2>Dashboard</h2>
    )
}

// import {useNavigate} from "react-router-dom";
//
// function DashboardHome(){
//
//     const navigate = useNavigate()
//
//     const role = localStorage.getItem("role")
//
//     const logout = () => {
//         localStorage.clear()
//         navigate("/")
//     }
//
//     return(
//         <div className="container mt-5">
//             <h1>Dashboard</h1>
//
//             {role === "ADMIN"
//                 ? <h2>Vitej administratore</h2>
//                 : <h2>Vitej uzivateli</h2>
//             }
//
//             <button onClick={logout}>
//                 Logout
//             </button>
//         </div>
//     )
// }
//
// export default DashboardHome