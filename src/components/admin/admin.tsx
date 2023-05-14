import { Accordion } from "react-bootstrap";

export function Admins() {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Liste des Admins</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Ajouter autorisation Admin</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Supprimer autorisation Agent</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion >
    )
};