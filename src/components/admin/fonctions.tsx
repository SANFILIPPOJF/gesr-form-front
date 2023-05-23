import { useContext, useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { AuthContext } from "../../context/auth-context";
import { TResponse } from "../../types/response_type";
import { DEFAULT_FONCTION } from "../../constants/default_fonction";
import { addFonction, getFonctions, inactiveFonction, updateFonction } from "../../services/Fonctions.service";
import { SelectLength } from "../../constants/select_length";

export function Fonctions() {
    const { fonction, fonctions, reload, connected,
        setReload, setFonctions, setFonction }
        = useContext(AuthContext);
    const [fonctionName, setFonctionName] = useState<string>("");
    useEffect(() => {

        const fonctionsData = async () => {
            const response: TResponse = await getFonctions(connected.token);
            if (response.statusCode < 300) {
                setFonctions([...response.data]);
            }
        }
        fonctionsData();
    }, [reload])

    const fonctionsTab = fonctions.map((f, index) => {
        return (
            <tr key={index}>
                <td>{f.name}</td>
            </tr>
        )
    })

    const fonctionsSelect = fonctions.map((f, index) => {
        return (
            <option key={index} value={index}>{f.name}</option>
        )
    })

    const submitNewFonction = async (name: string) => {
        if (name === "") {
            return alert("No fonction to submit")
        }
        const response = await addFonction(name)
        if (response.statusCode === 201) {
            setFonctions([...fonctions, response.data])
            setFonctionName("");
            setReload(!reload);
        } else alert(response.message)
    }

    const submitUpdateFonction = async () => {
        if (fonction.id === 0) {
            return alert("Select a fonction")
        } else {
            if (fonctionName === "") {
                return alert("Nothing to update")
            }
            fonction.name = fonctionName;
            const response = await updateFonction(fonction);
            if (response.statusCode === 200) {
                const newFonctions = fonctions.map(f => {
                    if (f.id === fonction.id) f = fonction;
                    return f
                })
                setFonctions(newFonctions);
                resetValues();
                setReload(!reload);
            } else alert(response.message)
        }
    }

    const deleteFonction = async () => {
        if (fonction.id === 0) {
            return alert("Select a fonction")
        }
        const response = await inactiveFonction(fonction.id);
        if (response.statusCode === 200) {
            const newFonctions = fonctions.filter((f) => f.id !== fonction.id)
            setFonctions(newFonctions)
            resetValues();
            setReload(!reload);
        } else alert(response.message)
    }

    const resetValues = () => {
        setFonction(DEFAULT_FONCTION);
        setFonctionName("");
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const propertyValue = e.currentTarget.value;
        setFonctionName(propertyValue);
    };
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Liste des Fonctions</Accordion.Header>
                <Accordion.Body>
                    <div className="overflow-auto">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fonctionsTab}
                            </tbody>
                        </Table>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Ajouter une Fonction</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitNewFonction(fonctionName);
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
                            <label htmlFor="floatingInput">Nom de la fonction</label>
                        </div>
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Modifier une Fonction</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitUpdateFonction();
                            e.currentTarget.reset()
                        }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setFonction(fonctions[+e.target.value])} size={SelectLength(fonctionsSelect.length)} aria-label="form-select-lg example">
                                {fonctionsSelect}
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
                            <label htmlFor="floatingInput">Nom de la fonction</label>
                        </div>
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Supprimer une Fonction</Accordion.Header>
                <Accordion.Body>
                <form onSubmit={(e) => {
                        e.preventDefault();
                        deleteFonction();
                        e.currentTarget.reset()
                    }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setFonction(fonctions[+e.target.value])} size={SelectLength(fonctionsSelect.length)} aria-label=".form-select-lg example">
                                {fonctionsSelect}
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