import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { DEFAULT_USER } from "../constants/default_user";


export function Navbar() {
    const {user, setUser} = useContext(AuthContext);
    const deconnexion = () => {
        setUser(DEFAULT_USER);
    };
    return (
        <div>
        <nav className="mb-4">
            <ul className="nav nav-pills justify-content-center">
                <li className="nav-item">
                    <NavLink className="nav-link" onClick={() => deconnexion()} to="/">
                        Déconnection
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/connected">
                        Ma page
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/edition">
                        edition
                    </NavLink>
                </li>
            </ul>
        </nav>
        </div>

    )
};

