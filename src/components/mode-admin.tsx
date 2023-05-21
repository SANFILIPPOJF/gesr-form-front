import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { NavbarAdmin } from "./navbar/navbar-admin";
import { Navbar } from "./navbar/navbar-connected";
import { Agents } from "./admin/agents";
import { Residences } from "./admin/residences";
import { Admins } from "./admin/admin";
import { Fonctions } from "./admin/fonctions";
import { TypesFormation } from "./admin/types-form";
import { Salles } from "./admin/salles";
import { Habilitations } from "./admin/habilitations";

export function Admin() {
    const { connected } = useContext(AuthContext);
    useEffect(() => { })
    return (
        <>
            <div>
                <h1 className="titre" style={{ fontSize: "2rem", color: "teal" }}>{connected.name}</h1>
            </div>
            <Navbar />
            <NavbarAdmin />
            {window.location.pathname === "/admin" && <Admins />}
            {window.location.pathname === "/admin/agents" && <Agents />}
            {window.location.pathname === "/admin/residences" && <Residences />}
            {window.location.pathname === "/admin/fonctions" && <Fonctions />}
            {window.location.pathname === "/admin/types-form" && <TypesFormation/>}
            {window.location.pathname === "/admin/salles" && <Salles />}
            {window.location.pathname === "/admin/habilitations" && <Habilitations />}
        </>
    )
}