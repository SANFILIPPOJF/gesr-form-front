import { useContext, useEffect, useState } from "react";
import { Accordion, Badge, Table } from "react-bootstrap";
import { AuthContext } from "../../context/auth-context";
import { TResponse } from "../../types/response_type";
import { addResidence, getResidences, inactiveResidence, updateResidence } from "../../services/Residences.service";
import { DEFAULT_RESIDENCE } from "../../constants/default_residence";
import { SelectLength } from "../../constants/select_length";

export function Residences() {
    const { residence, residences, reload, connected,
        setReload, setResidences, setResidence }
        = useContext(AuthContext);
    const [residenceName, setResidenceName] = useState<string>("");
    useEffect(() => {

        const residencesData = async () => {
            const response: TResponse = await getResidences(connected.token);
            if (response.statusCode < 300) {
                const orderedResidences = [...response.data].sort((r1,r2) => {
                    if (r1.name > r2.name) return 1;
                    if (r1.name < r2.name) return -1;
                    return 0;
                });
                return setResidences(orderedResidences);
            }
            if (response.statusCode === 404) return setResidences([])
            return alert(response.message);
        }
        residencesData();
    }, [reload])

    const residencesTab = residences.map((res, index) => {
        return (
            <tr key={index}>
                <td>{res.name}</td>
            </tr>
        )
    })

    const residencesSelect = residences.map((residence, index) => {
        return (
            <option key={index} value={index}>{residence.name}</option>
        )
    })

    const submitNewResidence = async (name: string) => {
        if (name === "") {
            return alert("No residence to submit")
        }
        const response = await addResidence(name)
        if (response.statusCode === 201) {
            setResidences([...residences, response.data])
            setResidenceName("");
            setReload(!reload);
        } else alert(response.message)
    }

    const submitUpdateResidence = async () => {
        if (residence.id === 0) {
            return alert("Select a residence")
        } else {
            if (residenceName === "") {
                return alert("Nothing to update")
            }
            residence.name = residenceName;
            const response = await updateResidence(residence);
            if (response.statusCode === 200) {
                const newResidences = residences.map(r => {
                    if (r.id === residence.id) r = residence;
                    return r
                })
                setResidences(newResidences);
                resetValues();
                setReload(!reload);
            } else alert(response.message)
        }
    }

    const deleteResidence = async () => {
        if (residence.id === 0) {
            return alert("Select a residence")
        }
        const response = await inactiveResidence(residence.id);
        if (response.statusCode === 200) {
            const newResidences = residences.filter((r) => r.id !== residence.id)
            setResidences(newResidences)
            resetValues();
            setReload(!reload);
        } else alert(response.message)
    }

    const resetValues = () => {
        setResidence(DEFAULT_RESIDENCE);
        setResidenceName("");
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const propertyValue = e.currentTarget.value;
        setResidenceName(propertyValue);
    };
    return (
        <Accordion>
            {residencesTab.length > 0 && <Accordion.Item eventKey="0">
                <Accordion.Header>Les Résidences
                <div className="ms-2"><Badge bg="info">{residences.length}</Badge></div>
                </Accordion.Header>
                <Accordion.Body>
                    <div className="overflow-auto">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                </tr>
                            </thead>
                            <tbody>
                                {residencesTab}
                            </tbody>
                        </Table>
                    </div>
                </Accordion.Body>
            </Accordion.Item>}
            <Accordion.Item eventKey="1">
                <Accordion.Header>Ajouter une Residence</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitNewResidence(residenceName);
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
                            <label htmlFor="floatingInput">Nom de la residence</label>
                        </div>
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
            {residencesTab.length > 0 && <Accordion.Item eventKey="2">
                <Accordion.Header>Modifier une Residence</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitUpdateResidence();
                            e.currentTarget.reset()
                        }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setResidence(residences[+e.target.value])} size={SelectLength(residencesSelect.length)} aria-label=".form-select-lg example">
                                {residencesSelect}
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
                            <label htmlFor="floatingInput">Nom de la residence</label>
                        </div>
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>}
            {residencesTab.length > 0 && <Accordion.Item eventKey="3">
                <Accordion.Header>Supprimer une Residence</Accordion.Header>
                <Accordion.Body>
                <form onSubmit={(e) => {
                        e.preventDefault();
                        deleteResidence();
                        e.currentTarget.reset()
                    }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setResidence(residences[+e.target.value])} size={SelectLength(residencesSelect.length)} aria-label=".form-select-lg example">
                                {residencesSelect}
                            </select>
                        </div>
                        <button className="btn btn-primary" type="submit">Supprimer
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>}
        </Accordion >
    )
};