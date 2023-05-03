import { AuthContext } from "../context/auth-context";
import { NavBarre } from "./nav-barre";
import { useContext, useEffect } from "react";

export function Connected() {
    const { token } = useContext(AuthContext)
    useEffect(() => {
        const options = { method: 'GET', headers: { 'Content-Type': 'application/json' }, body: 'false' };

        fetch('http://localhost:8000/users/cp/7407117p', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

    },[])

    return (
        <><NavBarre></NavBarre>
            <div>
                <h1 className="connected" style={{ fontSize: "5rem", color: "teal" }}>{token}</h1>
            </div></>
    )
};

