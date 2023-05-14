import { Accordion } from "react-bootstrap";

export function Salles() {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Liste des Salles</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Ajouter une Salle</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Modifier une Salle</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Supprimer une Salle</Accordion.Header>
                <Accordion.Body>

                </Accordion.Body>
            </Accordion.Item>
        </Accordion >
    )
};