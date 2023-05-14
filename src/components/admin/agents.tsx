import { useContext, useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { AuthContext } from "../../context/auth-context";
import { addUser, getActiveUsers } from "../../services/Users.service";
import { TResponse } from "../../types/response_type";
import { NewUser } from "../../types/newuser_type";
import { DEFAULT_NEWUSER } from "../../constants/default_newuser";
import { getFonctions } from "../../services/Fonctions.service";
import { getResidences } from "../../services/Residences.service";
export function Agents() {

    const { user, users, residence, residences, fonction, fonctions, reload, setReload, setUsers, setFonctions, setResidences, setResidence, setFonction }
        = useContext(AuthContext);
    useEffect(() => {

        const usersData = async () => {
            const response: TResponse = await getActiveUsers(user.token);
            if (response.statusCode === 200) {
                setUsers([...response.data]);
            }
        }
        const residencesData = async () => {
            const response: TResponse = await getResidences(user.token);
            if (response.statusCode === 200) {
                setResidences([...response.data]);
            }
        }
        const fonctionsData = async () => {
            const response: TResponse = await getFonctions(user.token);
            if (response.statusCode === 200) {
                setFonctions([...response.data]);
            }
        }
        usersData();
        residencesData();
        fonctionsData();
    }, [reload])
    const usersTab = users.map((user, index) => {
        return (
            <tr key={index}>
                <td>{user.name}</td>
                <td>{user.residence.name}</td>
                <td>{user.fonction.name}</td>
            </tr>
        )
    })
    const residencesSelect = residences.map((residence,index) => {
        return (
            <option key={index} value={index}>{residence.name}</option>
        )
    })
    const fonctionsSelect = fonctions.map((fonction,index) => {
        return (
            <option key={index} value={index}>{fonction.name}</option>
        )
    })

    const [newUser, setNewUser] = useState<NewUser>(DEFAULT_NEWUSER);
    const handleClickParamEvent = async (userInput: NewUser) => {
        userInput.fonctionId = fonction.id;
        userInput.residenceId = residence.id;
        const response = await addUser(userInput)
        if (response.statusCode === 200) {
            setUsers([...users, response.data])
            setNewUser(DEFAULT_NEWUSER);
            setReload(!reload);
        }else alert(response.message)
    };
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const propertyName = e.currentTarget.name;
        const propertyValue = e.currentTarget.value;
        setNewUser((prev) => ({ ...prev, [propertyName]: propertyValue }));
    };
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Liste des Agents</Accordion.Header>
                <Accordion.Body>
                    <div className="overflow-auto">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Residence</th>
                                    <th>Fonction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersTab}
                            </tbody>
                        </Table>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Ajouter un agent</Accordion.Header>
                <Accordion.Body><>
                    <div className="container w-100">
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="name"
                                type="name"
                                className="form-control"
                                id="floatingInput"
                                placeholder="8888888X" />
                            <label htmlFor="floatingInput">Nom et Prénom</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="cp"
                                type="cp"
                                className="form-control"
                                id="floatingInput"
                                placeholder="8888888X" />
                            <label htmlFor="floatingInput">CP</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="password"
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="passwordConfirm"
                                type="password"
                                className="form-control"
                                id="floatingPasswordConfirm"
                                placeholder="PasswordConfirm" />
                            <label htmlFor="floatingPasswordConfirm">Password Confirmation</label>
                        </div>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setResidence(residences[+e.target.value])} size={3} aria-label=".form-select-lg example">
                                    {residencesSelect}
                            </select>
                        </div>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setFonction(fonctions[+e.target.value])} size={3} aria-label=".form-select-lg example">
                                    {fonctionsSelect}
                            </select>
                        </div>
                        <button className="btn btn-primary"
                            onClick={() => { handleClickParamEvent(newUser) }}>Soumettre
                        </button>
                    </div></>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Modifier un agent</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Supprimer un agent</Accordion.Header>
                <Accordion.Body>

                </Accordion.Body>
            </Accordion.Item>
        </Accordion >
    )
};