import { Accordion, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { TResponse } from "../../types/response_type";
import { getFormations } from "../../services/Formations.service";

export function Formations() {
    const { user, users, formation, formations, residence, residences, fonction, fonctions, reload, connected,
        setReload, setUser, setUsers, setFormation, setFormations, setFonctions, setResidences, setResidence, setFonction }
        = useContext(AuthContext);

    useEffect(() => {

        const formationsData = async () => {
            const response: TResponse = await getFormations(connected.token);
            if (response.statusCode < 300) {
                return setFormations([...response.data]);
            }
            if (response.statusCode === 404) return setFormations([])
            return alert(response.message);
        }
        formationsData();
    }, [reload])

    const formationsTab = formations.map((f, index) => {
        if (new Date(f.date) >= new Date(Date.now())) {
            return (
                <tr key={index}>
                    <td>{f.formationType.name}</td>
                    <td>{new Date(f.date).toDateString()}</td>
                </tr>
            )
        }else return
    })

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Liste des Formations réalisée à confirmer</Accordion.Header>
                <Accordion.Body>
                <div className="overflow-auto">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formationsTab}
                            </tbody>
                        </Table>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Liste des Formation à venir</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Liste des Formations incompletes</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Ajouter une Formation</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion >
    )
};