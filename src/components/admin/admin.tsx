import { Accordion, Badge, Table } from "react-bootstrap";
import { useContext, useEffect  } from "react";
import { AuthContext } from "../../context/auth-context";
import { TResponse } from "../../types/response_type";
import { getActiveUsers } from "../../services/Users.service";

export function Admins() {
    const { users, reload, connected, setUsers }
        = useContext(AuthContext);

    useEffect(() => {

        const usersData = async () => {
            const response: TResponse = await getActiveUsers(connected.token);
            if (response.statusCode < 300) {
                const orderedUsers = [...response.data].sort((u1,u2) => {
                    if (u1.name > u2.name) return 1;
                    if (u1.name < u2.name) return -1;
                    return 0;
                });
                return setUsers(orderedUsers);
            }
            if (response.statusCode === 404) return setUsers([]);
            return alert(response.message);

        }
        usersData();
    }, [reload])

    const adminsTab = users.map((u, index) => {
        if (u.fonction.name === "Admin") {
            return (
                <tr key={index}>
                    <td>{u.name}</td>
                    <td>{u.residence.name}</td>
                </tr>
            )
        } else return
    })

    return (
        <Accordion>
            {adminsTab.length > 0 && <Accordion.Item eventKey="0">
                <Accordion.Header>Liste des Admins
                <div className="ms-2"><Badge bg="info">{(adminsTab.length-2)/2}</Badge></div>
                </Accordion.Header>
                <Accordion.Body>
                    <div className="overflow-auto">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Admin</th>
                                    <th>Residence</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminsTab}
                            </tbody>
                        </Table>
                    </div>
                </Accordion.Body>
            </Accordion.Item>}
            <Accordion.Item eventKey="1">
                <Accordion.Header>Ajouter autorisation Admin</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            {adminsTab.length > 0 && <Accordion.Item eventKey="2">
                <Accordion.Header>Supprimer autorisation Agent</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>}
        </Accordion >
    )
};