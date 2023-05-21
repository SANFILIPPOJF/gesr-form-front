import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { DEFAULT_USER } from "../../constants/default_user";

export function Navbar() {
    const { connected, setConnected } = useContext(AuthContext);
    const deconnexion = () => {
        setConnected(DEFAULT_USER);
    };
    return (
        <div>
            <nav className="mb-4">
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item">
                        <NavLink className="nav-link" style={() => {
                            return {
                                fontWeight: "bold",
                                color: "red"
                            };
                        }} onClick={() => deconnexion()} to="/">
                            Déconnection
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/connected">
                            Ma page
                        </NavLink>
                    </li>
                    {connected.fonction.name === "Admin" && <>
                        {!window.location.pathname.includes("/admin") && <li className="nav-item">
                            <NavLink className="nav-link" to="/management">
                                Mode Gestionnaire
                            </NavLink>
                        </li>}
                        {!window.location.pathname.includes("/management") && <li className="nav-item">
                            <NavLink className="nav-link" to="/admin">
                                Mode Admin
                            </NavLink>
                        </li>}
                    </>}
                </ul>
            </nav>
        </div>
    )
};

