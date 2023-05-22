import { useContext, useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { AuthContext } from "../../context/auth-context";
import { addUser, getActiveUsers, inactiveUser, updateUser } from "../../services/Users.service";
import { TResponse } from "../../types/response_type";
import { NewUser } from "../../types/newuser_type";
import { DEFAULT_NEWUSER } from "../../constants/default_newuser";
import { getFonctions } from "../../services/Fonctions.service";
import { getResidences } from "../../services/Residences.service";
import { DEFAULT_RESIDENCE } from "../../constants/default_residence";
import { DEFAULT_FONCTION } from "../../constants/default_fonction";
import { DEFAULT_USER } from "../../constants/default_user";
import { SELECT_LENGTH } from "../../constants/select_length";

export function Agents() {

    const { user, users, residence, residences, fonction, fonctions, reload, connected,
        setReload, setUser, setUsers, setFonctions, setResidences, setResidence, setFonction }
        = useContext(AuthContext);
    const [newUser, setNewUser] = useState<NewUser>(DEFAULT_NEWUSER);

    useEffect(() => {

        const usersData = async () => {
            const response: TResponse = await getActiveUsers(connected.token);
            if (response.statusCode < 300) {
                setUsers([...response.data]);

            }
        }
        const residencesData = async () => {
            const response: TResponse = await getResidences(connected.token);
            if (response.statusCode < 300) {
                setResidences([...response.data]);
            }
        }
        const fonctionsData = async () => {
            const response: TResponse = await getFonctions(connected.token);
            if (response.statusCode < 300) {
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
    const usersSelect = users.map((user, index) => {
        return (
            <option key={index} value={index}>{user.name}</option>
        )
    })
    const usersSelectLength = () => {
        if (users.length < SELECT_LENGTH) return users.length
        return SELECT_LENGTH
    }
    const residencesSelect = residences.map((residence, index) => {
        return (
            <option key={index} value={index}>{residence.name}</option>
        )
    })
    const fonctionsSelect = fonctions.map((fonction, index) => {
        return (
            <option key={index} value={index}>{fonction.name}</option>
        )
    })

    const submitNewUser = async (userInput: NewUser) => {
        if (residence.id !== 0) {
            userInput.residenceId = residence.id;
        } else {
            return alert("Select a Residence")
        }
        if (fonction.id !== 0) {
            userInput.fonctionId = fonction.id;
        } else {
            return alert("Select a Fonction")
        }
        const response = await addUser(userInput)
        if (response.statusCode === 201) {
            setUsers([...users, response.data])
            resetValues();
            setReload(!reload);
        } else alert(response.message)
    }

    const deleteUser = async () => {
        if (user.id === 0) {
            return alert("Select a user")
        } else {
            const response = await inactiveUser(user.id);
            if (response.statusCode === 202) {
                const newUsers = users.filter((u) => u.id !== user.id)
                setUsers(newUsers)
                resetValues();
                setReload(!reload);
            } else alert(response.message)
        }
    }

    const submitUpdateUser = async () => {
        if (user.id === 0) {
            return alert("Select a user")
        } else {
            if (newUser.name !== "") user.name = newUser.name;
            if (fonction.id !== 0) user.fonction = fonction;
            if (residence.id !== 0) user.residence = residence;
            const response = await updateUser(user);
            if (response.statusCode === 200) {
                const newUsers = users.map(u => {
                    if (u.id === user.id) u = user;
                    return u
                })
                setUsers(newUsers);
                resetValues();
                setReload(!reload);
            } else alert(response.message)
        }
    }

    const resetValues = () => {
        setUser(DEFAULT_USER);
        setNewUser(DEFAULT_NEWUSER);
        setResidence(DEFAULT_RESIDENCE);
        setFonction(DEFAULT_FONCTION);
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const propertyName = e.currentTarget.name;
        const propertyValue = e.currentTarget.value;
        setNewUser((previous) => ({ ...previous, [propertyName]: propertyValue }));
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
                <Accordion.Header>Ajouter un Agent</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitNewUser(newUser);
                            e.currentTarget.reset()
                        }}>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="name"
                                type="name"
                                className="form-control"
                                id="nameInput"
                            />
                            <label htmlFor="floatingInput">Nom et Prénom</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="cp"
                                type="cp"
                                className="form-control"
                                id="cpInput" />
                            <label htmlFor="floatingInput">CP</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="password"
                                type="password"
                                className="form-control"
                                id="passwordInput"
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="passwordConfirm"
                                type="password"
                                className="form-control"
                                id="passwordConfirmInput"
                            />
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
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Modifier un Agent</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitUpdateUser();
                            e.currentTarget.reset()
                        }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setUser(users[+e.target.value])} size={5} aria-label=".form-select-lg example">
                                {usersSelect}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="name"
                                type="name"
                                className="form-control"
                                id="nameInput"
                            />
                            <label htmlFor="floatingInput">Nom et Prénom</label>
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
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Supprimer un Agent</Accordion.Header>
                <Accordion.Body>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        deleteUser();
                        e.currentTarget.reset()
                    }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setUser(users[+e.target.value])} size={usersSelectLength()} aria-label=".form-select-lg example">
                                {usersSelect}
                            </select>
                        </div>
                        <button className="btn btn-primary" type="submit">Supprimer
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion >
    )
};