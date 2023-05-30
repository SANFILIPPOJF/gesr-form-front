import { login } from "../services/Users.service";
import { AuthContext } from "../context/auth-context";
import { useContext, useState } from "react";
import { LogInfo } from "../types/login_type";
import { NavbarAccueil } from "./navbar/navbar-accueil";
import { Titre } from "./titre";

export function Connexion() {
    const [logInfo, setLogInfo] = useState<LogInfo>({ cp: "", password: "" });
    const { connected, setConnected } = useContext(AuthContext);

    const handleClickParamEvent = async (logInfo: LogInfo) => {
        const response = await login(logInfo.cp, logInfo.password)
        if (response.statusCode === 200) {
            const newUser = { ...connected }
            newUser.cp = logInfo.cp;
            newUser.token = response.data.access_token
            return setConnected(newUser)
        }else return alert(response.message)
    };
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const propertyName = e.currentTarget.name;
        const propertyValue = e.currentTarget.value;
        setLogInfo((prev) => ({ ...prev, [propertyName]: propertyValue }));
    };
    return (
        <>
            <Titre />
            <NavbarAccueil></NavbarAccueil>
            <div className="container w-75">
                <div className="form-floating mb-3">
                    <input
                        onChange={handleChange}
                        name="cp"
                        type="cp"
                        className="form-control"
                        id="floatingInput" />
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
                <button className="btn btn-primary"
                    onClick={() => handleClickParamEvent(logInfo)}>Soumettre</button>
            </div></>
    )
};