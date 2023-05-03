import { login } from "../services/Users.service";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { LogInfo } from "../types/login_type";

export function Connexion(props: {
    setIsUserLogged: React.Dispatch<React.SetStateAction<boolean>>,
    setLogInfo: React.Dispatch<React.SetStateAction<LogInfo>>,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    logInfo: LogInfo
}) {
    const authContext = useContext(AuthContext);
    const handleClickParamEvent = async (
        logInfo: LogInfo
    ) => {
        const data = await login(logInfo.cp, logInfo.password)
        if (data.statutCode === 200) {
            authContext.isUserLogged =true;
            authContext.token = data.access_token;
            props.setToken(data.access_token)
            props.setLogInfo(logInfo)
            props.setIsUserLogged(true)
        }
    };
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const propertyName = e.currentTarget.name;
        const propertyValue = e.currentTarget.value;
        props.setLogInfo((prev) => ({ ...prev, [propertyName]: propertyValue }));
    };
    return (
        <div className="container w-75">
            <div className="form-floating mb-3">
                <input
                    onChange={handleChange}
                    name="cp"
                    type="cp"
                    className="form-control"
                    id="floatingInput"
                    placeholder="8888888X"
                />
                <label htmlFor="floatingInput">CP</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <button
                className="btn btn-primary"
                onClick={() => handleClickParamEvent(props.logInfo)}
            >
                Submit
            </button>
        </div>
    )
};