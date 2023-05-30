import { Accordion, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { TResponse } from "../../types/response_type";
import { addFormation, getFormations } from "../../services/Formations.service";
import { NewFormation } from "../../types/newformation_type";
import { DEFAULT_NEWFORMATION } from "../../constants/default_newformation";
import { SelectLength } from "../../constants/select_length";
import { DEFAULT_SALLE } from "../../constants/default_salle";
import { DEFAULT_FORMTYPE } from "../../constants/default_formtype";
import { getTypes } from "../../services/Types.service";
import { getSalles } from "../../services/Salles.service";

export function Formations() {
    const { formations, reload, connected, setReload, setSalle, setSalles,
        salle, salles, setType, type, types, setTypes, setFormations }
        = useContext(AuthContext);
    const [newFormation, setNewFormation] = useState<NewFormation>(DEFAULT_NEWFORMATION);
    useEffect(() => {
        const formationsData = async () => {
            const response: TResponse = await getFormations(connected.token);
            if (response.statusCode < 300) {
                return setFormations([...response.data]);
            }
            if (response.statusCode === 404) return setFormations([])
            return alert(response.message);
        }
        const typesData = async () => {
            const response: TResponse = await getTypes(connected.token);
            if (response.statusCode < 300) {
                const orderedTypes = [...response.data].sort((t1, t2) => {
                    if (t1.name > t2.name) return 1;
                    if (t1.name < t2.name) return -1;
                    return 0;
                });
                return setTypes(orderedTypes);
            }
            if (response.statusCode === 404) return setTypes([])
            return alert(response.message);
        }
        const sallesData = async () => {
            const response: TResponse = await getSalles(connected.token);
            if (response.statusCode < 300) {
                const orderedSalles = [...response.data].sort((s1, s2) => {
                    if (s1.name > s2.name) return 1;
                    if (s1.name < s2.name) return -1;
                    return 0;
                });
                return setSalles(orderedSalles);
            }
            if (response.statusCode === 404) return setSalles([])
            return alert(response.message);
        }
        sallesData();
        typesData();
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
        }
    })
    const typesSelect = types.map((t, index) => {
        return (<option key={index} value={index}>{t.name}</option>)
    })

    const sallesSelect = salles.map((s, index) => {
        return (<option key={index} value={index}>{s.name}</option>)
    })
    const submitNewFormation = async (formationInput: NewFormation) => {
        if (type.id !== 0) {
            formationInput.typeId = type.id;
        } else {
            return alert("Select a Type")
        }
        if (salle.id !== 0) {
            formationInput.salleId = salle.id;
        } else {
            return alert("Select a Salle")
        }

        const response = await addFormation(formationInput)
        if (response.statusCode === 201) {
            setFormations([...formations, response.data])
            resetValues();
            setReload(!reload);
        } else alert(response.message)
    }
    const resetValues = () => {
        setNewFormation(DEFAULT_NEWFORMATION);
        setSalle(DEFAULT_SALLE);
        setType(DEFAULT_FORMTYPE);
    }
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const propertyName = e.currentTarget.name;
        const propertyValue = e.currentTarget.value;
        setNewFormation((previous) => ({ ...previous, [propertyName]: propertyValue }));
    };

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Les Formations réalisées à confirmer</Accordion.Header>
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
                <Accordion.Header>Les Formation à venir</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Les Formations incomplètes</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Ajouter une Formation</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitNewFormation(newFormation);
                            e.currentTarget.reset()
                        }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setType(types[+e.target.value])}
                                size={SelectLength(typesSelect.length)}
                                aria-label=".form-select-lg example">
                                {typesSelect}
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
                            <label htmlFor="floatingInput">Date de la formation</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="heure"
                                type="string"
                                className="form-control"
                                id="heureInput"
                            />
                            <label htmlFor="floatingInput">Heure</label>
                        </div>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setSalle(salles[+e.target.value])}
                                size={SelectLength(sallesSelect.length)}
                                aria-label=".form-select-lg example">
                                {sallesSelect}
                            </select>
                        </div>
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion >
    )
};