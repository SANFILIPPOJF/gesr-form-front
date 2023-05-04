import { AuthContext } from "../context/auth-context";
import { getByCp } from "../services/Users.service";
import { Navbar } from "./navbar";
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
        userData()
    }, [])

    return (
        <>
            <Navbar/>
            <div>
                <h1 className="connected" style={{ fontSize: "5rem", color: "teal" }}>{user.name}</h1>
                <h1 className="connected" style={{ fontSize: "5rem", color: "teal" }}>{user.cp}</h1>
                <h1 className="connected" style={{ fontSize: "5rem", color: "teal" }}>{user.fonction.name}</h1>
            </div>
        </>
    )
};

