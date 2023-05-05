import { login } from "../services/Users.service";
import { AuthContext } from "../context/auth-context";
import { useContext, useState } from "react";
import { LogInfo } from "../types/login_type";
import { NavbarAccueil } from "./navbar-accueil";
import { Titre } from "./titre";

export function Connexion() {
    const [logInfo, setLogInfo] = useState<LogInfo>({ cp: "", password: "" });
    const {user, setUser} = useContext(AuthContext);
    const handleClickParamEvent = async (logInfo: LogInfo) => {
        const data = await login(logInfo.cp, logInfo.password)
        if (data.statutCode === 200) {

            const newUser = {...user}
            newUser.cp = logInfo.cp;
            newUser.token = data.access_token;
            setUser (newUser)
        }
    };
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const propertyName = e.currentTarget.name;
        const propertyValue = e.currentTarget.value;
        setLogInfo((prev) => ({ ...prev, [propertyName]: propertyValue }));
    };
    return (
        <>
        <Titre/>
        <NavbarAccueil></NavbarAccueil>
        <div className="container w-75">
            <div className="form-floating mb-3">
                <input
                    onChange={handleChange}
                    name="cp"
                    type="cp"
                    className="form-control"
                    id="floatingInput"
                    placeholder="8888888X" />
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
            <button
                className="btn btn-primary"
                onClick={() => handleClickParamEvent(logInfo)}
            >
                Submit
            </button>
        </div></>
    )
};