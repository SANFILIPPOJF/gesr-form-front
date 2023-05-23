import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { Accordion } from "react-bootstrap";
import { Navbar } from "./navbar/navbar-connected";
import { Formations } from "./management/formations";



export function Management() {
    const { connected } = useContext(AuthContext);
    useEffect(() => { })
    return (
        <>
            <div>
                <h1 className="titre" style={{ fontSize: "2rem", color: "teal" }}>{connected.name}</h1>
            </div>
            <Navbar/>
            <Formations/>
        </>
    )
}