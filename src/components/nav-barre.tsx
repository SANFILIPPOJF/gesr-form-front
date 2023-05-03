import { NavLink } from "react-router-dom";

export function NavBarre() {
    return (
        <div>
        <nav className="mb-4">
            <ul className="nav nav-pills justify-content-center">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                        Deconnection
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/connexion">
                        Connexion
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/perso">
                        Perso
                    </NavLink>
                </li>
            </ul>
        </nav>
        </div>

    )
};

