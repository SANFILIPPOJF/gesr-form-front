import { useContext, useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { AuthContext } from "../../context/auth-context";
import { TResponse } from "../../types/response_type";
import { getTypes } from "../../services/Types.service";
import { getActiveUsers } from "../../services/Users.service";
import { addHabilitation, deleteHabilitation, getHabilitations, updateHabilitation } from "../../services/Habilitations.service";
import { NewHabilitation } from "../../types/newhabilitation _type";
import { DEFAULT_NEWHABILITATION } from "../../constants/default_newhabilitation";
import { DEFAULT_USER } from "../../constants/default_user";
import { DEFAULT_HABILITATION } from "../../constants/default_habilitation";
import { SelectLength } from "../../constants/select_length";

export function Habilitations() {
    const { user, users, type, types, habilitation, habilitations, connected,
        setHabilitations, setHabilitation, reload, setUsers, setUser, setType, setTypes }
        = useContext(AuthContext);
    const [newHabilitation, setNewHabilitation] = useState<NewHabilitation>(DEFAULT_NEWHABILITATION);

    useEffect(() => {
        const habilitationsData = async () => {
            if (user.id > 0) {
                const response: TResponse = await getHabilitations(connected.token, user.id);
                if (response.statusCode < 300) return setHabilitations([...response.data]);
                if (response.statusCode === 404) return setHabilitations([])
                return alert(response.message)
            }
        }
        const usersData = async () => {
            const response: TResponse = await getActiveUsers(connected.token);
            if (response.statusCode < 300) {
                setUsers([...response.data]);

            }
        }
        const typesData = async () => {
            const response: TResponse = await getTypes(connected.token);
            if (response.statusCode < 300) setTypes([...response.data]);
            else alert(response.message)
        }
        typesData();
        usersData();
        habilitationsData();
    }, [user, reload])

    const userHabilitationsTab = user.habilitations.map((h, index) => {
        return (
            <tr key={index}>
                <td>{h.formationType.name}</td>
                <td>{new Date(h.date).toDateString()}</td>
            </tr>
        )
    })

    const typesSelect = types.map((t, index) => {
        return (<option key={index} value={index}>{t.name}</option>)
    })

    const userTypesSelect = user.habilitations.map((h, index) => {
        return (<option key={index} value={index}>{h.formationType.name}</option>)
    })

    const usersSelect = users.map((user, index) => {
        return (
            <option key={index} value={index}>{user.name}</option>
        )
    })

    const submitNewHabilitation = async (habilitationInput: NewHabilitation) => {
        if (user.id === 0) return alert("Select an User");
        habilitationInput.userId = user.id;

        if (habilitationInput.date === new Date(0)) return alert("Select a Date");

        if (type.id === 0) return alert("Select a formation type");
        habilitationInput.typeId = type.id;


        const response = await addHabilitation(habilitationInput)
        if (response.statusCode === 201) {
            resetValues();
        } else alert(response.message)
    }

    const submitUpdateHabilitation = async (habilitationInput: NewHabilitation) => {
        if (user.id === 0) return alert("Select an User");
        habilitationInput.userId = user.id;

        if (habilitationInput.date === new Date(0)) return alert("Select a Date");

        if (habilitation.id === 0) return alert("Select an Habilitation");
        habilitationInput.typeId = type.id;

        const response = await updateHabilitation(habilitation.id, habilitationInput.date)
        if (response.statusCode === 200) {
            resetValues();
        } else alert(response.message)
    }

    const submitDeleteHabilitation = async (habilitationId: number) => {
        if (!habilitationId) return alert("Select a habilitation");

        const response = await deleteHabilitation(habilitationId)
        if (response.statusCode === 200) return resetValues();
        alert(response.message)
    }

    const resetValues = () => {
        setUser(DEFAULT_USER);
        setNewHabilitation(DEFAULT_NEWHABILITATION);
        setHabilitation(DEFAULT_HABILITATION);
        setHabilitations([]);
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const propertyName = e.currentTarget.name;
        const propertyValue = e.currentTarget.value;
        setNewHabilitation((previous) => ({ ...previous, [propertyName]: propertyValue }));
    };

    return (
        <Accordion onSelect={() => resetValues()}>
            <Accordion.Item eventKey="0">
                <Accordion.Header onClick={() => resetValues()}>Liste des Habilitations par agent</Accordion.Header>
                <Accordion.Body>
                    <div className="overflow-auto">
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setUser(users[+e.target.value])} size={SelectLength(usersSelect.length)} aria-label=".form-select-lg example">
                                {usersSelect}
                            </select>
                        </div>
                        {userHabilitationsTab.length > 0 && <Table striped>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userHabilitationsTab}
                            </tbody>
                        </Table>}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header onClick={() => resetValues()}>Ajouter une Habilitation à un agent</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitNewHabilitation(newHabilitation);
                            e.currentTarget.reset()
                        }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setUser(users[+e.target.value])} size={SelectLength(usersSelect.length)} aria-label=".form-select-lg example">
                                {usersSelect}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="date"
                                type="date"
                                className="form-control"
                                id="dateInput"
                            />
                            <label htmlFor="floatingInput">Date de l'habilitation</label>
                        </div>

                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setType(types[+e.target.value])} size={SelectLength(typesSelect.length)} aria-label=".form-select-lg example">
                                {typesSelect}
                            </select>
                        </div>
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header onClick={() => resetValues()}>Modifier une Habilitation</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitUpdateHabilitation(newHabilitation);
                            e.currentTarget.reset()
                        }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setUser(users[+e.target.value])} size={SelectLength(usersSelect.length)} aria-label=".form-select-lg example">
                                {usersSelect}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="date"
                                type="date"
                                className="form-control"
                                id="dateInput"
                            />
                            <label htmlFor="floatingInput">Date de l'habilitation</label>
                        </div>

                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setHabilitation(habilitations[+e.target.value])} size={SelectLength(userTypesSelect.length)} aria-label=".form-select-lg example">
                                {userTypesSelect}
                            </select>
                        </div>
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Supprimer un Type de formation</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitDeleteHabilitation(habilitation.id);
                            e.currentTarget.reset()
                        }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setUser(users[+e.target.value])} size={SelectLength(usersSelect.length)} aria-label=".form-select-lg example">
                                {usersSelect}
                            </select>
                        </div>

                        {userTypesSelect.length > 0 && <><div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setHabilitation(habilitations[+e.target.value])} size={SelectLength(userTypesSelect.length)} aria-label=".form-select-lg example">
                                {userTypesSelect}
                            </select>
                        </div>
                        <button className="btn btn-primary" type="submit">Supprimer
                        </button></>}
                    </form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion >
    )
};