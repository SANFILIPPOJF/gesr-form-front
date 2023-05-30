import { useContext, useEffect, useState } from "react";
import { Accordion, Badge, Table } from "react-bootstrap";
import { AuthContext } from "../../context/auth-context";
import { TResponse } from "../../types/response_type";
import { DEFAULT_SALLE } from "../../constants/default_salle";
import { addSalle, getSalles, inactiveSalle, updateSalle } from "../../services/Salles.service";
import { NewSalle } from "../../types/newsalle _type";
import { DEFAULT_NEWSALLE } from "../../constants/default_newsalle";
import { SelectLength } from "../../constants/select_length";

export function Salles() {
    const { salle, salles, reload, connected,
        setReload, setSalles, setSalle }
        = useContext(AuthContext);
    const [newSalle, setNewSalle] = useState<NewSalle>(DEFAULT_NEWSALLE);
    useEffect(() => {

        const sallesData = async () => {
            const response: TResponse = await getSalles(connected.token);
            if (response.statusCode < 300) {
                const orderedSalles = [...response.data].sort((s1,s2) => {
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
    }, [reload])

    const sallesTab = salles.map((s, index) => {
        return (
            <tr key={index}>
                <td>{s.name}</td>
                <td>{s.capacite}</td>
                <td>{s.adresse}</td>
            </tr>
        )
    })

    const sallesSelect = salles.map((s, index) => {
        return (
            <option key={index} value={index}>{s.name}</option>
        )
    })

    const submitNewSalle = async () => {
        if (newSalle.name === "") return alert("Name uncorrect");
        if (newSalle.capacite < 1) return alert("Capacite uncorrect");
        if (newSalle.adresse === "") return alert("Adresse uncorrect");
        const response = await addSalle(newSalle)
        if (response.statusCode === 201) {
            setSalles([...salles, response.data])
            setNewSalle(DEFAULT_NEWSALLE);
            setReload(!reload);
        } else alert(response.message)
    }

    const submitUpdateSalle = async () => {
        if (salle.id === 0) return alert("Select a salle");
        if (newSalle.name === DEFAULT_NEWSALLE.name &&
            newSalle.capacite === DEFAULT_NEWSALLE.capacite &&
            newSalle.adresse === DEFAULT_NEWSALLE.adresse) return alert("Nothing to update")
        if (newSalle.name !== DEFAULT_NEWSALLE.name) salle.name = newSalle.name;
        if (newSalle.capacite !== DEFAULT_NEWSALLE.capacite) salle.capacite = newSalle.capacite;
        if (newSalle.adresse !== DEFAULT_NEWSALLE.adresse) salle.adresse = newSalle.adresse;
        const response = await updateSalle(salle);
        if (response.statusCode === 200) {
            const newSalles = salles.map(s => {
                if (s.id === salle.id) s = salle;
                return s
            })
            setSalles(newSalles);
            resetValues();
            setReload(!reload);
        } else alert(response.message)
    }

    const deleteSalle = async () => {
        if (salle.id === 0) return alert("Select a salle")

        const response = await inactiveSalle(salle.id);
        if (response.statusCode === 200) {
            const newSalles = salles.filter((s) => s.id !== salle.id)
            setSalles(newSalles)
            resetValues();
            setReload(!reload);
        } else alert(response.message)
    }

    const resetValues = () => {
        setSalle(DEFAULT_SALLE);
        setNewSalle(DEFAULT_NEWSALLE);
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const propertyName = e.currentTarget.name;
        const propertyValue = e.currentTarget.value;
        setNewSalle((previous) => ({ ...previous, [propertyName]: propertyValue }));
    };
    return (
        <Accordion>
            {sallesTab.length > 0 && <Accordion.Item eventKey="0">
                <Accordion.Header>Les Salles
                <div className="ms-2"><Badge bg="info">{salles.length}</Badge></div>
                </Accordion.Header>
                <Accordion.Body>
                    <div className="overflow-auto">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Capacité</th>
                                    <th>Adresse</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sallesTab}
                            </tbody>
                        </Table>
                    </div>
                </Accordion.Body>
            </Accordion.Item>}
            <Accordion.Item eventKey="1">
                <Accordion.Header>Ajouter une Salle</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitNewSalle();
                            e.currentTarget.reset()
                        }}>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="name"
                                type="string"
                                className="form-control"
                                id="nameInput"
                            />
                            <label htmlFor="floatingInput">Nom de la salle</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="capacite"
                                type="number"
                                className="form-control"
                                id="capaciteInput" />
                            <label htmlFor="floatingInput">Capacité</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="adresse"
                                type="string"
                                className="form-control"
                                id="adresseInput"
                            />
                            <label htmlFor="floatingInput">Adresse</label>
                        </div>
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
            {sallesTab.length > 0 && <Accordion.Item eventKey="2">
                <Accordion.Header>Modifier une Salle</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitUpdateSalle();
                            e.currentTarget.reset()
                        }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setSalle(salles[+e.target.value])} size={SelectLength(sallesSelect.length)} aria-label=".form-select-lg example">
                                {sallesSelect}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="name"
                                type="string"
                                className="form-control"
                                id="nameInput"
                            />
                            <label htmlFor="floatingInput">Nom de la salle</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="capacite"
                                type="number"
                                className="form-control"
                                id="capaciteInput" />
                            <label htmlFor="floatingInput">Capacité</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="adresse"
                                type="string"
                                className="form-control"
                                id="adresseInput"
                            />
                            <label htmlFor="floatingInput">Adresse</label>
                        </div>
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>}
            {sallesTab.length > 0 && <Accordion.Item eventKey="3">
                <Accordion.Header>Supprimer une Salle</Accordion.Header>
                <Accordion.Body>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        deleteSalle();
                        e.currentTarget.reset()
                    }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setSalle(salles[+e.target.value])} size={SelectLength(sallesSelect.length)} aria-label=".form-select-lg example">
                                {sallesSelect}
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