import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { Accordion } from "react-bootstrap";
import { Navbar } from "./navbar/navbar-connected";
import { NavbarManagement } from "./navbar/navbar-management";

export function Management() {
    const { user, setUser } = useContext(AuthContext);
    useEffect(() => { })
    return (
        <>
            <div>
                <h1 className="titre" style={{ fontSize: "2rem", color: "teal" }}>{user.name}</h1>
            </div>
            <Navbar/>
            <NavbarManagement/>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Réalisées à Valider</Accordion.Header>
                    <Accordion.Body>
                        
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Validées à Venir</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>A Confirmer</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion >
        </>
    )
}