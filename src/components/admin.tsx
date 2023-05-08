import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { Accordion } from "react-bootstrap";
import { NavbarAdmin } from "./navbar/navbar-admin";
import { Navbar } from "./navbar/navbar-connected";
import { Agents } from "./admin/agents";

export function Admin() {
    const { user, setUser } = useContext(AuthContext);
    useEffect(() => { })
    return (
        <>
            <div>
                <h1 className="titre" style={{ fontSize: "2rem", color: "teal" }}>{user.name}</h1>
            </div>
            <Navbar/>
            <NavbarAdmin/>
            <Agents/>
        </>
    )
}