import { Accordion, Badge, Table } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import { getByCp } from "../services/Users.service";
import { Navbar } from "./navbar/navbar-connected";
import { useContext, useEffect } from "react";


export function Connected() {
    const { user, setUser } = useContext(AuthContext);
    useEffect(() => {

        const userData = async () => {
            const data = await getByCp(user.cp, user.token);
            if (data.statusCode === 200) {
                const newUser = { ...data.data, token: user.token };
                setUser(newUser);
            }
        }
        userData();
    }, [])
    const toggleDone = (id: number) => {

    }
    const formateurs = user.forme.filter((form) => { return form.status === 1 });
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
    const formations = user.formations.filter((form) => { return form.status === 1 });
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
    const habTab = user.habilitations.map((hab, index) => {
        return (
            <tr key={index}>
                <td>{hab.formationType.name}</td>
                <td>{hab.date.toString().slice(0, 10)}</td>
            </tr>
        )
    })

    const habFormTab = user.habFormateurs.map((habForm, index) => {
        return (
            <tr key={index}>
                <td>{habForm.name}</td>
            </tr>
        )
    })
    return (
        <>
            <div>
                <h1 className="titre" style={{ fontSize: "2rem", color: "teal" }}>{user.name}</h1>
            </div>
            <Navbar/>
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
                                    <td>{user.cp}</td>
                                    <td>{user.residence.name}</td>
                                    <td>{user.fonction.name}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
                {user.forme.length > 0 && <Accordion.Item eventKey="1">
                    <Accordion.Header>Je Forme :
                        <Badge bg="warning">{user.forme.length}</Badge>
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
                    <Accordion.Header>Mes Formations à venir :<Badge bg="warning">{formations.length}</Badge>
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
                {user.habilitations.length > 0 && <Accordion.Item eventKey="3">
                    <Accordion.Header>Mes Habilitations :
                        <Badge bg="info">{user.habilitations.length}</Badge>
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
                {user.habFormateurs.length > 0 && <Accordion.Item eventKey="4">
                    <Accordion.Header>Mes Habilitations Formateur :
                        <Badge bg="info">{user.habFormateurs.length}</Badge>
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

