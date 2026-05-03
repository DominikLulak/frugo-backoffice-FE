import {useState} from "react";
import "./Login.css"
import {API_URL} from "../../api/config.ts";
import * as React from "react";

function Login(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        })

        const data = await response.json()

        if(data.success){
            localStorage.setItem("token", data.token)
            localStorage.setItem("role", data.role)
            localStorage.setItem("username", data.username)
            window.location.href = "/dashboard"
        }else{
            alert(data.message)
        }
    }

    return(
        <div className="login-page d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg border-0 p-4 login-card">
                <div className="text-center mb-4">
                    <h1 className="fw-bold">
                        Fru<span className="text-success">go</span>
                    </h1>
                    <h3 className="fw-bold mt-3">Backoffice</h3>
                    <p className="text-muted small">
                        Vítejte zpět! Přihlaste se do svého účtu.
                    </p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Jmeno</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Zadejte přihlašovací jméno"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Heslo</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Zadejte heslo"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <button className="btn btn-success w-100 py-2 fw-bold">
                            Prihlasit se
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4 text-muted small">
                    © 2026 Frugo s.r.o.
                </div>
            </div>
        </div>
    )
}

export default Login;