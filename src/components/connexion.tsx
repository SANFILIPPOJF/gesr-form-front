import { login } from "../services/Users.service";
import { User } from "../App";


export function Connexion(props:{setUser:React.Dispatch<React.SetStateAction<User>>,user: User}) {
    const handleClickParamEvent = async (
        user: User
    ) => {
        const data = await login(user.cp, user.password)
        console.log(data);
    };
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const propertyName = e.currentTarget.name;
        const propertyValue = e.currentTarget.value;
        props.setUser((prev) => ({ ...prev, [propertyName]: propertyValue }));
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
                onClick={() => handleClickParamEvent(props.user)}
            >
                Submit
            </button>
        </div>
    )
};