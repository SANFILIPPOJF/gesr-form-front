import { useContext, useEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { AuthContext } from "../../context/auth-context";
import { TResponse } from "../../types/response_type";
import { NewType } from "../../types/newtype _type";
import { DEFAULT_NEWTYPE } from "../../constants/default_newtype";
import { addType, getTypes, inactiveType, updateType } from "../../services/Types.service";
import { DEFAULT_FORMTYPE } from "../../constants/default_formtype";
import { SelectLength } from "../../constants/select_length";

export function TypesFormation() {
    const { type, types, reload, connected,
        setReload, setTypes, setType }
        = useContext(AuthContext);
    const [newType, setNewType] = useState<NewType>(DEFAULT_NEWTYPE);

    useEffect(() => {

        const typesData = async () => {
            const response: TResponse = await getTypes(connected.token);
            if (response.statusCode < 300) setTypes([...response.data]);
            else alert(response.message)
        }
        typesData();
    }, [reload])

    const typesTab = types.map((t, index) => {
        return (
            <tr key={index}>
                <td>{t.name}</td>
                <td>{t.duree}</td>
                <td>{t.codeRAF}</td>
            </tr>
        )
    })

    const typesSelect = types.map((t, index) => {
        return (
            <option key={index} value={index}>{t.name}</option>
        )
    })

    const submitNewType = async () => {
        if (newType.name === "") return alert("Name uncorrect");
        if (newType.duree === "") return alert("durée uncorrect");
        if (newType.codeRAF === "") return alert("codeRAF uncorrect");
        const response = await addType(newType)
        if (response.statusCode === 201) {
            setTypes([...types, response.data])
            setNewType(DEFAULT_NEWTYPE);
            setReload(!reload);
        } else alert(response.message)
    }

    const submitUpdateType = async () => {
        if (type.id === 0) return alert("Select a formation type");
        if (newType.name === DEFAULT_NEWTYPE.name &&
            newType.duree === DEFAULT_NEWTYPE.duree &&
            newType.codeRAF === DEFAULT_NEWTYPE.codeRAF) return alert("Nothing to update")
        if (newType.name !== DEFAULT_NEWTYPE.name) type.name = newType.name;
        if (newType.duree !== DEFAULT_NEWTYPE.duree) type.duree = newType.duree;
        if (newType.codeRAF !== DEFAULT_NEWTYPE.codeRAF) type.codeRAF = newType.codeRAF;
        const response = await updateType(type);
        if (response.statusCode === 200) {
            const newTypes = types.map(t => {
                if (t.id === type.id) t = type;
                return t
            })
            setTypes(newTypes);
            resetValues();
            setReload(!reload);
        } else alert(response.message)
    }

    const deleteType = async () => {
        if (type.id === 0) return alert("Select a formation type")

        const response = await inactiveType(type.id);
        if (response.statusCode === 200) {
            const newTypes = types.filter((t) => t.id !== type.id)
            setTypes(newTypes)
            resetValues();
            setReload(!reload);
        } else alert(response.message)
    }

    const resetValues = () => {
        setType(DEFAULT_FORMTYPE);
        setNewType(DEFAULT_NEWTYPE);
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const propertyName = e.currentTarget.name;
        const propertyValue = e.currentTarget.value;
        setNewType((previous) => ({ ...previous, [propertyName]: propertyValue }));
    };
    return (
        <Accordion>
            {typesTab.length > 0 && <Accordion.Item eventKey="0">
                <Accordion.Header>Liste des Types de formation</Accordion.Header>
                <Accordion.Body>
                    <div className="overflow-auto">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Durée</th>
                                    <th>CodeRAF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {typesTab}
                            </tbody>
                        </Table>
                    </div>
                </Accordion.Body>
            </Accordion.Item>}
            <Accordion.Item eventKey="1">
                <Accordion.Header>Ajouter un Type de formation</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitNewType();
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
                            <label htmlFor="floatingInput">Nom du type de formation</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="duree"
                                type="string"
                                className="form-control"
                                id="dureeInput" />
                            <label htmlFor="floatingInput">Durée</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="codeRAF"
                                type="string"
                                className="form-control"
                                id="codeRAFInput"
                            />
                            <label htmlFor="floatingInput">codeRAF</label>
                        </div>
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>
            {typesTab.length > 0 && <Accordion.Item eventKey="2">
                <Accordion.Header>Modifier un Type de formation</Accordion.Header>
                <Accordion.Body>
                    <form className="container w-100"
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitUpdateType();
                            e.currentTarget.reset()
                        }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setType(types[+e.target.value])} size={SelectLength(typesSelect.length)} aria-label=".form-select-lg example">
                                {typesSelect}
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
                            <label htmlFor="floatingInput">Nom du Type de formation</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="duree"
                                type="string"
                                className="form-control"
                                id="dureeInput" />
                            <label htmlFor="floatingInput">Durée</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleChange}
                                name="codeRAF"
                                type="string"
                                className="form-control"
                                id="codeRAFInput"
                            />
                            <label htmlFor="floatingInput">CodeRAF</label>
                        </div>
                        <button className="btn btn-primary" type="submit">Soumettre
                        </button>
                    </form>
                </Accordion.Body>
            </Accordion.Item>}
            {typesTab.length > 0 && <Accordion.Item eventKey="3">
                <Accordion.Header>Supprimer un Type de formation</Accordion.Header>
                <Accordion.Body>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        deleteType();
                        e.currentTarget.reset()
                    }}>
                        <div>
                            <select className="form-select form-select-sm mb-3"
                                onChange={(e) => setType(types[+e.target.value])} size={SelectLength(typesSelect.length)} aria-label=".form-select-lg example">
                                {typesSelect}
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