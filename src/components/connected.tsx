import { Accordion, Badge, Table } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import { getUserByCp } from "../services/Users.service";
import { Navbar } from "./navbar/navbar-connected";
import { useContext, useEffect } from "react";


export function Connected() {
    const { connected, setConnected } = useContext(AuthContext);
    useEffect(() => {

        const userData = async () => {
            const data = await getUserByCp(connected.cp, connected.token);
            if (data.statusCode === 200) {
                const newUser = { ...data.data, token: connected.token };
                setConnected(newUser);
            }
        }
        userData();
    }, [])
    const toggleDone = (id: number) => {

    }
    const formateurs = connected.forme.filter((form) => { return form.status === 1 });
    const formateursTab = formateurs.map((form, index) => {
        return (
            <tr key={index}>
                <td>{form.formationType.name}</td>
                <td>{form.date.toString().slice(0, 10)}</td>
                <td>{form.heure}</td>
                <td>{form.formationType.duree}</td>
                <td>{form.salle.name}</td>
                <td>
                    <input key={index} type="checkbox" onChange={() => toggleDone(form.id)}></input>
                </td>

            </tr>
        )
    })
    const formations = connected.formations.filter((form) => { return form.status === 1 });
    const formTab = formations.map((form, index) => {
        return (
            <tr key={index}>
                <td>{form.formationType.name}</td>
                <td>{form.date.toString().slice(0, 10)}</td>
                <td>{form.heure}</td>
                <td>{form.formationType.duree}</td>
                <td>{form.salle.name}</td>
            </tr>
        )
    })
    const habTab = connected.habilitations.map((hab, index) => {
        return (
            <tr key={index}>
                <td>{hab.formationType.name}</td>
                <td>{hab.date.toString().slice(0, 10)}</td>
            </tr>
        )
    })

    const habFormTab = connected.habFormateurs.map((habForm, index) => {
        return (
            <tr key={index}>
                <td>{habForm.name}</td>
            </tr>
        )
    })
    return (
        <>
            <div>
                <h1 className="titre" style={{ fontSize: "2rem", color: "teal" }}>{connected.name}</h1>
            </div>
            <Navbar />
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Mon Profil</Accordion.Header>
                    <Accordion.Body>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>CP</th>
                                    <th>Residence</th>
                                    <th>Fonction</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{connected.cp}</td>
                                    <td>{connected.residence.name}</td>
                                    <td>{connected.fonction.name}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
                {connected.forme.length > 0 && <Accordion.Item eventKey="1">
                    <Accordion.Header>Je Forme
                    <div className="ms-2"><Badge bg="warning" pill>{connected.forme.length}</Badge></div>
                        
                    </Accordion.Header>
                    <Accordion.Body>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Formation</th>
                                    <th>Date (YMD)</th>
                                    <th>Heure</th>
                                    <th>Duree</th>
                                    <th>Salle</th>
                                    <th>Valid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formateursTab}
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>}
                {formations.length > 0 && <Accordion.Item eventKey="2">
                    <Accordion.Header>Mes Formations à venir :
                    <div className="ms-2"><Badge bg="warning">{formations.length}</Badge></div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Formation</th>
                                    <th>Date (YMD)</th>
                                    <th>Heure</th>
                                    <th>Duree</th>
                                    <th>Salle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formTab}
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>}
                {connected.habilitations.length > 0 && <Accordion.Item eventKey="3">
                    <Accordion.Header>
                        Mes Habilitations
                        <div className="ms-2"><Badge bg="info">{connected.habilitations.length}</Badge></div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Formation</th>
                                    <th>Date (YMD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {habTab}
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>}
                {connected.habFormateurs.length > 0 && <Accordion.Item eventKey="4">
                    <Accordion.Header>Mes Habilitations Formateur
                        <div className="ms-2"><Badge bg="info">{connected.habFormateurs.length}</Badge></div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Table striped>
                            <tbody>
                                {habFormTab}
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>}
            </Accordion>
        </>
    )
};

