import { Accordion } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import { getByCp } from "../services/Users.service";
import { Navbar } from "./navbar-connected";
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
    console.log("user",user);
    const formations = user.formations.filter((form) => {return form.status ===1});
    console.log("formations",formations);
    return (
        <>
            <div>
                <h1 className="titre" style={{ fontSize: "2rem", color: "teal" }}>{user.name}</h1>
            </div>
            <Navbar />
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Mon Profil</Accordion.Header>
                    <Accordion.Body>
                        <div className="profil">
                            <h1>Ma residence : {user.residence.name}</h1>
                            <h1>Mon CP : {user.cp}</h1>
                            <h1>Ma fonction : {user.fonction.name}</h1>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Mes Formations à venir</Accordion.Header>
                    <Accordion.Body>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </>
    )
};

